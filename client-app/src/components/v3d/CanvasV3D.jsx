import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Wall from "./Wall";
import CameraController from "./CameraController";
import Floor from "./Floor";
import * as THREE from "three";
import Room from "./Room";
import Tile from "./Tile";
import Point from "./Point";
import V3DOptions from "./V3DOptions";
import { Grid } from "@mui/material";
import { useWishlist } from "../../contexts/WishListContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import RoomSetupInfo from "./RoomSetupInfo";

const CanvasV3D = () => {
  const [selectedFace, setSelectedFace] = useState({});

  let {id} = useParams();
  let isReadMode = !!id;
  console.log("id",id)
  console.log("read?",isReadMode)

  let { wishlist } = useWishlist();

  const [w1, setW1] = useState(wishlist[0])
  const [w2, setW2] = useState(wishlist[0])
  const [w3, setW3] = useState(wishlist[0])
  const [w4, setW4] = useState(wishlist[0])
  const [w5, setW5] = useState(wishlist[0])
  const [w6, setW6] = useState(wishlist[0])

  const [room, setRoom] = useState({walls: []})
  const [abc, setAbc] = useState({ a: 225, b: 265, c: 346 });

  useEffect(() => {
    if (isReadMode) {
      axios.get("http://localhost:9091/api/v3d/rooms/"+id)
        .then(r => {
          console.log(r.data)
          setRoom(r.data)
        }).catch(err => console.log(err))
    }
  }, [])

  useEffect(() => {
    console.log(room)
    if (room.a) {
      setAbc({a: room.a, b: room.b, c: room.c})
    }
    if (room.walls.length > 0) {
      setW1(room.walls[0])
      setW2(room.walls[1])
      setW3(room.walls[2])
      setW4(room.walls[3])
      setW5(room.walls[4])
      setW6(room.walls[5])
    }
  }, [room])


  
  const meshRef = useRef();


  const [sliced, setSliced] = useState([]);

  const [loaded, setLoaded] = useState(false);

  
  
  let optionsProps = {
    abc, setAbc, w1, w2, w3, w4, w5, w6, setW1, setW2, setW3, setW4, setW5, setW6
    }

  let walls = {
    w1, w2, w3, w4, w5, w6
  }

  // localStorage.setItem("enterior", JSON.stringify(walls))

  const [roomGeometry, setRoomGeometry] = useState({
    attributes: { position: { array: [0, 0, 0] } },
  });

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  useEffect(() => {
    setSliced(getVertices());
    setLoaded(true);
  }, []);

  function getVertices() {
    let vertices = [];
    vertices.push([abc.a / 2.0, abc.b / 2.0, abc.c / 2.0]);
    vertices.push([abc.a / 2.0, abc.b / 2.0, -abc.c / 2.0]);
    vertices.push([abc.a / 2.0, -abc.b / 2.0, abc.c / 2.0]);
    vertices.push([abc.a / 2.0, -abc.b / 2.0, -abc.c / 2.0]);
    vertices.push([-abc.a / 2.0, abc.b / 2.0, abc.c / 2.0]);
    vertices.push([-abc.a / 2.0, abc.b / 2.0, -abc.c / 2.0]);
    vertices.push([-abc.a / 2.0, -abc.b / 2.0, abc.c / 2.0]);
    vertices.push([-abc.a / 2.0, -abc.b / 2.0, -abc.c / 2.0]);
    return vertices;
  }

  console.log("wishlist len", wishlist.length)

  return (
    <Grid container sx={{ width: "100vw", height: "100vh" }}>
      <Grid item xs={9}>
        <Canvas flat style={{ background: "#7986cb" }}>
          <CameraController />
          <ambientLight intensity={0.2} />
          <spotLight position={[0, abc/2, 0]} angle={0.15} penumbra={1} />
          <pointLight position={[0, abc.b/2, 0]} />
          {wishlist.length > 0 || isReadMode ? <Room
            meshRef={meshRef}
            selectedFace={selectedFace}
            setSelectedFace={setSelectedFace}
            {...abc}
            urls={["", ""]}
            walls={walls}
          />: <group>
            <mesh ref={meshRef} onClick={(e) => setSelectedFace(e.face)}>
              <boxBufferGeometry attach="geometry" args={[abc.a, abc.b, abc.c]} />
              <meshBasicMaterial key={'plafon'} attach="material" color="darkgray" transparent={true}
                side={THREE.BackSide}/>
            </mesh>
              </group>}
          {/* <Suspense fallback={null}> */}
            {/* {loaded ? sliced.map(p => 
                (<Point key={"p"+p[0]+p[1]+p[2]} position={p} rotate={0}/>)
            ) : <></>} */}
          {/* </Suspense> */}
          {/* <Point position={[125,100,90]} rotate={0}/> */}
          {/* <primitive object={new THREE.AxesHelper(2000)} /> */}
          {/* <pointLight intensity={2} position={[7, 5, 1]} /> */}
        </Canvas>
      </Grid>
      {isReadMode ? 
      <Grid item xs={3}>
        <RoomSetupInfo room={room} />
      </Grid>
      :
      <Grid item xs={3}>
        <V3DOptions {...optionsProps} />
      </Grid>}
    </Grid>
  );
};

export default CanvasV3D;
