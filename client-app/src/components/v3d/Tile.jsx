import React from 'react'
import * as THREE from "three"
import {Plane} from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'

const Tile = ({index, wallSize, size, bumpUrl, roughUrl, imageUrl}) => {
    const [bumpness, roughness, image] = useLoader(THREE.TextureLoader, [bumpUrl, roughUrl, imageUrl])
    // let roughness = useLoader(THREE.TextureLoader, roughUrl)
    // let image = useLoader(THREE.TextureLoader, imageUrl)

    bumpness.wrapS = bumpness.wrapT = THREE.RepeatWrapping
    roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping
    image.wrapS = image.wrapT = THREE.RepeatWrapping

    bumpness.anisotropy = 0
    roughness.anisotropy = 0
    image.anisotropy = 0

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
}

export default Tile
