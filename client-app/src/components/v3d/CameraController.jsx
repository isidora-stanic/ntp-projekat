import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
  
        controls.minDistance = 20;
        controls.maxDistance = 2000;
        controls.zoomSpeed = 2;
        controls.zoomO = 200;
        console.log('camera distance',controls.getDistance())
        controls.enableZoom = true;
        controls.enablePan = true;
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

  export default CameraController