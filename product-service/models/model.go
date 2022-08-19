package models

import (
	"github.com/jinzhu/gorm"
)

type Product struct {
	gorm.Model

	Name        string  `json:"name" gorm:"not null;default:null"`
	Description string  `json:"description" gorm:"not null;default:null"`
	ImageSrc    string  `json:"image" gorm:"not null;default:null"`
	Price       float32 `json:"price" gorm:"min0.0"`
	SKU         string  `json:"sku" gorm:"not null;default:null;unique"`
	Producer	string	`json:"producer" gorm:"default:null"`
	Brand		string	`json:"brand" gorm:"default:null"`
	Dimensions  string  `json:"dimensions" gorm:"default:null"`
	Type        string  `json:"type" gorm:"default:null"`
	Finish		string	`json:"finish" gorm:"default:null"`
	Purpose		string	`json:"purpose" gorm:"default:null"`
	Color		string	`json:"color" gorm:"default:null"`
	Series		string	`json:"series" gorm:"default:null"`
	BoxSize		float32	`json:"boxSize" gorm:"default:null"`
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
		Series: p.Series,
		BoxSize: p.BoxSize,
	}
}