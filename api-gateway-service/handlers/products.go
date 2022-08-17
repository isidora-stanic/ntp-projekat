package handlers

import (
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)
const ProductService string = "/api/products"

type Products struct {
	l *log.Logger
}

func NewProducts(l*log.Logger) *Products {
	return &Products{l}
}

type KeyProduct struct{}

func (p *Products) GetAllProducts(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	response, err := http.Get(
		utils.ProductServiceRoot.Next().Host + ProductService + "")

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Products) GetOneProduct(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.ProductServiceRoot.Next().Host + ProductService + "/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Products) AddProduct(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.ProductServiceRoot.Next().Host+ProductService, r.Body)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	response, err := client.Do(req)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Products) UpdateProduct(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodPut,
		utils.ProductServiceRoot.Next().Host+ProductService+"/"+id, r.Body)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	response, err := client.Do(req)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Products) DeleteProduct(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodDelete,
		utils.ProductServiceRoot.Next().Host+ProductService+"/"+id, r.Body)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	response, err := client.Do(req)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p Products) MiddlewareInfo(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		p.l.Println("[INFO] ...redirecting to service for: " + strings.Split(r.URL.Path, "/api/")[1])
		// Call the next handler, which can be another middleware in the chain, or the final handler.
		next.ServeHTTP(rw, r)
	})
}