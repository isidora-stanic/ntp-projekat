package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/product-service/data"
)

func (p *Products) GetProducts(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Products")

	lp := data.GetProducts()

	err := lp.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
	}
}

func (p *Products) GetProduct(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}

	p.l.Println("[DEBUG] get record id", id)

	prod, _, err := data.FindProduct(id)

	switch err {
	case nil:

	case data.ErrProductNotFound:
		p.l.Println("[ERROR] fetching product", err)
		http.Error(rw, "Product not found", http.StatusNotFound)
		return
	default:
		p.l.Println("[ERROR] fetching product", err)
		http.Error(rw, "Product not found", http.StatusInternalServerError)
		return
	}

	err = prod.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
	}
}