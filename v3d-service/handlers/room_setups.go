package handlers

import "log"

type RoomSetups struct {
	l *log.Logger
}

func NewRoomSetups(l *log.Logger) *RoomSetups {
	return &RoomSetups{l}
}

type KeyRoomSetup struct{}