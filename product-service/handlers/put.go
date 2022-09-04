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

func (p *Products) UpdateProducts(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle PUT Product - now with db...")
	
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	p.l.Println("Handle PUT Product", uid)
	prod := r.Context().Value(KeyProduct{}).(models.ProductDTO)

	uprod, err := db.Update(uid, prod.ToProduct())

	if err == exceptions.ErrProductNotFound {
		http.Error(rw, "Product not found", http.StatusNotFound)
		return
	}

	if err != nil {
		http.Error(rw, "Product not found", http.StatusInternalServerError)
		return
	}

	utils.ReturnResponseAsJson(rw, uprod.ToDTO())
}

func (p *Products) Subscribe(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle Sub - now with db...")
	
	vars := mux.Vars(r)
	email := vars["email"]

	pId, err := strconv.ParseUint(vars["product_id"], 10, 32)

	if err != nil {
		http.Error(rw, "Unable to convert product id", http.StatusBadRequest)
		return
	}

	err = db.SubscribeUser(email, uint(pId))
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (p *Products) Unsubscribe(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle Unsub - now with db...")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint(id)

	err = db.UnsubscribeUser(uid)

	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

}