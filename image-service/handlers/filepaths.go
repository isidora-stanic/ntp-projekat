package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/mux"
)

func (f *Files) GetAllImagesForProduct(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var files []string

	root := "./imagestore/" + id
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		var forwardPath = strings.Replace(path, "\\", "/", -1)
		var webPath = strings.Replace(forwardPath, "imagestore", "http://localhost:9098/images", -1)
		files = append(files, webPath)
		return nil
	})
	if err != nil {
		panic(err)
	}
	for _, file := range files[1:] {
		fmt.Println(file)
	}

	rw.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(rw).Encode(files[1:])
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}

func (f *Files) GetNormalImagesForProduct(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var files []string

	root := "./imagestore/" + id
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		
		if !(strings.Contains(path, "bump") || strings.Contains(path, "rough") || strings.Contains(path, "diffuse") || strings.Contains(path, "dissplace")) {
			var forwardPath = strings.Replace(path, "\\", "/", -1)
			var webPath = strings.Replace(forwardPath, "imagestore", "http://localhost:9098/images", -1)
			files = append(files, webPath)
		}
		
		return nil
	})
	if err != nil {
		panic(err)
	}
	for _, file := range files[1:] {
		fmt.Println(file)
	}

	rw.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(rw).Encode(files[1:])
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}

func (f *Files) GetMainImageForProduct(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var files []string

	root := "./imagestore/" + id
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		
		if strings.Contains(path, "main") {
			var forwardPath = strings.Replace(path, "\\", "/", -1)
			var webPath = strings.Replace(forwardPath, "imagestore", "http://localhost:9098/images", -1)
			files = append(files, webPath)
		}
		
		return nil
	})
	if err != nil {
		panic(err)
	}
	for _, file := range files[0] {
		fmt.Println(file)
	}

	rw.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(rw).Encode(files[0])
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}

func (f *Files) GetMapImagesForProduct(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var files []string

	root := "./imagestore/" + id
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		
		if strings.Contains(path, "bump") || strings.Contains(path, "rough") || strings.Contains(path, "diffuse") || strings.Contains(path, "dissplace") {
			var forwardPath = strings.Replace(path, "\\", "/", -1)
			var webPath = strings.Replace(forwardPath, "imagestore", "http://localhost:9098/images", -1)
			files = append(files, webPath)
		}
		
		return nil
	})
	if err != nil {
		panic(err)
	}
	for _, file := range files {
		fmt.Println(file)
	}

	rw.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(rw).Encode(files)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}