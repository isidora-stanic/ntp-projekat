import React from "react"

export const WishlistContext = React.createContext()

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = React.useState([])

    const addProduct = (product) => {
      setWishlist([...wishlist, product])
    }

    const removeProduct = (product) => {
        setWishlist(wishlist.filter(p => p.id === product.id))
      }
    
  
    return (
      <WishlistContext.Provider value={{ wishlist, setWishlist, addProduct, removeProduct }}>
        {children}
      </WishlistContext.Provider>
    )
  }
  