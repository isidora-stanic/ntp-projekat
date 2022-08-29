package handlers

import (
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

// ServeHTTP implements the http.Handler interface
func (f *Files) DeleteImage(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	fn := vars["filename"]

	fp := filepath.Join(id, fn)
	err := f.store.Delete(fp)

	if err != nil {
		http.Error(rw, "Unable to delete file", http.StatusBadRequest)
	}
}