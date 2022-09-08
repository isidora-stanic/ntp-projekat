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

func (p*Products) GetSimilarProductsSamePurpose(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Filtered Products")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	res, err := db.GetSimilarProductsSamePurpose(uid)

	resDto := []models.ProductDTO{}

	for _, p := range(res) {
		resDto = append(resDto, p.ToDTO())
	}

	utils.ReturnResponseAsJson(rw, resDto)
}

func (p*Products) GetSubscription(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Subscription by product and email")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["product_id"], 10, 32)
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	email := vars["email"]

	sub, err := db.GetSubForProductAndUser(uid, email)

	if err != nil {
		p.l.Println(err.Error())
		http.Error(rw, err.Error(), http.StatusNotFound)
		return
	}

	utils.ReturnResponseAsJson(rw, sub.ToDTO())
}

func (p*Products) GetSubscriptionsForProduct(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Subscription for product")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["product_id"], 10, 32)
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	subs, err := db.GetSubsForProducts(uid)

	if err != nil {
		p.l.Println(err.Error())
		http.Error(rw, err.Error(), http.StatusNotFound)
		return
	}

	subsDto := []models.SubscriptionDTO{}
	for _, s := range subs {
		subsDto = append(subsDto, s.ToDTO())
	}

	utils.ReturnResponseAsJson(rw, subsDto)
}