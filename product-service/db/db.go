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
		Name:			"ZALA FIUME ZRF 61090",
		Description: 	"Nova serija iz 2021 kolekcije",
		Price:       	1829,
		SKU:         	"LSBZRF61",
		Producer: 	 	"Zala keramia",
		Brand: 			"Lasselsberger Zala keramia",
		Dimensions: 	"60x60",
		Type: 			"Podna",
		Finish: 		"Sjaj",
		Color: 			"Siva",
		Purpose: 		"Kupatilo",
		Serie: 			"Lasselsberger",
		Material:		"Mermer",
		BoxSize: 		0.36,
	},
	{
		Name:			"CESAROM MOVE GREY 6060-0283",
		Description: 	"CESAROM MOVE GREY 30X60 6060-0283\n1 kutija = 1,26m2\nSrebrne nanočestice u glazori CESAROM® Safe+ pločica aktivno eliminišu 99,99% bakterija i mirkoba, sprečavaju rast buđi i razmnožavanje bakterija.\nAntibakterijska zaštita je garantovana kroz ceo životni vek CESAROM® Safe+ pločica, unutrašnjih ili spoljašnjih, nezavisno od vremenskih uslova.",
		Price:       	1770,
		SKU:         	"CES60602",
		Producer: 	 	"Cesarom",
		Brand: 			"Cesarom",
		Dimensions: 	"30x60",
		Type: 			"Podna",
		Finish: 		"Mat",
		Color: 			"Siva",
		Purpose: 		"Spoljna",
		Serie: 			"Cesarom",
		Material:		"Kamen",
		BoxSize: 		0.36,
	},
	{
		Name:			"ZALA CANADA ZGD 62003 9mm 20x60 / I KLASA /",
		Description: 	"Rektifikovana (laserski sečena) pločica",
		Price:       	1656,
		SKU:         	"ZOR01025",
		Producer: 	 	"Zala keramia",
		Brand: 			"Lasselsberger Zala keramia",
		Dimensions: 	"20x60",
		Type: 			"Podna",
		Finish: 		"Mat",
		Color: 			"Braon",
		Purpose: 		"Kupatilo",
		Material:		"Keramika-Drvo",
		Serie: 			"Lasselsberger",
		BoxSize: 		0.36,
	},
	{
		Name:			"ZALA TEMPO ZGD 61165",
		Description: 	"Nova serija iz 2021 kolekcije",
		Price:       	1594,
		SKU:         	"LSBZGD62",
		Producer: 	 	"Zala keramia",
		Brand: 			"Lasselsberger Zala keramia",
		Dimensions: 	"60x60",
		Type: 			"Podna",
		Finish: 		"Mat",
		Color: 			"Siva svetla",
		Purpose: 		"Univerzalna",
		Material:		"Beton",
		Serie: 			"Lasselsberger",
		BoxSize: 		0.36,
	},
}

var	subscriptions = []models.Subscription{
	{
		ProductId: 		1,
		Email:			"admin@mail.com",
	},
	{
		ProductId: 		1,
		Email:			"user1@mail.com",
	},
	{
		ProductId: 		1,
		Email:			"user2@mail.com",
	},
	{
		ProductId: 		2,
		Email:			"admin@mail.com",
	},
	{
		ProductId: 		2,
		Email:			"user1@mail.com",
	},
	{
		ProductId: 		2,
		Email:			"user2@mail.com",
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
	Db.DropTableIfExists("subscriptions")
	Db.AutoMigrate(&models.Product{})
	Db.AutoMigrate(&models.Subscription{})

	for _, product := range products {
		Db.Create(&product)
	}

	for _, sub := range subscriptions {
		Db.Create(&sub)
	}
}