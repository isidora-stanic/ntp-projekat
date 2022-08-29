package handlers

import (
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/hashicorp/go-hclog"
	"github.com/isidora-stanic/ntp-projekat/image-service/files"
)

// Files is a handler for reading and writing files
type Files struct {
	log   hclog.Logger
	store files.Storage
}

// NewFiles creates a new File handler
func NewFiles(s files.Storage, l hclog.Logger) *Files {
	return &Files{store: s, log: l}
}

// UploadImage implements the http.Handler interface
func (f *Files) UploadImage(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	fn := vars["filename"]

	f.log.Info("Handle POST", "id", id, "filename", fn)

	// no need to check for invalid id or filename as the mux router will not send requests
	// here unless they have the correct parameters

	f.saveFile(id, fn, rw, r)
}


// UploadImageMultipart implements the http.Handler interface
func (f *Files) UploadImageMultipart(rw http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(128 * 1024)
	
	if err != nil {
		f.log.Error("(Bad request) Expected multipart form data")
		http.Error(rw, "Expected multipart form data", http.StatusBadRequest)
		return
	}

	id, idErr := strconv.Atoi(r.FormValue("id"))
	f.log.Info("Process form for id", "id", id)
	if idErr != nil {
		f.log.Error("(Bad request) Expected multipart form data")
		http.Error(rw, "Expected integer id", http.StatusBadRequest)
		return
	}

	_, mh, err := r.FormFile("file")
	if err != nil {
		f.log.Error("(Bad request) Expected multipart form data")
		http.Error(rw, "Expected file", http.StatusBadRequest)
		return
	}

	f.saveFile(r.FormValue("id"), mh.Filename, rw, r)
}

func (f *Files) invalidURI(uri string, rw http.ResponseWriter) {
	f.log.Error("Invalid path", "path", uri)
	http.Error(rw, "Invalid file path should be in the format: /[id]/[filepath]", http.StatusBadRequest)
}

// saveFile saves the contents of the request to a file
func (f *Files) saveFile(id, path string, rw http.ResponseWriter, r *http.Request) {
	f.log.Info("Save file for product", "id", id, "path", path)

	fp := filepath.Join(id, path)
	err := f.store.Save(fp, r.Body)
	if err != nil {
		f.log.Error("Unable to save file", "error", err)
		http.Error(rw, "Unable to save file", http.StatusInternalServerError)
	}
}