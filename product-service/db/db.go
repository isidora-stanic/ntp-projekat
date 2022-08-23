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
		Name:			"ZORKA Architect KD - 02 (light blue)",
		Description: 	"Podna plocica u proizdvodnji od 2021.",
		Price:       	1.900,
		SKU:         	"ZOR01021",
		ImageSrc: 	 	"https://www.kerametal.rs/media/catalog/product/cache/c3885502dbfa89ce2d2028a3ae6c3079/9/0/900704.jpg",
		Producer: 	 	"Zorka-keramika",
		Brand: 			"Zorka keramika",
		Dimensions: 	"10x20",
		Type: 			"Podna",
		Finish: 		"Mat",
		Color: 			"Plava",
		Purpose: 		"Kupatilo",
		Serie: 			"Avalon",
		BoxSize: 		0.36,
	},
	{
		Name:			"ZORKA Architect KDS - 02 (light blue smoot)",
		Description: 	"Podna plocica u proizdvodnji od 2021.",
		Price:       	1.900,
		SKU:         	"ZOR01027",
		ImageSrc: 	 	"https://www.kerametal.rs/media/catalog/product/cache/c3885502dbfa89ce2d2028a3ae6c3079/9/0/900705.jpg",
		Producer: 	 	"Zorka-keramika",
		Brand: 			"keramika",
		Dimensions: 	"10x20",
		Type: 			"Podna",
		Finish: 		"Mat",
		Color: 			"Plava",
		Purpose: 		"Kupatilo",
		Serie: 			"Avalon",
		BoxSize: 		0.36,
	},
	{
		Name:			"ZORKA Architect KD - 06 (blue)",
		Description: 	"Podna plocica u proizdvodnji od 2021.",
		Price:       	1.900,
		SKU:         	"ZOR01025",
		ImageSrc: 	 	"https://www.kerametal.rs/media/catalog/product/cache/c3885502dbfa89ce2d2028a3ae6c3079/9/0/900706.jpg",
		Producer: 	 	"Zorka-keramika",
		Brand: 			"Zorka",
		Dimensions: 	"10x20",
		Type: 			"Podna",
		Finish: 		"Mat",
		Color: 			"Plava",
		Purpose: 		"Kupatilo",
		Serie: 			"Avalon",
		BoxSize: 		0.36,
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