import React from 'react'
import * as THREE from "three"
import {useTexture} from '@react-three/drei'

const Tile = ({index, wallSize, size, bumpUrl, roughUrl, imageUrl}) => {
      const [bumpness, roughness, image] = useTexture([bumpUrl, roughUrl, imageUrl])

      bumpness.wrapS = THREE.RepeatWrapping
      bumpness.wrapT = THREE.RepeatWrapping
      roughness.wrapS = THREE.RepeatWrapping
      roughness.wrapT = THREE.RepeatWrapping
      image.wrapS = THREE.RepeatWrapping
      image.wrapT = THREE.RepeatWrapping

      bumpness.anisotropy = 4
      roughness.anisotropy = 4
      image.anisotropy = 4

      bumpness.offset.x = 0
      roughness.offset.x = 0
      image.offset.x = 0

      bumpness.offset.y = 0
      roughness.offset.y = 0
      image.offset.y = 0

      let times = [Math.ceil(wallSize[0]*1.0/size[0]), Math.ceil(wallSize[1]*1.0/size[1])]
      console.log("size of the wall is: ", wallSize[1], "x", wallSize[0])
      console.log(wallSize[1], '/', size[1], '=', Math.ceil(wallSize[1]/size[1]))
      console.log(wallSize[0], '/', size[0], '=', Math.ceil(wallSize[0]/size[0]))

      bumpness.repeat.set(Math.ceil(wallSize[1]/size[1]*2.0), Math.ceil(wallSize[0]/size[0]*2.0))
      roughness.repeat.set(Math.ceil(wallSize[1]/size[1]*2.0), Math.ceil(wallSize[0]/size[0]*2.0))
      image.repeat.set(Math.ceil(wallSize[1]/size[1]*2.0), Math.ceil(wallSize[0]/size[0]*2.0))

      return (
        
            <meshStandardMaterial 
            transparent={true} 
            attach={"material-"+index} 
            side={THREE.BackSide} 
            metalness={0.2} 
            bumpMap={bumpness} roughnessMap={roughness} map={image} />
        
      )
}

export default Tile
