package db

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var walls1 = []Wall{
	{
		RoomSetupId: 1,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/1/black_metro_bump.png",
		ImageMap:     "http://localhost:9098/images/1/black_metro_diffuse.png",
		RoughnessMap: "http://localhost:9098/images/1/black_metro_roughness.png",
		ProductId:    1,
		ProductName:  "Black Metro",
	},
	{
		RoomSetupId: 1,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/1/black_metro_bump.png",
		ImageMap:     "http://localhost:9098/images/1/black_metro_diffuse.png",
		RoughnessMap: "http://localhost:9098/images/1/black_metro_roughness.png",
		ProductId:    1,
		ProductName:  "Black Metro",
	},
	{
		RoomSetupId: 1,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/1/black_metro_bump.png",
		ImageMap:     "http://localhost:9098/images/1/black_metro_diffuse.png",
		RoughnessMap: "http://localhost:9098/images/1/black_metro_roughness.png",
		ProductId:    1,
		ProductName:  "Black Metro",
	},
	{
		RoomSetupId: 1,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/1/black_metro_bump.png",
		ImageMap:     "http://localhost:9098/images/1/black_metro_diffuse.png",
		RoughnessMap: "http://localhost:9098/images/1/black_metro_roughness.png",
		ProductId:    1,
		ProductName:  "Black Metro",
	},
	{
		RoomSetupId: 1,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/1/black_metro_bump.png",
		ImageMap:     "http://localhost:9098/images/1/black_metro_diffuse.png",
		RoughnessMap: "http://localhost:9098/images/1/black_metro_roughness.png",
		ProductId:    1,
		ProductName:  "Black Metro",
	},
	{
		RoomSetupId: 1,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/1/black_metro_bump.png",
		ImageMap:     "http://localhost:9098/images/1/black_metro_diffuse.png",
		RoughnessMap: "http://localhost:9098/images/1/black_metro_roughness.png",
		ProductId:    1,
		ProductName:  "Black Metro",
	},
}

var walls2 = []Wall {
	{
		RoomSetupId: 2,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/2/chocolate_metro_bump.jpg",
		ImageMap:     "http://localhost:9098/images/2/chocolate_metro_diffuse.jpg",
		RoughnessMap: "http://localhost:9098/images/2/chocolate_metro_roughness.jpg",
		ProductId:    1,
		ProductName:  "Chocolate Metro",
	},
	{
		RoomSetupId: 2,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/2/chocolate_metro_bump.jpg",
		ImageMap:     "http://localhost:9098/images/2/chocolate_metro_diffuse.jpg",
		RoughnessMap: "http://localhost:9098/images/2/chocolate_metro_roughness.jpg",
		ProductId:    1,
		ProductName:  "Chocolate Metro",
	},
	{
		RoomSetupId: 2,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/2/chocolate_metro_bump.jpg",
		ImageMap:     "http://localhost:9098/images/2/chocolate_metro_diffuse.jpg",
		RoughnessMap: "http://localhost:9098/images/2/chocolate_metro_roughness.jpg",
		ProductId:    1,
		ProductName:  "Chocolate Metro",
	},
	{
		RoomSetupId: 2,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/2/chocolate_metro_bump.jpg",
		ImageMap:     "http://localhost:9098/images/2/chocolate_metro_diffuse.jpg",
		RoughnessMap: "http://localhost:9098/images/2/chocolate_metro_roughness.jpg",
		ProductId:    1,
		ProductName:  "Chocolate Metro",
	},
	{
		RoomSetupId: 2,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/2/chocolate_metro_bump.jpg",
		ImageMap:     "http://localhost:9098/images/2/chocolate_metro_diffuse.jpg",
		RoughnessMap: "http://localhost:9098/images/2/chocolate_metro_roughness.jpg",
		ProductId:    1,
		ProductName:  "Chocolate Metro",
	},
	{
		RoomSetupId: 2,
		TileSize1:    10,
		TileSize2:    20,
		WallSize1:    250,
		WallSize2:    300,
		BumpMap:      "http://localhost:9098/images/2/chocolate_metro_bump.jpg",
		ImageMap:     "http://localhost:9098/images/2/chocolate_metro_diffuse.jpg",
		RoughnessMap: "http://localhost:9098/images/2/chocolate_metro_roughness.jpg",
		ProductId:    1,
		ProductName:  "Chocolate Metro",
	},
}

var roomSetups = []RoomSetup{
	{
		Name:        "Kupatilo 1",
		Description: "Kupatilo za vikendicu u karlovcima",
		UserId:      2,
		SizeA: 250,
		SizeB: 300,
		SizeC: 300,

		Walls: walls1,
	},
	{
		Name:        "Kupatilo 2",
		Description: "Kupatilo za vikendicu u cortanovcima",
		UserId:      2,
		SizeA: 300,
		SizeB: 200,
		SizeC: 250,

		Walls: walls2,
	},
}

var Db *gorm.DB
var err error

func Init() {
	connectionString := "user=postgres password=password dbname=v3d_db sslmode=disable port=5432 host=localhost"
	dialect := "postgres"

	Db, err = gorm.Open(dialect, connectionString)
	if err != nil {
		log.Fatal("Ima greska!!!!", err)
		return
	} else {
		fmt.Println("Connection to DB successfull.")
	}

	Db.DropTableIfExists("walls")
	Db.DropTableIfExists("room_setups")
	Db.AutoMigrate(&Wall{})
	Db.AutoMigrate(&RoomSetup{})

	for _, wall := range walls1 {
		Db.Create(&wall)
	}

	for _, wall := range walls2 {
		Db.Create(&wall)
	}

	for _, room := range roomSetups {
		Db.Create(&room)
	}
}