import React from "react";

const NewRoom = ({ urls, a, b, c, selectedFace, setSelectedFace, meshRef }) => {
  // const [texture1, texture2] = useLoader(THREE.TextureLoader, [...urls]);

  useEffect(() => {
    console.log(selectedFace);
    console.log("selektovan zid", selectedFace.materialIndex);
    // console.log('Mesh dots',meshRef.current.geometry.attributes.position.array)
  }, [selectedFace]);

//   function genPositions(wallSize, fugnaSize, startPos, rotation, size, urls) {
//     let tiles = [];
//     let maxXRepeat = Math.ceil(wallSize[0] / size[0]);
//     let maxYRepeat = Math.ceil(wallSize[1] / size[1]);
//     console.log(maxXRepeat, [...Array(maxYRepeat)]);
//     let count = 0;
//     for (let y in [...Array(maxYRepeat)]) {
//       for (let x in [...Array(maxXRepeat)]) {
//         let tile = {
//           indexx: count,
//           position: [
//             startPos[0] + x * size[0] + fugnaSize,
//             0,
//             startPos[1] + y * size[1] + fugnaSize,
//           ],
//           rotation: rotation,
//           size: size,
//           bumpUrl: urls[0],
//           roughUrl: urls[1],
//           imageUrl: urls[2],
//           wallSize: wallSize,
//         };
//         tiles.push(tile);
//         count++;
//       }
//     }
//     return tiles;
//   }
  // let tilesMap = genPositions(
  //     [a, b], 3, [0, 0, 0],
  //     [-Math.PI/2,0,0], [10,20],
  //     ['http://localhost:9090/images/black_metro_bump.jpg',
  //     'http://localhost:9090/images/black_metro_roughness.jpg',
  //     'http://localhost:9090/images/black_metro_diffuse.jpg'])

//   let oneTile = {
//     size: [50, 60],
//     bumpUrl: "http://localhost:9098/images/1/black_metro_bump.png",
//     roughUrl: "http://localhost:9098/images/1/black_metro_roughness.png",
//     imageUrl: "http://localhost:9098/images/1/black_metro_diffuse.png",
//     wallSize: [a, b],
//   };
//   let otherTile = {
//     size: [60, 50],
//     bumpUrl: "http://localhost:9098/images/1/black_metro_bump.png",
//     roughUrl: "http://localhost:9098/images/1/black_metro_roughness.png",
//     imageUrl: "http://localhost:9098/images/2/chocolate_metro_diffuse.jpg",
//     wallSize: [a, b],
//   };

//   let oneGrout = {
//     size: [20, 10],
//     bumpUrl: "http://localhost:9090/images/fugne_metro_bump.png",
//     roughUrl: "http://localhost:9090/images/fugne_metro_roughness.png",
//     imageUrl: "http://localhost:9090/images/fugne_metro_diffuse.png",
//     wallSize: [a, b],
//   };

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

  return (
    <group>
      <mesh ref={meshRef} onClick={(e) => setSelectedFace(e.face)}>
        <boxBufferGeometry attach="geometry" args={[a, b, c]} />
        <meshBasicMaterial
          key={"plafon"}
          attach="material-2"
          color="white"
          transparent={true}
          side={THREE.BackSide}
        />
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

        {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
          {/* <Tile {...oneTile} index="0" />
          <Tile {...oneTile} index="1" />
          <Tile {...otherTile} index="3" />
          <Tile {...otherTile} index="4" />
          <Tile {...otherTile} index="5" /> */}
        {/* </ErrorBoundary> */}

        <Tile {...w1Tile} index='0'/> {/* right ok */}
    {/* <Tile {...w3Tile} index='2'/> CEILING */}
        <Tile {...w2Tile} index='1'/> {/* left ok */}
        <Tile {...w4Tile} index='3'/> {/*floor ok*/}
        <Tile {...w5Tile} index='4'/>
        <Tile {...w6Tile} index='5'/>
      </mesh>
    </group>
  );
};

export default NewRoom;
