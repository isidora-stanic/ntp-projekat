import React from 'react'
import * as THREE from "three"
import {Plane, useTexture} from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../util/ErrorFallback'

const Tile = ({index, wallSize, size, bumpUrl, roughUrl, imageUrl}) => {
    // try {
      const [bumpness, roughness, image] = useTexture([bumpUrl, roughUrl, imageUrl])

      bumpness.wrapS = bumpness.wrapT = THREE.RepeatWrapping
      roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping
      image.wrapS = image.wrapT = THREE.RepeatWrapping

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
      console.log(times)
      console.log(wallSize[0]*1.0, '/', size[0], '=', wallSize[0]*1.0/size[0])
      console.log(wallSize[1]*1.0, '/', size[1], '=', wallSize[1]*1.0/size[1])

      bumpness.repeat.set(Math.ceil(wallSize[0]*1.0/size[0]), Math.ceil(wallSize[1]*1.0/size[1]))
      roughness.repeat.set(Math.ceil(wallSize[0]*1.0/size[0]), Math.ceil(wallSize[1]*1.0/size[1]))
      image.repeat.set(Math.ceil(wallSize[0]*1.0/size[0]), Math.ceil(wallSize[1]*1.0/size[1]))

      return (
        
            <meshStandardMaterial transparent={true} attach={"material-"+index} side={THREE.BackSide} metalness={0.2} bumpMap={bumpness} roughnessMap={roughness} map={image} />
        
      )

    // } catch {

    //   return (<meshBasicMaterial transparent attach={"material-"+index} side={THREE.BackSide} color="black"
    //   opacity={0.5} />)

    // }
    // let roughness = useLoader(THREE.TextureLoader, roughUrl)
    // let image = useLoader(THREE.TextureLoader, imageUrl)

    
}

export default Tile
