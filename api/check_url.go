package api

import (
	"log"
	"mayibroswe/utils"
	"net/http"
	"net/url"
	"sync"

	"github.com/gin-gonic/gin"
)

type CheckUrlBody struct {
	// json tag to de-serialize json body
	Urls      []string `json:"urls"`
	Timeout   int      `json:"timeout"`
	UserAgent string   `json:"userAgent"`
}

func getDomain(link string) string {
	url, err := url.Parse(link)
	if err != nil {
		log.Fatal(err)
	}

	return url.Hostname()
}

func CheckUrls(c *gin.Context) {

	body := CheckUrlBody{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	var wg sync.WaitGroup

	responseMap := make(map[string]utils.GetUrlOutput, len(body.Urls))

	for _, url := range body.Urls {
		wg.Add(1)

		go func(url string) {
			domain := getDomain(url)
			responseMap[domain] = utils.GetUrl(url, body.Timeout, body.UserAgent)
			defer wg.Done()
		}(url)

	}

	wg.Wait()

	c.JSON(http.StatusOK, &responseMap)
}
