package db

import (
	"fmt"
	"log"

	"github.com/isidora-stanic/ntp-projekat/product-service/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var	products = []models.Product{
	{
		Name:        "Latte",
		Description: "Frothy milky coffee",
		Price:       2.45,
		SKU:         "DHL00234",
		ImageSrc: 	 "http://localhost:9090/images/default_tile.jpg",
	},
	{
		Name:        "Espresso",
		Description: "Short and strong coffee without milk",
		Price:       1.99,
		SKU:         "DHE00001",
		ImageSrc: 	 "http://localhost:9090/images/default_tile.jpg",
	},
	{
		Name:        "Espresso2",
		Description: "Short and strong coffee without milk",
		Price:       1.99,
		SKU:         "DHE00002",
		ImageSrc: 	 "http://localhost:9090/images/default_tile.jpg",
	},
}

var Db *gorm.DB
var err error

func Init() {
	connectionString := "user=postgres password=password dbname=product_db sslmode=disable port=5432 host=localhost"
	dialect := "postgres"

	Db, err = gorm.Open(dialect, connectionString)
	if err != nil {
		log.Fatal("Ima greska!!!!", err)
		return
	} else {
		fmt.Println("Connection to DB successfull.")
	}

	Db.DropTableIfExists("products")
	Db.AutoMigrate(&models.Product{})

	for _, product := range products {
		Db.Create(&product)
	}
}