import React, { useEffect, useState } from "react";
import ProductShort from "./ProductShort";
import Pagination from "@mui/material/Pagination";
import { Grid, Container } from "@mui/material";

const ProductShortList = ({
  products,
  total,
  pageSize,
  pageNum,
  setPageNum,
}) => {
  const totalPageNum = Math.ceil(total / pageSize);
  return (
    <div style={{ display: "block" }}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs>
          <Pagination
            count={totalPageNum}
            page={pageNum}
            onChange={(e, v) => setPageNum(v)}
            shape="rounded"
            size="large"
            color="secondary"
            showFirstButton
            showLastButton
          />
        </Grid>
        <Grid item xs={12}>
          {products.map((p) => (
            <ProductShort key={p.id} product={p} />
          ))}
        </Grid>
        <Grid item xs>
          <Pagination
            count={totalPageNum}
            page={pageNum}
            onChange={(e, v) => setPageNum(v)}
            shape="rounded"
            size="large"
            color="secondary"
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductShortList;
