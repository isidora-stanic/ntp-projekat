package db

import (
	"fmt"

	"github.com/isidora-stanic/ntp-projekat/product-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/product-service/models"
)

func GetAll() ([]models.Product) {
	fmt.Println("Hello from repo")
	var products []models.Product

	Db.Find(&products)

	fmt.Println(len(products))

	return products
}

func GetOne(id uint32) (models.Product, error) {
	var product models.Product

	Db.First(&product, id)

	if product.ID == 0 {
		return product, exceptions.ErrProductNotFound
	}

	return product, nil
}

func Create(p models.Product) (models.Product, error) {
	saved := Db.Create(&p)

	if saved.Error != nil {
		return p, saved.Error
	}

	return p, nil
}

func Update(id uint32, p models.Product) (models.Product, error) {
	found, err := GetOne(id)

	if err != nil {
		return found, err
	}

	found.ImageSrc = p.ImageSrc
	found.Name = p.Name
	found.Price = p.Price
	found.SKU = p.SKU
	found.Description = p.Description

	res := Db.Save(&found)

	return found, res.Error
}

func Delete(id uint32) (error) {
	found, err := GetOne(id)

	if err != nil {
		return err
	}

	Db.Delete(&found)

	return nil
}