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

func (p*Products) GetFilteredPaginated(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Filtered Products")

	res, total, err := db.GetFilteredProductsPaginated(r)

	resDto := []models.ProductDTO{}

	for _, p := range(res) {
		resDto = append(resDto, p.ToDTO())
	}


	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
	}
	
	page := models.PageResponse{List: resDto, Total: total}

	utils.ReturnResponseAsJson(rw, page)
}