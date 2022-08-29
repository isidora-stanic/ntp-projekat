import { Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import ImageService from "../../services/ImageService";

const ImageUpload = ({ id, images, setImages }) => {
  const maxNumber = 20;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const uploadToServer = (index, onImageRemove) => {
    console.log(images[index]);
    ImageService.postForProduct(id, images, index, setImages, onImageRemove);
  };
  return (
    <Container sx={{ marginY: 5 }}>
      <Paper sx={{ padding: 5, backgroundColor: "secondary.light" }}>
        <Typography variant="h4">Upload New Images</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 5 }}>
          If you upload image with same name, <b>old image will be overwritten</b>.<br/>
          If image name contains <b>'bump'</b> or <b>'diffuse'</b> or <b>'roughness'</b>, it will be used for <b>3D visualization</b>.<br/>
          If image name contains <b>'main'</b>, it will be used as <b>main image for product</b>. This should be a <b>square</b> image.
        </Typography>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg", "png", "webp"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <div>
                <Button
                  variant="contained"
                  type="button"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                  color="error"
                  onClick={onImageRemoveAll}
                  type="button"
                >
                  Remove all images
                </Button>
              </div>
              {imageList.map((image, index) => (
                <Paper
                  style={{
                    margin: 20,
                    padding: 5,
                    display: "inline-block",
                    border: "1px dashed black",
                    borderRadius: "5px",
                  }}
                  key={index}
                  className="image-item"
                >
                  <img src={image.data_url} alt="" width="100" />
                  <Typography>{image.file.name}</Typography>
                  <div
                    className="image-item__btn-wrapper"
                    style={{ margin: 5 }}
                  >
                    <Button
                      type="button"
                      variant="outlined"
                      color="error"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="contained"
                      sx={{ backgroundColor: "secondary.dark" }}
                      onClick={() => onImageUpdate(index)}
                    >
                      Change
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => uploadToServer(index, onImageRemove)}
                    >
                      Upload
                    </Button>
                  </div>
                </Paper>
              ))}
            </div>
          )}
        </ImageUploading>
      </Paper>
    </Container>
  );
};

export default ImageUpload;
