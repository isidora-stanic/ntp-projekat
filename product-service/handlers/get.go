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
	p.l.Println("Handle GET Products - now with db...")

	lp := db.GetAll()//data.GetProducts()

	p.l.Println(lp[len(lp)-1].Name)

	dlp := []models.ProductDTO{}
	
	for _, prod := range lp {
		p.l.Println(prod.SKU)
		dlp = append(dlp, prod.ToDTO())
	}

	utils.ReturnResponseAsJson(rw, dlp)
}

func (p *Products) GetProduct(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Product - now with db...")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	p.l.Println("[DEBUG] get record id", uid)

	prod, err := db.GetOne(uid)//data.FindProduct(id)

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