package models

import (
	"encoding/json"
	"io"
	"regexp"

	"github.com/go-playground/validator"
)

type ProductDTO struct {
	ID          uint    `json:"id"`
	Name        string  `json:"name" validate:"required"`
	Description string  `json:"description"`
	ImageSrc    string  `json:"image"`
	Price       float32 `json:"price" validate:"gt=0"`
	SKU         string  `json:"sku" validate:"required,sku"`
	Producer	string	`json:"producer"`
	Brand		string	`json:"brand"`
	Dimensions  string  `json:"dimensions"`
	Type        string  `json:"type"`
	Finish		string	`json:"finish"`
	Purpose		string	`json:"purpose"`
	Color		string	`json:"color"`
	Series		string	`json:"series"`
	BoxSize		float32	`json:"boxSize"`
}

func (p *ProductDTO) ToProduct() Product {
	return Product{
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

func (p *ProductDTO) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(p)
}

func (p *ProductDTO) FromJSON(r io.Reader) error {
	d := json.NewDecoder(r)
	return d.Decode(p)
}

func validateSKU(fl validator.FieldLevel) bool {
	// sku is of format abc-absd-dfsaf
	re := regexp.MustCompile(`^[A-Z0-9]{8,}$`)
	matches := re.FindAllString(fl.Field().String(), -1)
	if len(matches) != 1 {
		return false
	}

	return true
}

func (p *ProductDTO) Validate() error {
	validate := validator.New()
	validate.RegisterValidation("sku", validateSKU)
	return validate.Struct(p)
}