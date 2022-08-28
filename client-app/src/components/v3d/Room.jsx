import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import Tile from './Tile';
import Point from './Point';
import { height } from '@mui/system';
import Grout from './Grout';

const Room = ({urls, a, b, c, selectedFace, setSelectedFace, meshRef}) => {
    const [texture1, texture2] = useLoader(THREE.TextureLoader, [...urls]);

        useEffect(() => {
            console.log(selectedFace)
            console.log('Zid',selectedFace.materialIndex)
            // console.log('Mesh dots',meshRef.current.geometry.attributes.position.array)           
        }, [selectedFace])

        function genPositions(wallSize, fugnaSize, startPos, rotation, size, urls) {
            let tiles = []
            let maxXRepeat = Math.ceil(wallSize[0]/size[0])
            let maxYRepeat = Math.ceil(wallSize[1]/size[1])
            console.log(maxXRepeat, [...Array(maxYRepeat)])
            let count = 0
            for (let y in [...Array(maxYRepeat)]) {
                for (let x in [...Array(maxXRepeat)]) {
                    let tile = {
                        indexx: count,
                        position: [startPos[0] + x*size[0] + fugnaSize, 0, startPos[1] + y*size[1] + fugnaSize],
                        rotation: rotation,
                        size: size,
                        bumpUrl: urls[0],
                        roughUrl: urls[1],
                        imageUrl: urls[2],
                        wallSize: wallSize
                    }
                    tiles.push(tile)
                    count++;
                }
            }
            return tiles
        }
        // let tilesMap = genPositions(
        //     [a, b], 3, [0, 0, 0], 
        //     [-Math.PI/2,0,0], [10,20], 
        //     ['http://localhost:9090/images/black_metro_bump.jpg',
        //     'http://localhost:9090/images/black_metro_roughness.jpg',
        //     'http://localhost:9090/images/black_metro_diffuse.jpg'])
    

        let oneTile={
            size:[20,10],
            bumpUrl:'http://localhost:9090/images/black_metro_bump.png',
            roughUrl:"http://localhost:9090/images/black_metro_roughness.png",
            imageUrl:"http://localhost:9090/images/black_metro_diffuse.png",
            wallSize:[a,b]
        }
        let otherTile={
            size:[20,10],
            bumpUrl:'http://localhost:9090/images/chocolate_metro_bump.jpg',
            roughUrl:"http://localhost:9090/images/chocolate_metro_roughness.jpg",
            imageUrl:"http://localhost:9090/images/chocolate_metro_diffuse.jpg",
            wallSize:[a,b]
        }

        let oneGrout={
            size:[20,10],
            bumpUrl:'http://localhost:9090/images/fugne_metro_bump.png',
            roughUrl:"http://localhost:9090/images/fugne_metro_roughness.png",
            imageUrl:"http://localhost:9090/images/fugne_metro_diffuse.png",
            wallSize:[a,b]
        }
      
      return (
        <group>
        <mesh ref={meshRef} onClick={(e) => setSelectedFace(e.face)}>
          <boxBufferGeometry attach="geometry" args={[a, b, c]} />
            <meshBasicMaterial key={'plafon'} attach="material-2" color="white" transparent={true}
                side={THREE.BackSide}/>
          {/* <meshStandardMaterial
                attach="material-1"
                map={texture1}
                transparent={true}
                side={THREE.BackSide}
            />
            <meshStandardMaterial
                attach="material-0"
                map={texture2}
                transparent={true}
                side={THREE.BackSide}
            />
            <meshStandardMaterial
                attach="material-3"
                map={texture1}
                transparent={true}
                side={THREE.BackSide}
            />
            <meshStandardMaterial
                attach="material-4"
                map={texture2}
                transparent={true}
                side={THREE.BackSide}
            />
            <meshStandardMaterial
                attach="material-5"
                map={texture1}
                transparent={true}
                side={THREE.BackSide}
            /> */}
            
            {/* 2 je plafon */}
            

            {/* <Grout {...oneGrout} index='0' color='blue' />
            <Grout {...oneGrout} index='1' color='blue' />
            <Grout {...oneGrout} index='3' color='blue' />
            <Grout {...oneGrout} index='4' color='blue' />
            <Grout {...oneGrout} index='5' color='blue' /> */}

            <Tile {...oneTile} index='0'/>
            <Tile {...otherTile} index='1'/>
            <Tile {...oneTile} index='3'/>
            <Tile {...oneTile} index='4'/>
            <Tile {...oneTile} index='5'/>
        
        
        </mesh>
        
        </group>
      );
}

export default Room
