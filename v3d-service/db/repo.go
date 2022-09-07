package db

import (
	"github.com/isidora-stanic/ntp-projekat/v3d-service/exceptions"
	"gorm.io/gorm"
)

type Wall struct {
	gorm.Model

	RoomSetupId			uint `json:"room_id" gorm:"column:room_id;not null;default:null"`
	TileSize1        	int  `json:"size1" gorm:"column:size1;not null;default:null;min:0"`
	TileSize2        	int  `json:"size2" gorm:"column:size2;not null;default:null;min:0"`
	WallSize1 			int  `json:"wallSize1" gorm:"column:wallSize1;not null;default:null;min:0"`
	WallSize2 			int  `json:"wallSize2" gorm:"column:wallSize2;not null;default:null;min:0"`
	BumpMap    			string  `json:"bump" gorm:"column:bump;default:null"`
	ImageMap       		string `json:"image" gorm:"column:image;default:null"`
	RoughnessMap        string  `json:"roughness" gorm:"column:roughness;default:null"`
	ProductId			uint	`json:"product_id" gorm:"column:product_id;not null;default:null"`
	ProductName			string	`json:"product_name" gorm:"column:product_name;default:null"`
}

type RoomSetup struct {
	gorm.Model

	Name        string  `json:"name" gorm:"column:name;not null;default:null"`
	Description string  `json:"description" gorm:"column:description;default:null"`
	UserId		uint	`json:"user_id" gorm:"column:user_id;not null;default:null"`
	SizeA		int		`json:"a" gorm:"column:a;not null;default:null"`
	SizeB		int		`json:"b" gorm:"column:b;not null;default:null"`
	SizeC		int		`json:"c" gorm:"column:c;not null;default:null"`

	Walls		[]Wall	`json:"walls" gorm:"column:walls;not null;default:null"`
}

func GetOne(id uint32) (RoomSetup, error) {
	var room RoomSetup
	var walls []Wall

	Db.First(&room, id)
	Db.Model(&room).Related(&walls)

	room.Walls = walls

	if room.ID == 0 {
		return room, exceptions.ErrRoomNotFound
	}

	return room, nil
}

func GetAllByUser(id uint32) ([]RoomSetup, error) {
	var rooms []RoomSetup

	roomS:= &RoomSetup{}

	err := Db.Model(roomS).
			Where("user_id = ?", id).
			Find(&rooms).Error

	if err != nil {
		return nil, err
	}

	// for _, room := range rooms {
	// 	var walls []Wall
	// 	Db.Model(&room).Related(&walls)
	// 	fmt.Println("Walls ", walls)
	// 	room.Walls = walls
	// }

	// fmt.Println("Changed " ,rooms)

	return rooms, nil
}

func Create(p RoomSetup) (RoomSetup, error) {
	saved := Db.Create(&p)

	if saved.Error != nil {
		return p, saved.Error
	}

	for _, w := range p.Walls {
		w.RoomSetupId = p.ID
		sw := Db.Create(&w)
		if sw.Error != nil {
			return p, sw.Error
		}
	}
	return p, nil
}

func Delete(id uint32) (error) {
	var room RoomSetup
	var walls []Wall

	err := Db.First(&room, id).Error
	if err != nil {
		return err
	}
	err = Db.Model(&room).Related(&walls).Error
	if err != nil {
		return err
	}


	Db.Delete(&room)
	for _, w := range walls {
		err = Db.Delete(&w).Error
		if err != nil {
			return err
		}
	}

	return nil
}