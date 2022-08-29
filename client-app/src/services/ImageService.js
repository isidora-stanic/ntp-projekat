import axios from "axios";


const ImageService = {
    getAllForProduct : (id, setValues) => {
        axios.get("http://localhost:9098/images/" + id)
            .then((r) => {
                setValues(r.data)
            })
      .catch((e) => console.log(e))
    },

    getNormal : (id, setValues) => {
        axios.get("http://localhost:9098/images/" + id + "/normal")
            .then((r) => {
                setValues(r.data)
            })
      .catch((e) => console.log(e))
    },

    getMaps : (id, setValues) => {
        axios.get("http://localhost:9098/images/" + id + "/maps")
            .then((r) => {
                setValues(r.data)
            })
      .catch((e) => console.log(e))
    },

    getMain : (id, setValue) => {
        axios.get("http://localhost:9098/images/" + id + "/main")
            .then((r) => {
                setValue(r.data)
            })
      .catch((e) => console.log(e))
    },

    postForProduct : (id, images, index, setImages, onImageRemove) => {
        console.log("http://localhost:9098/images/"+id+"/"+images[index].file.name)
        axios.post("http://localhost:9098/images/"+id+"/"+images[index].file.name, images[index].file)
        .then(r => {
            console.log(r)
            console.log(images.filter((_, i) => i !== index))
            setImages(images.filter((_, i) => i !== index))
            console.log(index)
            onImageRemove(index)
        }).catch(e => console.log(e))
    },

    delete : (src, uploaded, setUploaded) => {
        axios.delete(src)
            .then(r => {
                console.log(r)
                setUploaded(uploaded.filter(u => u !== src))
            })
            .catch(e => console.log(e))
    }
}

export default ImageService