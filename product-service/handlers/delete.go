package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/product-service/data"
)

func (p *Products) DeleteProduct(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	Id, _ := strconv.Atoi(vars["id"])

	p.l.Println("Handle DELETE Product", Id)

	err := data.DeleteProduct(Id)

	if err == data.ErrProductNotFound {
		http.Error(rw, "Product not found", http.StatusNotFound)
		return
	}

	if err != nil {
		http.Error(rw, "Product not found", http.StatusInternalServerError)
		return
	}
}