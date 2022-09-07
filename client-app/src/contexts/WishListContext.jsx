import React from "react"
import axios from 'axios'

export const WishlistContext = React.createContext()

export const WishlistProvider = ({ children }) => {

    let fromStorage = JSON.parse(localStorage.getItem('wishlist'))
    let initialState = []
    fromStorage ? initialState = fromStorage : initialState = []
    const [wishlist, setWishlist] = React.useState(initialState)
    /*
    {
        "ID": 7,
        "CreatedAt": "2022-09-05T19:07:47.689107+02:00",
        "UpdatedAt": "2022-09-05T19:07:47.689107+02:00",
        "DeletedAt": null,
        "room_id": 2,
        "size1": 10,
        "size2": 20,
        "wallSize1": 250,
        "wallSize2": 300,
        "bump": "http://localhost:9098/images/2/chocolate_metro_bump.jpg",
        "image": "http://localhost:9098/images/2/chocolate_metro_diffuse.jpg",
        "roughness": "http://localhost:9098/images/2/chocolate_metro_roughness.jpg",
        "product_id": 2,
        "product_name": "Chocolate Metro"
      }
       */

    const addProduct = (product) => {
      let urls = []
      axios.get("http://localhost:9098/images/" + product.id + "/maps")
            .then((r) => {
                urls.push(r.data)
                setWishlist([
                  ...wishlist, 
                  {...product, 
                    bump: urls[0][0], image: urls[0][1], roughness: urls[0][2], 
                    size1: parseInt(product.dimensions.split("x")[0]), size2: parseInt(product.dimensions.split("x")[1]),
                    totalPrice: product.price,
                    // price: product.price
                  }
                ])
                console.log([
                  ...wishlist, 
                  {...product, 
                    bump: urls[0][0], image: urls[0][1], roughness: urls[0][2], 
                    size1: parseInt(product.dimensions.split("x")[0]), size2: parseInt(product.dimensions.split("x")[1]),
                    totalPrice: product.price,
                    // price: product.price
                  }
                ])

                localStorage.setItem('wishlist', JSON.stringify([
                  ...wishlist, 
                  {...product,  
                    bump: urls[0][0], image: urls[0][1], roughness: urls[0][2], 
                    size1: parseInt(product.dimensions.split("x")[0]), size2: parseInt(product.dimensions.split("x")[1]),
                    totalPrice: product.price,
                    // price: product.price
                  }
                ]))
            })
      .catch((e) => console.log(e))
      
    }

    const removeProduct = (product) => {
        setWishlist(wishlist.filter(p => p.id !== product.id))
        localStorage.setItem('wishlist',JSON.stringify(wishlist.filter(p => p.id !== product.id)))
      }

    const checkIfProductInWishlist = (product) => {
      // console.log("product in wishlist", wishlist.filter(p => p.id === product.id).length)
      return wishlist.filter(p => p.id === product.id).length === 1
    }
    
  
    return (
      <WishlistContext.Provider value={{ wishlist, setWishlist, addProduct, removeProduct, checkIfProductInWishlist }}>
        {children}
      </WishlistContext.Provider>
    )
  }

  export const useWishlist = () => React.useContext(WishlistContext)