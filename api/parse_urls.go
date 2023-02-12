package api

import (
	"mayibroswe/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ParseUrlsBody struct {
	Content string `json:"content"`
	FullUrl bool   `json:"fullUrl"`
}

func ParseUrls(c *gin.Context) {

	body := ParseUrlsBody{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	result := utils.ParseUrls(body.Content, body.FullUrl)

	c.JSON(http.StatusOK, &result)
}
