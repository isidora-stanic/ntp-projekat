package exceptions

import "fmt"

var ErrUserNotFound = fmt.Errorf("User not found")

var ErrUserBanned = fmt.Errorf("User is banned")