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
}

func (p*Product) ToDTO() ProductDTO {
	return ProductDTO{ID: p.ID, Name: p.Name, Description: p.Description, ImageSrc: p.ImageSrc, Price: p.Price, SKU: p.SKU}
}