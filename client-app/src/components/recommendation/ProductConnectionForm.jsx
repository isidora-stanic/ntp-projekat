import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const ProductConnectionForm = ({ values, setValues, onChange, onSubmit }) => {
  let navigate = useNavigate();
  let { id } = useParams();
  let isAddMode = !id;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getAll(setProducts);
  }, []);

  return (
    <>
      <Grid item xs={6}>
        <TextField
          required
          select
          fullWidth
          name="value1"
          label="Product 1"
          id="value1"
          autoComplete="value1"
          color="primary"
          onChange={onChange}
          value={values.value1}
          disabled={!isAddMode}
        >
          {products.map((p) => (
            <MenuItem value={p.id + ""}>
              [{p.sku}] {p.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          select
          fullWidth
          name="value2"
          label="Product 2"
          id="value2"
          autoComplete="value2"
          color="primary"
          onChange={onChange}
          value={values.value2}
          disabled={!isAddMode}
        >
          {products.map((p) => (
            <MenuItem value={p.id + ""}>
              [{p.sku}] {p.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
};

export default ProductConnectionForm;
