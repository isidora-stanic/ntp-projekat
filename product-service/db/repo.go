package db

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/isidora-stanic/ntp-projekat/product-service/email"
	"github.com/isidora-stanic/ntp-projekat/product-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/product-service/models"
	"github.com/jinzhu/gorm"
)

func GetAll() ([]models.Product) {
	var products []models.Product

	Db.Find(&products)

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

	priceChanged := (found.Price != p.Price)
	oldPrice := found.Price
	newPrice := p.Price

	found.ImageSrc = p.ImageSrc
	found.Name = p.Name
	found.Price = p.Price
	found.SKU = p.SKU
	found.Description = p.Description
	found.Brand = p.Brand
	found.BoxSize = p.BoxSize
	found.Color = p.Color
	found.Purpose = p.Purpose
	found.Producer = p.Producer
	found.Dimensions = p.Dimensions
	found.Finish = p.Finish
	found.Serie = p.Serie
	found.Material = p.Material

	res := Db.Save(&found)

	if priceChanged {
		SendEmailsToSubs(id, oldPrice, newPrice, found.Name)
	}

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

type Result struct {
	res []Res
}

type Res struct {
	Brand string
}

func GetFilterOptions() (*models.FilterOptions, error) {
	all := GetAll()
	var brand []string
	var dimension []string
	var pType []string
	var finish []string
	var purpose []string
	var color []string
	var series []string
	var material []string

	for _, p := range all {
		brand = append(brand, p.Brand)
		dimension = append(dimension, p.Dimensions)
		pType = append(pType, p.Type)
		finish = append(finish, p.Finish)
		purpose = append(purpose, p.Purpose)
		color = append(color, p.Color)
		series = append(series, p.Serie)
		material = append(material, p.Material)
	}

	filters := models.FilterOptions{}
	filters.List = append(filters.List, models.FilterOption{Name: "Brand" , Options: unique(brand)})
	filters.List = append(filters.List, models.FilterOption{Name: "Dimension" , Options: unique(dimension)})
	filters.List = append(filters.List, models.FilterOption{Name: "Type" , Options: unique(pType)})
	filters.List = append(filters.List, models.FilterOption{Name: "Finish" , Options: unique(finish)})
	filters.List = append(filters.List, models.FilterOption{Name: "Purpose" , Options: unique(purpose)})
	filters.List = append(filters.List, models.FilterOption{Name: "Color" , Options: unique(color)})
	filters.List = append(filters.List, models.FilterOption{Name: "Series" , Options: unique(series)})
	filters.List = append(filters.List, models.FilterOption{Name: "Material" , Options: unique(material)})

	fmt.Println(brand)

	return &filters, nil
}

func unique(intSlice []string) []string {
    keys := make(map[string]bool)
    list := []string{}	
    for _, entry := range intSlice {
        if _, value := keys[entry]; !value {
            keys[entry] = true
            list = append(list, entry)
        }
    }    
    return list
}

func Paginate(r *http.Request) func(db *gorm.DB) *gorm.DB {
	return func (db *gorm.DB) *gorm.DB {
	  q := r.URL.Query()
	  page, _ := strconv.Atoi(q.Get("page"))
	  if page == 0 {
		page = 1
	  }
  
	  pageSize, _ := strconv.Atoi(q.Get("page_size"))
	  switch {
	  case pageSize > 100:
		pageSize = 100
	  case pageSize <= 0:
		pageSize = 10
	  }

	  fmt.Println("Got: ", page, pageSize)
  
	  offset := (page - 1) * pageSize
	  return db.Offset(offset).Limit(pageSize)
	}
  }

// contains checks if a string is present in a slice
func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func GetHasAnyOfTheFilters(uid uint32, r *http.Request) ([]models.Product, error) {
	var filterDto models.FilterDTO

	err := json.NewDecoder(r.Body).Decode(&filterDto)
	if err != nil {
		return nil, err
	}

	materialOpts := strings.Join(filterDto.Material, "|")
	finishOpts := strings.Join(filterDto.Finish, "|")
	purposeOpts := strings.Join(filterDto.Purpose, "|")
	colorOpts := strings.Join(filterDto.Color, "|")

	var result []models.Product

	err1 := Db.Table("products").Where("(products.color ~* ? OR products.finish ~* ? OR "+
	"products.material ~* ?) AND products.purpose ~* ? AND deleted_at IS NULL AND products.id != ?",
	colorOpts, finishOpts,
	materialOpts, purposeOpts, uid,
	).Find(&result).Error

	if err1 != nil {
		return nil, err1
	}

	return result, nil
}

func GetSimilarProductsSamePurpose(id uint32) ([]models.Product, error) {
	product, err := GetOne(id)

	if err != nil {
		return nil, err
	}

	var result []models.Product
	

	err1 := Db.Table("products").Where("(products.brand ~* ? OR products.producer ~* ? OR "+
	"products.serie ~* ? OR products.material ~* ?) AND products.purpose ~* ? AND deleted_at IS NULL AND products.id != ?",
	product.Brand, product.Producer,
	product.Serie, product.Material, product.Purpose, id,
	).Find(&result).Error

	if err1 != nil {
		return nil, err1
	}

	return result, nil
}

func GetFilteredProductsPaginated(r *http.Request) ([]models.Product, int, error) {
	var filterDto models.FilterDTO

	err := json.NewDecoder(r.Body).Decode(&filterDto)
	if err != nil {
		return nil, 0, err
	}

	fmt.Println("Got: ", filterDto)
	
	var resultPage []models.Product
	var totalRes int

	brandOpts := strings.Join(filterDto.Brand, "|")
	dimOpts := strings.Join(filterDto.Dimensions, "|")
	typeOpts := strings.Join(filterDto.Type, "|")
	finishOpts := strings.Join(filterDto.Finish, "|")
	purposeOpts := strings.Join(filterDto.Purpose, "|")
	colorOpts := strings.Join(filterDto.Color, "|")
	serieOpts := strings.Join(filterDto.Serie, "|")
	materialOpts := strings.Join(filterDto.Material, "|")

	fmt.Println("Got: ", brandOpts, dimOpts, typeOpts, finishOpts, purposeOpts, colorOpts, serieOpts)

	//select * from table where value ~* 'foo|bar|baz';

	err1 := Db.Scopes(Paginate(r)).Table("products").Where("(products.price BETWEEN ? AND ?) AND "+
	"products.brand ~* ? AND products.dimensions ~* ? AND products.type ~* ? AND "+
	"products.finish ~* ? AND products.purpose ~* ? AND products.color ~* ? AND products.serie ~* ? AND products.material ~* ? AND products.name ILIKE ? AND deleted_at IS NULL",
	filterDto.LowerPrice, filterDto.UpperPrice,
	brandOpts, dimOpts, typeOpts,
	finishOpts, purposeOpts, colorOpts,
	serieOpts, materialOpts, "%"+filterDto.SearchQuery+"%",
	).Order(filterDto.SortBy).Find(&resultPage).Error

	err2 := Db.Table("products").Where("(products.price BETWEEN ? AND ?) AND "+
	"products.brand ~* ? AND products.dimensions ~* ? AND products.type ~* ? AND "+
	"products.finish ~* ? AND products.purpose ~* ? AND products.color ~* ? AND products.serie ~* ? AND products.material ~* ? AND products.name LIKE ? AND deleted_at IS NULL",
	filterDto.LowerPrice, filterDto.UpperPrice,
	brandOpts, dimOpts, typeOpts,
	finishOpts, purposeOpts, colorOpts,
	serieOpts, materialOpts, "%"+filterDto.SearchQuery+"%",
	).Select("COUNT(*)").Row().Scan(&totalRes)

	if err1 != nil {
		return nil, 0, err1
	}
	if err2 != nil {
		return nil, 0, err2
	}

	return resultPage, totalRes, nil
}

func GetSubsForProducts(id uint32) ([]models.Subscription, error)  {
	var subs []models.Subscription

	err := Db.Table("subscriptions").Where("subscriptions.product_id = ? AND subscriptions.deleted_at IS NULL", id).Find(&subs).Error

	if err != nil {
		return nil, err
	}

	fmt.Println(subs)

	return subs, nil
}

func GetSubForProductAndUser(id uint32, email string) (models.Subscription, error)  {
	var sub models.Subscription

	err := Db.Table("subscriptions").Where("subscriptions.product_id = ? AND subscriptions.email = ? AND subscriptions.deleted_at IS NULL", id, email).First(&sub).Error

	if err != nil {
		return sub, err
	}

	fmt.Println(sub)

	return sub, nil
}


func SendEmailsToSubs(id uint32, oldPrice float32, newPrice float32, pName string) {
	subs, err := GetSubsForProducts(id)

	if err != nil {
		return
	}

	for _, sub := range subs {
		email.SendEmail("admin@mail.com", sub.Email, "Price for " + pName + " changed", "Price for " + pName + " changed. Old price was " + strconv.FormatFloat(float64(oldPrice), 'f', 2, 32) + "RSD. Now it's " + strconv.FormatFloat(float64(newPrice), 'f', 2, 32) + "RSD. You can visit http://localhost:3000/product/"+strconv.FormatUint(uint64(id), 10)+" to see this product.")
	}
}

func SubscribeUser(email string, prodId uint) (error) {
	// todo impl
	err := Db.Create(&models.Subscription{Email: email, ProductId: prodId}).Error

	if err != nil {
		return err
	}

	return nil
}

func UnsubscribeUser(id uint) (error) {
	// todo impl
	var sub models.Subscription

	Db.First(&sub, id)

	if sub.ID == 0 {
		return exceptions.ErrProductNotFound
	}

	Db.Delete(&sub)

	return nil
}