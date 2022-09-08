package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/product-service/db"
	"github.com/isidora-stanic/ntp-projekat/product-service/exceptions"
)

func (p *Products) DeleteProduct(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle DELETE Product")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	err = db.Delete(uid)

	if err == exceptions.ErrProductNotFound {
		http.Error(rw, "Product not found", http.StatusNotFound)
		return
	}

	if err != nil {
		http.Error(rw, "Product not found", http.StatusInternalServerError)
		return
	}
}