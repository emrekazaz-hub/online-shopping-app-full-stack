import React, { useEffect, useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import './AdminPage.css';

const AdminPage = () => {

    const { signedUser, addProduct, products, getProducts, getPurchasedProductList, purchasedProducts, addToPurchasedProductList } = useCart();

    const [subCategories, setSubCategories] = useState([]);

    const [selectedSubCategory, setSelectedSubCategory] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProducPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productDescription, setProducDescription] = useState('');
    const [productImage, setProductImage] = useState();

    const handleAddProductToDb = (e) => {
        e.preventDefault();
        addProduct(productName, productDescription, productPrice, productQuantity, selectedCategory, selectedSubCategory, productImage);
        //        console.log(productName, productDescription, productPrice, productQuantity, selectedCategory, selectedSubCategory);
    }

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        switch (category) {
            case 'Electronic':
                setSubCategories(['Phones & Accessories', 'Computers & Tablets', 'Headphones & Speakers']);
                break;
            case 'Clothes':
                setSubCategories(['T-shirt', 'Pants', 'Dresses', 'Jackets']);
                break;
            case 'Shoe':
                setSubCategories(['Sneakers', 'Boots', 'Sandals', 'Flats']);
                break;
            default:
                setSubCategories([]);
                break;
        }
    };

    useEffect(() => {
        getProducts();
    }, [addProduct])

    useEffect(() => {
        getPurchasedProductList();
    }, [])

    const buttonCartCurt = () => {
        purchasedProducts.map((product) => {
            return (
                console.log(product.user_name)
            );
        })
    }

    return (
        <div className="admin-main-div">
            <div>
                <div className="admin-add-product-form card card-form">
                    <h2>Section for add product</h2>
                    <div className="label-group">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input className="product-name form-control" placeholder="Enter the product name" type="text" onChange={(e) => setProductName(e.target.value)}></input>
                    </div>

                    <div className="label-group">
                        <label htmlFor="inputDescription" className="form-label">Description</label>
                        <input className="product-description form-control" placeholder="Enter the product description" type="text" onChange={(e) => setProducDescription(e.target.value)}></input>
                    </div>

                    <div className="label-group">
                        <label htmlFor="inputPrice" className="form-label">Price</label>
                        <input className="product-price form-control" placeholder="Enter the product price" type="number" onChange={(e) => setProducPrice(e.target.value)}></input>
                    </div>

                    <div className="label-group">
                        <label htmlFor="inputQuantity" className="form-label">Stock for product</label>
                        <input className="product-price form-control" placeholder="Enter stock for product" type="number" onChange={(e) => setProductQuantity(e.target.value)}></input>
                    </div>

                    <div className="label-group">
                        <label htmlFor="inputImage" className="form-label">For now we are getting the url of imgage please don't select any image</label>
                        <input className="product-image-input" type="text" placeholder="Enter The Image URL" onChange={(e) => setProductImage(e.target.value)}></input>
                    </div>

                    <div className="label-group">
                        <label htmlFor="inputImage" className="form-label">Add product Image</label>
                        <input className="product-image-input" type="file" accept="image/*" onChange={(e) => setProductImage(e.target.files)}></input>
                    </div>

                    <div style={{ maxWidth: "750px" }} className="label-group">
                        <label htmlFor="inputCategory" className="form-label">Category</label>
                        <select id="inputState" className="form-select form-select-lg" onChange={handleCategoryChange}>
                            <option value="" disabled selected>Select Category For Product</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Shoe">Shoe</option>
                        </select>
                    </div>

                    {subCategories.length > 0 && (
                        <div className="label-group" style={{ maxWidth: "750px" }}>
                            <label htmlFor="inputCity" className="form-label">Sub Category</label>
                            <select id="inputState" className="form-select form-select-lg" onInput={(e) => setSelectedSubCategory(e.target.value)}>
                                <option disabled selected>please select sub category</option>
                                {subCategories.map((subcategory, index) => (
                                    <option key={index}>{subcategory}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <div className="from-button-div">
                            <button className="btn btn-success" onClick={handleAddProductToDb}>add product</button>
                        </div>
                    </div>
                </div>

            </div>

            <div >
                <h2 style={{ paddingTop: "15rem", paddingBottom: "2rem" }}>you sell these products</h2>
                <div>
                    <div className="admin-products">
                        {products.map((product, index) => (
                            <div key={index} class="card card-form label-group" style={{ width: '18rem' }}>
                                <img src={`${product.image_url}`} class="card-img-top" alt={product.productname} style={{ maxWidth: "250px", maxHeight: "150px" }} />
                                <div class="card-body">
                                    <h5 class="card-title">{product.productname}</h5>
                                    <p class="card-text">{product.description}</p>
                                    <p class="card-text">Category: {product.category_name}</p>
                                    <div className="product-button-div">
                                        <button className="btn btn-secondary">edit</button>
                                        <button className="btn btn-danger">delete</button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div>
                <h2 style={{ paddingTop: "15rem", paddingBottom: "2rem" }}>Products purchased by users</h2>
                <div className="purchased-table">
                    <div className="admin-users-table-div">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email Address</th>
                                    <th scope="col">Purchased Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Purchased Date</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchasedProducts.map((product, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{product.user_name}</td>
                                        <td>{product.user_email}</td>
                                        <td>{product.product_name}</td>
                                        <td>{product.product_price}</td>
                                        <td>{product.product_quantity}</td>
                                        <td>{product.category_name}</td>
                                        <td>{product.purchased_date}</td>
                                        <td>
                                            <button className="btn btn-secondary">edit</button>
                                            <button className="btn btn-danger">delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;