package api

import (
	"mayibroswe/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CheckUrlBody struct {
	// json tag to de-serialize json body
	Url       string `json:"url"`
	Timeout   int    `json:"timeout"`
	UserAgent string `json:"userAgent"`
}

func CheckUrl(c *gin.Context) {

	body := CheckUrlBody{}
	// using BindJson method to serialize body with struct
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	result := utils.GetUrl(body.Url, body.Timeout, body.UserAgent)

	c.JSON(http.StatusOK, &result)
}
