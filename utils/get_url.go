package utils

import (
	"fmt"
	"io"
	"net/http"
	"time"
)

const DEFAULT_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"

type GetUrlOutput struct {
	Time    int64  `json:"time"`
	Status  int    `json:"status"`
	Size    int    `json:"size"`
	Blocked bool   `json:"blocked"`
	Error   string `json:"error"`
}

func GetUrl(url string, timeout int, userAgent string) GetUrlOutput {
	out := GetUrlOutput{
		Status:  -1,
		Time:    0,
		Size:    0,
		Blocked: false,
	}

	if len(userAgent) < 1 {
		userAgent = DEFAULT_USER_AGENT
	}

	client := http.Client{
		Timeout: time.Duration(timeout) * time.Second,
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		// log.Fatalln(err)
		fmt.Println(err)
		fmt.Println(err)
		out.Blocked = true
		out.Error = err.Error()
		return out

	}

	req.Header.Set("User-Agent", userAgent)

	start := time.Now()
	res, err := client.Do(req)
	out.Time = time.Since(start).Milliseconds()
	if err != nil {
		fmt.Println(err)
		out.Blocked = true
		out.Error = err.Error()
		return out
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return out
	}

	out.Size = len(body)
	out.Status = res.StatusCode
	return out
}
