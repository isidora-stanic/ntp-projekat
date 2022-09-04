package models

import (
	"github.com/jinzhu/gorm"
)

type Product struct {
	gorm.Model

	Name        string  `json:"name" gorm:"column:name;not null;default:null"`
	Description string  `json:"description" gorm:"column:description;not null;default:null"`
	ImageSrc    string  `json:"image" gorm:"column:image;not null;default:null"`
	Price       float32 `json:"price" gorm:"column:price;min0.0"`
	SKU         string  `json:"sku" gorm:"column:sku;not null;default:null;unique"`
	Producer	string	`json:"producer" gorm:"column:producer;default:null"`
	Brand		string	`json:"brand" gorm:"column:brand;default:null"`
	Dimensions  string  `json:"dimensions" gorm:"column:dimensions;default:null"`
	Type        string  `json:"p_type" gorm:"column:type;default:null"`
	Finish		string	`json:"finish" gorm:"column:finish;default:null"`
	Purpose		string	`json:"purpose" gorm:"column:purpose;default:null"`
	Color		string	`json:"color" gorm:"column:color;default:null"`
	Serie		string	`json:"serie" gorm:"column:serie;default:null"`
	BoxSize		float32	`json:"box_size" gorm:"column:box_size;default:null"`
	Material	string	`json:"material" gorm:"column:material;default:null"`
}

type Subscription struct {
	gorm.Model

	ProductId	uint	`json:"product_id" gorm:"column:product_id;not null;default:null"`
	Email		string	`json:"email" gorm:"column:email;not null;default:null"`
}

func (p*Product) ToDTO() ProductDTO {
	return ProductDTO{
		ID: p.ID,
		Name: p.Name, 
		Description: p.Description, 
		ImageSrc: p.ImageSrc, 
		Price: p.Price, 
		SKU: p.SKU,
		Producer: p.Producer,
		Brand: p.Brand,
		Dimensions: p.Dimensions,
		Type: p.Type,
		Finish: p.Finish,
		Purpose: p.Purpose,
		Color: p.Color,
		Serie: p.Serie,
		BoxSize: p.BoxSize,
		Material: p.Material,
	}
}