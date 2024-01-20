import React from "react";
import {useNavigate} from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = React.useState();
    const [price, setPrice] = React.useState();
    const [category, setCategory] = React.useState();
    const [company, setCompany] = React.useState();
    const [error,setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        if(result){
            navigate('/')
        }        
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" />
            { error && !name && <span className="invalid-input">Enter valid name</span>}
            <input className="inputBox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter product price" />
            { error && !price && <span className="invalid-input">Enter valid price</span>}
            <input className="inputBox" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter product category" />
            { error && !category && <span className="invalid-input">Enter valid category</span>}
            <input className="inputBox" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter product company" />
            { error && !company && <span className="invalid-input">Enter valid company</span>}

            <button onClick={addProduct} className="appButton" type="button">Add Product</button>

        </div>
    )
}

export default AddProduct;