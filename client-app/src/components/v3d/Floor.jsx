import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Floor = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.y += props.rotate))
  // Return the view, these are regular Threejs elements expressed in JSX
  useEffect(() => {
    ref.current.rotation.x = props.rotatex
    ref.current.rotation.y = props.rotatey
    ref.current.rotation.z = props.rotatez
  }, [])
  return (
    <mesh
      {...props}
      ref={ref}
    //   scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <planeGeometry args={[props.width, props.height]} />
      <planeBufferGeometry attach="geometry" args={[props.width, props.height]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Floor
