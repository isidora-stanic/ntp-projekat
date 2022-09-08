import { Alert, Button, Link } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageService from "../../services/ImageService";
import ProductService from "../../services/ProductService";
import ProductShort from "../product/ProductShort";
import ProductSmallInfo from "../product/ProductSmallInfo";
import ImageUpload from "./ImageUpload";
import UploadedImages from "./UploadedImages";

const EditImages = () => {
  let { id } = useParams();
  const [uploaded, setUploaded] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [product, setProduct] = React.useState({});

  let navigate = useNavigate()

  useEffect(() => {
    ProductService.getOne(id, setProduct)
  }, []);

  useEffect(() => {
    if (product.id) {
        ImageService.getAllForProduct(id, setUploaded)
    }
  }, [product])

  useEffect(() => {
    if (product.id) {
        ImageService.getAllForProduct(id, setUploaded)
    }
  }, [images]);

  return (
    <div>
        <Button sx={{marginy: 5}} fullWidth variation='outlined' onClick={() => navigate(-1)}>Back</Button>
        {uploaded.length > 0 ? <>{uploaded.filter(i => i.includes("main")).length === 0 ? <Alert variant="filled" severity="error">Main image is missing. This image is displayed at home page.</Alert> : <></>}
        {uploaded.filter(i => i.includes("diffuse")).length === 0 ? <Alert variant="filled" severity="error">Diffuse image is missing. This image is used for 3D visualization.</Alert> : <></>}
        {uploaded.filter(i => i.includes("bump")).length === 0 ? <Alert variant="filled" severity="error">Bump image is missing. This image is used for 3D visualization.</Alert> : <></>}
        {uploaded.filter(i => i.includes("roughness")).length === 0 ? <Alert variant="filled" severity="error">Roughness image is missing. This image is used for 3D visualization.</Alert> : <></>}</> : <></>}
        
      <ProductSmallInfo product={product} />
      {product.id ? <><ImageUpload id={id} images={images} setImages={setImages} />
      <UploadedImages uploaded={uploaded} setUploaded={setUploaded} /></> : <></>}
    </div>
  );
};

export default EditImages;
