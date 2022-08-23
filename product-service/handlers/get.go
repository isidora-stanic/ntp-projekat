package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/product-service/db"
	"github.com/isidora-stanic/ntp-projekat/product-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/product-service/models"
	"github.com/isidora-stanic/ntp-projekat/product-service/utils"
)

func (p *Products) GetProducts(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Products")

	lp := db.GetAll()

	dlp := []models.ProductDTO{}
	
	for _, prod := range lp {
		dlp = append(dlp, prod.ToDTO())
	}

	utils.ReturnResponseAsJson(rw, dlp)
}

func (p *Products) GetProduct(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Product")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	p.l.Println("[DEBUG] get record id", uid)

	prod, err := db.GetOne(uid)

	switch err {
	case nil:

	case exceptions.ErrProductNotFound:
		p.l.Println("[ERROR] fetching product", err)
		http.Error(rw, "Product not found", http.StatusNotFound)
		return
	default:
		p.l.Println("[ERROR] fetching product", err)
		http.Error(rw, "Product not found", http.StatusInternalServerError)
		return
	}

	utils.ReturnResponseAsJson(rw, prod.ToDTO())
}

func (p*Products) GetFilterOptions(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Product Filter Options")

	filters, err := db.GetFilterOptions()

	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
	}

	utils.ReturnResponseAsJson(rw, filters)
}