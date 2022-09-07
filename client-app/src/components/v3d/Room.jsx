import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import Tile from './Tile';
import Point from './Point';
import { height } from '@mui/system';
import Grout from './Grout';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../util/ErrorFallback';

const Room = ({a, b, c, selectedFace, setSelectedFace, meshRef, walls, setRoomSetup}) => {
    const [texture] = useLoader(THREE.TextureLoader, ['https://media.istockphoto.com/photos/white-colored-low-contrast-concrete-textured-background-with-and-picture-id1193725656?k=20&m=1193725656&s=612x612&w=0&h=mROTQNi4boogY728Z6oyv-Ew4f3Pd-tJOgc6axm4JmE=']);

        useEffect(() => {
            console.log(selectedFace)
            console.log('selektovan zid', selectedFace.materialIndex)
            // console.log('Mesh dots',meshRef.current.geometry.attributes.position.array)           
        }, [selectedFace])

        useEffect(() => {
            // console.log(JSON.stringify(walls))
        }, [walls])

        // function genPositions(wallSize, fugnaSize, startPos, rotation, size, urls) {
        //     let tiles = []
        //     let maxXRepeat = Math.ceil(wallSize[0]/size[0])
        //     let maxYRepeat = Math.ceil(wallSize[1]/size[1])
        //     console.log(maxXRepeat, [...Array(maxYRepeat)])
        //     let count = 0
        //     for (let y in [...Array(maxYRepeat)]) {
        //         for (let x in [...Array(maxXRepeat)]) {
        //             let tile = {
        //                 indexx: count,
        //                 position: [startPos[0] + x*size[0] + fugnaSize, 0, startPos[1] + y*size[1] + fugnaSize],
        //                 rotation: rotation,
        //                 size: size,
        //                 bumpUrl: urls[0],
        //                 roughUrl: urls[1],
        //                 imageUrl: urls[2],
        //                 wallSize: wallSize
        //             }
        //             tiles.push(tile)
        //             count++;
        //         }
        //     }
        //     return tiles
        // }
        // let tilesMap = genPositions(
        //     [a, b], 3, [0, 0, 0], 
        //     [-Math.PI/2,0,0], [10,20], 
        //     ['http://localhost:9090/images/black_metro_bump.jpg',
        //     'http://localhost:9090/images/black_metro_roughness.jpg',
        //     'http://localhost:9090/images/black_metro_diffuse.jpg'])
    
        // console.log("URL0: " , walls.w1.bump)
        // let dim1arr = walls.w1.tileSize1, 
        // console.log("Dim11",parseInt(dim1arr[0]))
        // console.log("Dim12",parseInt(dim1arr[1]))
        // let dim2arr = walls.w2.dimensions.split("x")
        // console.log("Dim21",parseInt(dim2arr[0]))
        // console.log("Dim22",parseInt(dim2arr[1]))
        // let dim3arr = walls.w3.dimensions.split("x")
        // let dim4arr = walls.w4.dimensions.split("x")
        // let dim5arr = walls.w5.dimensions.split("x")
        // let dim6arr = walls.w6.dimensions.split("x")


        let w1Tile={
            size:[walls.w1.size1, walls.w1.size2],
            bumpUrl: walls.w1.bump,
            roughUrl: walls.w1.roughness,
            imageUrl: walls.w1.image,
            wallSize:[b,c]
        }
        let w2Tile={
            size:[walls.w2.size1, walls.w2.size2],
            bumpUrl: walls.w2.bump,
            roughUrl: walls.w2.roughness,
            imageUrl: walls.w2.image,
            wallSize:[b,c]
        }
        let w3Tile={
            size:[walls.w3.size1, walls.w3.size2],
            bumpUrl: walls.w3.bump,
            roughUrl: walls.w3.roughness,
            imageUrl: walls.w3.image,
            wallSize:[c,a]
        }
        let w4Tile={
            size:[walls.w4.size1, walls.w4.size2],
            bumpUrl: walls.w4.bump,
            roughUrl: walls.w4.roughness,
            imageUrl: walls.w4.image,
            wallSize:[c,a]
        }
        let w5Tile={
            size:[walls.w5.size1, walls.w5.size2],
            bumpUrl: walls.w5.bump,
            roughUrl: walls.w5.roughness,
            imageUrl: walls.w5.image,
            wallSize:[b,a]
        }
        let w6Tile={
            size:[walls.w6.size1, walls.w6.size2],
            bumpUrl: walls.w6.bump,
            roughUrl: walls.w6.roughness,
            imageUrl: walls.w6.image,
            wallSize:[b,a]
        }


        // let oneGrout={
        //     size:[20,10],
        //     bumpUrl:'http://localhost:9090/images/fugne_metro_bump.png',
        //     roughUrl:"http://localhost:9090/images/fugne_metro_roughness.png",
        //     imageUrl:"http://localhost:9090/images/fugne_metro_diffuse.png",
        //     wallSize:[a,b]
        // }
      
      return (
        <group>
        <mesh ref={meshRef} onClick={(e) => setSelectedFace(e.face)}>
          <boxBufferGeometry attach="geometry" args={[a, b, c]} />
            {/* <meshStandardMaterial key={'plafon'} map={texture} bumpMap={texture} roughnessMap={texture} attach="material-2" metalness={0} color="white" transparent={true}
                side={THREE.BackSide}/> */}
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

                <Tile {...w1Tile} index='0'/> {/* right ok */}
                {/* <Tile {...w3Tile} index='2'/> CEILING */}
                <Tile {...w2Tile} index='1'/> {/* left ok */}
                <Tile {...w4Tile} index='3'/> {/*floor ok*/}
                <Tile {...w5Tile} index='4'/>
                <Tile {...w6Tile} index='5'/>
        
        
        </mesh>
        
        </group>
      );
}

export default Room
