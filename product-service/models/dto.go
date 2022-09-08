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
	Price       float32 `json:"price" validate:"required,gt=0"`
	SKU         string  `json:"sku" validate:"required,sku"`
	Producer	string	`json:"producer"`
	Brand		string	`json:"brand"`
	Dimensions  string  `json:"dimensions"`
	Type        string  `json:"p_type"`
	Finish		string	`json:"finish"`
	Purpose		string	`json:"purpose"`
	Color		string	`json:"color"`
	Serie		string	`json:"serie"`
	BoxSize		float32	`json:"box_size"`
	Material	string	`json:"material"`
}

type SubscriptionDTO struct {
	ID          uint    `json:"id"`
	ProductId   uint    `json:"product_id"`
	Email		string	`json:"email"`
}

type FilterOptions struct {
	List		[]FilterOption	`json:"list"`
}

type FilterOption struct {
	Name 		string 	 `json:"name"`
	Options		[]string `json:"opts"`
}

type FilterDTO struct {
	LowerPrice	float32		`json:"lowerPrice"`
	UpperPrice	float32		`json:"upperPrice"`
	Brand		[]string	`json:"brand"`
	Dimensions  []string  	`json:"dimensions"`
	Type        []string  	`json:"p_type"`
	Finish		[]string	`json:"finish"`
	Purpose		[]string	`json:"purpose"`
	Color		[]string	`json:"color"`
	Serie		[]string	`json:"serie"`
	Material	[]string	`json:"material"`
	SearchQuery string		`json:"search_query"`
	SortBy 		string		`json:"sort_by"`
}

type PageResponse struct {
	List	[]ProductDTO	`json:"list"`
	Total	int				`json:"total"`
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
		Serie: p.Serie,
		BoxSize: p.BoxSize,
		Material: p.Material,
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