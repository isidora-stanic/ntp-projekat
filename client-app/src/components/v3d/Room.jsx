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
import { useParams } from 'react-router-dom';
// import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

const Room = ({a, b, c, selectedFace, setSelectedFace, meshRef, walls, setRoomSetup}) => {
    // const [texture] = useLoader(THREE.TextureLoader, ['https://media.istockphoto.com/photos/white-colored-low-contrast-concrete-textured-background-with-and-picture-id1193725656?k=20&m=1193725656&s=612x612&w=0&h=mROTQNi4boogY728Z6oyv-Ew4f3Pd-tJOgc6axm4JmE=']);

        useEffect(() => {
            console.log(selectedFace)
            console.log('selektovan zid', selectedFace.materialIndex)
        }, [selectedFace])

        let {id} = useParams()
        let isAddMode = !id

        useEffect(() => {
            // console.log(JSON.stringify(walls))
        }, [walls])

        // const exporter = new GLTFExporter()
        // const options = {
        //     trs: params.trs,
        //     onlyVisible: params.onlyVisible,
        //     truncateDrawRange: params.truncateDrawRange,
        //     binary: params.binary,
        //     maxTextureSize: params.maxTextureSize
        // };

        // useEffect(() => {
        //     exporter.parse(meshRef.current, function (gltf) {
        //         downloadJSON(gltf)
        //     }, options)
        // })

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
    

        let sw1 = []
        let sw2 = []
        let sw3 = []
        let sw4 = []
        let sw5 = []
        let sw6 = []

        if (isAddMode) {
            sw1 = [walls.w1.size1, walls.w1.size2]
            sw2 = [walls.w2.size1, walls.w2.size2]
            sw3 = [walls.w3.size1, walls.w3.size2]
            sw4 = [walls.w4.size1, walls.w4.size2]
            sw5 = [walls.w5.size1, walls.w5.size2]
            sw6 = [walls.w6.size1, walls.w6.size2]
        } else {
            sw1 = [walls[0].size1, walls[0].size2]
            sw2 = [walls[1].size1, walls[1].size2]
            sw3 = [walls[2].size1, walls[2].size2]
            sw4 = [walls[3].size1, walls[3].size2]
            sw5 = [walls[4].size1, walls[4].size2]
            sw6 = [walls[5].size1, walls[5].size2]
        }

        let w1Tile={
            size: sw1,
            bumpUrl: walls.w1.bump,
            roughUrl: walls.w1.roughness,
            imageUrl: walls.w1.image,
            wallSize:[b,c]
        }
        let w2Tile={
            size: sw2,
            bumpUrl: walls.w2.bump,
            roughUrl: walls.w2.roughness,
            imageUrl: walls.w2.image,
            wallSize:[b,c]
        }
        let w3Tile={
            size: sw3,
            bumpUrl: walls.w3.bump,
            roughUrl: walls.w3.roughness,
            imageUrl: walls.w3.image,
            wallSize:[c,a]
        }
        let w4Tile={
            size: sw4,
            bumpUrl: walls.w4.bump,
            roughUrl: walls.w4.roughness,
            imageUrl: walls.w4.image,
            wallSize:[c,a]
        }
        let w5Tile={
            size: sw5,
            bumpUrl: walls.w5.bump,
            roughUrl: walls.w5.roughness,
            imageUrl: walls.w5.image,
            wallSize:[b,a]
        }
        let w6Tile={
            size: sw6,
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
