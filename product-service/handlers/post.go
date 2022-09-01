package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
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

	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
	}

	resDto := []models.ProductDTO{}

	for _, p := range(res) {
		resDto = append(resDto, p.ToDTO())
	}

	
	page := models.PageResponse{List: resDto, Total: total}

	utils.ReturnResponseAsJson(rw, page)
}

func (p *Products) GetHasAnyOfTheFilters(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Filtered Any")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	res, err := db.GetHasAnyOfTheFilters(uid, r)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
	}

	resDto := []models.ProductDTO{}

	for _, p := range(res) {
		resDto = append(resDto, p.ToDTO())
	}

	p.l.Println("Any filter returns: \n", resDto)

	utils.ReturnResponseAsJson(rw, resDto)
}