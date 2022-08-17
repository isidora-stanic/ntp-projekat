package data

import (
	"fmt"
)

type Product struct {
	ID          int 		`json:"id"`
	Name        string 		`json:"name" validate:"required"`
	Description string 		`json:"description"`
	ImageSrc	string		`json:"image"`
	Price       float32 	`json:"price" validate:"gt=0"`
	SKU         string 		`json:"sku" validate:"required,sku"`
}

type Products []*Product


func GetProducts() Products {
	return productList
}

func AddProduct(p*Product) {
	p.ID = getNextID()
	productList = append(productList, p)
}

func UpdateProduct(id int, p*Product) error {
	_, pos, err := FindProduct(id)
	if err != nil {
		return err
	}
	
	p.ID = id
	productList[pos] = p
	return nil
}

func DeleteProduct(id int) error {
	_, i, _ := FindProduct(id)
	if i == -1 {
		return ErrProductNotFound
	}

	productList = append(productList[:i], productList[i+1])

	return nil
}

var ErrProductNotFound = fmt.Errorf("Product not found")

func FindProduct(id int) (*Product, int, error) {
	for i, p := range productList {
		if p.ID == id {
			return p, i, nil
		}
	}

	return nil, -1, ErrProductNotFound
}

func getNextID() int {
	lp := productList[len(productList) - 1]
	return lp.ID + 1
}

var productList = []*Product{
	{
		ID:          1,
		Name:        "Latte",
		Description: "Frothy milky coffee",
		Price:       2.45,
		SKU:         "DHL00001",
		ImageSrc: 	 "http://localhost:9090/images/default_tile.jpg",
	},
	{
		ID:          2,
		Name:        "Espresso",
		Description: "Short and strong coffee without milk",
		Price:       1.99,
		SKU:         "DHE00001",
		ImageSrc: 	 "http://localhost:9090/images/default_tile.jpg",
	},
}