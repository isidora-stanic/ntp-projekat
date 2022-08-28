import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'

const Point = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += props.rotate))
  // Return the view, these are regular Threejs elements expressed in JSX
    console.log('point ', props)
  useEffect(() => {
    console.log('point ', props.position)
  }, [])
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <sphereBufferGeometry args={[20, 50, 50]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Point
