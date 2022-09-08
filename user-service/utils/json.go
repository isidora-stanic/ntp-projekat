package utils

import (
	"encoding/json"
	"net/http"
)

func ReturnResponseAsJson(rw http.ResponseWriter, respDTO any) {
	err := json.NewEncoder(rw).Encode(respDTO) //dlp.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}