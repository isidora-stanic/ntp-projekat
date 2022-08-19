package handlers

import (
	"net/http"

	"github.com/isidora-stanic/ntp-projekat/product-service/db"
	"github.com/isidora-stanic/ntp-projekat/product-service/utils"

	"github.com/isidora-stanic/ntp-projekat/product-service/models"
)

func (p *Products) AddProduct(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle POST Product - now with db...")

	prod := r.Context().Value(KeyProduct{}).(models.ProductDTO)
	modelProd := prod.ToProduct()
	saved, err := db.Create(modelProd)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusBadRequest)
	}

	utils.ReturnResponseAsJson(rw, saved.ToDTO())
}
