package utils

import (
	"io"
	"net/http"
	"net/url"

	roundrobin "github.com/hlts2/round-robin"
)

var ProductServiceRoot, _ = roundrobin.New(&url.URL{Host: "http://localhost:9090"})

func DelegateResponse(r *http.Response, rw http.ResponseWriter) {
	rw.Header().Set("Content-Type", r.Header.Get("Content-Type"))
	rw.Header().Set("Content-Length", r.Header.Get("Content-Length"))
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.WriteHeader(r.StatusCode)
	io.Copy(rw, r.Body)
	r.Body.Close()
}

func SetupResponse(rw*http.ResponseWriter, r*http.Request) {
	(*rw).Header().Set("Access-Control-Allow-Origin", "*")
	(*rw).Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
	(*rw).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}