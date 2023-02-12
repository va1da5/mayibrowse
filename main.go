package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"mayibroswe/api"
	"net/http"
	"os/exec"
	"runtime"

	"github.com/gin-gonic/gin"
)

const VERSION = "0.1.0"

//go:embed gui/dist
var content embed.FS

func fsHandler() http.FileSystem {
	sub, err := fs.Sub(content, "gui/dist")

	if err != nil {
		panic(err)
	}

	return http.FS(sub)
}

func openBrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}

}

func main() {
	host := "127.0.0.1"
	port := 1337
	url := fmt.Sprintf("http://%s:%d", host, port)

	fmt.Println(VERSION)

	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "app/")
	})

	// Checks individual URL if it is accessible
	router.POST("/api/check", api.CheckUrl)

	// Parses URLs from a provided content
	router.POST("/api/parse", api.ParseUrls)

	router.StaticFS("/app", fsHandler())

	openBrowser(url)

	router.Run(fmt.Sprintf("%s:%d", host, port))
}
