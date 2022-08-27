package db

import (
	"fmt"
	"log"
	"time"

	"github.com/isidora-stanic/ntp-projekat/user-service/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var	users = []models.User{
	{
		FirstName:      "Admin",
		LastName: 		"Adminic",
		Password:       "$2a$14$oYrDY4gbNnmCokRpY5xzPe3/8qa0yKwSJqUXsuVLL/eicZ5lEjtoO", // 'password'
		Email:          "admin@mail.com",
		Role: 			models.ADMIN,
		BannedUntil: 	time.Now(),
	},
	{
		FirstName:      "User1",
		LastName: 		"User1ic",
		Password:       "$2a$14$oYrDY4gbNnmCokRpY5xzPe3/8qa0yKwSJqUXsuVLL/eicZ5lEjtoO",
		Email:          "user1@mail.com",
		Role: 			models.REGUSER,
		BannedUntil: 	time.Now(),
	},
	{
		FirstName:      "User2",
		LastName: 		"User2ic",
		Password:       "$2a$14$oYrDY4gbNnmCokRpY5xzPe3/8qa0yKwSJqUXsuVLL/eicZ5lEjtoO",
		Email:          "user2@mail.com",
		Role: 			models.REGUSER,
		BannedUntil: 	time.Now(),
	},
}

var Db *gorm.DB
var err error

func Init() {
	connectionString := "user=postgres password=password dbname=user_db sslmode=disable port=5432 host=localhost"
	dialect := "postgres"

	Db, err = gorm.Open(dialect, connectionString)
	if err != nil {
		log.Fatal("Ima greska!!!!", err)
		return
	} else {
		fmt.Println("Connection to DB successfull.")
	}

	Db.DropTableIfExists("users")
	Db.AutoMigrate(&models.User{})

	for _, user := range users {
		Db.Create(&user)
	}
}