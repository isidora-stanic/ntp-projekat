import React from "react"

export const WishlistContext = React.createContext()

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = React.useState([])

    const addProduct = (product) => {
      setWishlist([...wishlist, product])
    }

    const removeProduct = (product) => {
        setWishlist(wishlist.filter(p => p.id !== product.id))
      }

    const checkIfProductInWishlist = (product) => {
      console.log("product in wishlist", wishlist.filter(p => p.id === product.id).length)
      return wishlist.filter(p => p.id === product.id).length === 1
    }
    
  
    return (
      <WishlistContext.Provider value={{ wishlist, setWishlist, addProduct, removeProduct, checkIfProductInWishlist }}>
        {children}
      </WishlistContext.Provider>
    )
  }

  export const useWishlist = () => React.useContext(WishlistContext)