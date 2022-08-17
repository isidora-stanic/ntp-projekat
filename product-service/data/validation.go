package data

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

func validateSKU(fl validator.FieldLevel) bool {
	// sku is of format abc-absd-dfsaf
	re := regexp.MustCompile(`^[A-Z0-9]{8,}$`)
	matches := re.FindAllString(fl.Field().String(), -1)
	if len(matches) != 1 {
		return false
	}

	return true
}

func (p *Product) Validate() error {
	validate := validator.New()
	validate.RegisterValidation("sku", validateSKU)
	return validate.Struct(p)
}