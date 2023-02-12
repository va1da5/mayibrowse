package utils

import "regexp"

func unique(stringSlice []string) []string {
	keys := make(map[string]bool)
	list := []string{}
	for _, entry := range stringSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}

func ParseUrls(content string, full_url bool) []string {
	pattern, _ := regexp.Compile("https?://[^\"\n< >\t]+")
	if !full_url {
		pattern, _ = regexp.Compile("https?://[^/\"\n< >\t]+")
	}

	return unique(pattern.FindAllString(content, -1))
}
