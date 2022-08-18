package data

type UserRole int

const (
	Admin UserRole = iota
	RegUser
)

func (r UserRole) String() string {
	switch r {
	case Admin:
		return "Admin"
	case RegUser:
		return "RegUser"
	}
	return "unknown"
}