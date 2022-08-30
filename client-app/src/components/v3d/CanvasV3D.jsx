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

const CanvasV3D = () => {
  const [selectedFace, setSelectedFace] = useState({});

  const meshRef = useRef();

  const [abc, setAbc] = useState({ a: 225, b: 265, c: 346 });

  const [sliced, setSliced] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const [w1, setW1] = useState({name: ''})
  const [w2, setW2] = useState({name: ''})
  const [w3, setW3] = useState({name: ''})
  const [w4, setW4] = useState({name: ''})
  const [w5, setW5] = useState({name: ''})
  const [w6, setW6] = useState({name: ''})

  let optionsProps = {
    abc, setAbc, w1, w2, w3, w4, w5, w6, setW1, setW2, setW3, setW4, setW5, setW6
    }

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

  return (
    <Grid container sx={{ width: "100vw", height: "85vh" }}>
      <Grid item xs={9}>
        <Canvas flat style={{ background: "hotpink" }}>
          <CameraController />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          {/* <Wall position={[abc.a/2, abc.b/2, abc.c/2]} hight={abc.b} width={abc.a} rotate={Math.PI/4} /> */}
          {/* <Wall position={[b/2, 0, 0]} hight={c} width={b} rotate={-Math.PI/4} /> */}
          {/* <Floor position={[0, -1/2, Math.PI/8]} hight={a} width={b} rotatey={0} rotatex={-Math.PI/2} rotatez={Math.PI/4} /> */}
          <Room
            meshRef={meshRef}
            selectedFace={selectedFace}
            setSelectedFace={setSelectedFace}
            {...abc}
            urls={["", ""]}
          />
          <Suspense fallback={null}>
            {/* {loaded ? sliced.map(p => 
                (<Point key={"p"+p[0]+p[1]+p[2]} position={p} rotate={0}/>)
            ) : <></>} */}
          </Suspense>
          {/* <Point position={[125,100,90]} rotate={0}/> */}
          <primitive object={new THREE.AxesHelper(2000)} />
          <pointLight intensity={2} position={[7, 5, 1]} />
        </Canvas>
      </Grid>
      <Grid item xs={3}>
        <V3DOptions {...optionsProps} />
      </Grid>
    </Grid>
  );
};

export default CanvasV3D;
