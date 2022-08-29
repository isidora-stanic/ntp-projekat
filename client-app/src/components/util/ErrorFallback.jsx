import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import * as THREE from "three"

function ErrorFallback({error, resetErrorBoundary}) {
    // const [texture] = useTexture(['http://localhost:9098/images/1/black_metro_1.jpg'])
    return (
        <meshBasicMaterial transparent 
            attach={"material"}
            side={THREE.BackSide} 
            color="gray"
            metalness={0.2}
            /> 
  )
}

export default ErrorFallback