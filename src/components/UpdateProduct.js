import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [update, setUpdate] = React.useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    },[])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setUpdate({name:result.name,price:result.price,category:result.category,company:result.company})
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify(update),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if(result){
            navigate('/')
        }
    }

    const handleOnChange = (e)=>{
        const {name,value} = e.target;
        setUpdate({...update,[name]:value});
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input className="inputBox" type="text" name="name" value={update.name} onChange={(e) => handleOnChange(e)} placeholder="Enter product name" />

            <input className="inputBox" type="text" name="price" value={update.price} onChange={(e) => handleOnChange(e)} placeholder="Enter product price" />

            <input className="inputBox" type="text" name="category" value={update.category} onChange={(e) => handleOnChange(e)} placeholder="Enter product category" />

            <input className="inputBox" type="text" name="company" value={update.company} onChange={(e) => handleOnChange(e)} placeholder="Enter product company" />

            <button onClick={updateProduct} className="appButton" type="button">Update Product</button>

        </div>
    )
}

export default UpdateProduct;