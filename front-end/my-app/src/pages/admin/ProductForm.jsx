import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createProduct} from "../../services/ProductService";
import {getSkinTypeList} from "../../services/SkinTypeService.js";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddProductForm = () => {
    const [skinTypes, setSkinTypes] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        ingredients: "",
        skinType: "",
        stock: "",
        image: null
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchSkinTypes = async () => {
            try {
                const res = await getSkinTypeList();
                setSkinTypes(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSkinTypes();
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const handleFileChange = (e) => {
        setProduct({...product, image: e.target.files[0]});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(product).forEach(key => {
            if (key === "ingredients") {
                formData.append(key, product[key].split(","));
            } else {
                formData.append(key, product[key]);
            }
        });

        try {
            await createProduct(formData);
            toast.success("Product created successfully.");
            navigate("/admin/products");
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Product</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <input type="text" name="name" value={product.name} onChange={handleChange}
                           placeholder="Product Name" className="form-control" required/>
                </div>
                <div className="col-md-6">
                    <select name="category" value={product.category} onChange={handleChange} className="form-control"
                            required>
                        <option value="">Select Category</option>
                        <option value="toner">Toner</option>
                        <option value="cleanser">Cleanser</option>
                        <option value="moisturizer">Moisturizer</option>
                        <option value="sunscreen">Sunscreen</option>
                        <option value="serum">Serum</option>
                    </select>
                </div>
                <div className="col-12">
                    <textarea name="description" value={product.description} onChange={handleChange}
                              placeholder="Description" className="form-control" required></textarea>
                </div>
                <div className="col-md-6">
                    <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price"
                           className="form-control" required/>
                </div>
                <div className="col-md-6">
                    <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock"
                           className="form-control" required/>
                </div>
                <div className="col-md-6">
                    <select name="skinType" value={product.skinType} onChange={handleChange} className="form-control"
                                required>
                        <option value="">Select Skin Type</option>
                        {skinTypes.map((skin) => (
                            <option key={skin._id} value={skin._id}>
                                {skin.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <input type="text" name="ingredients" value={product.ingredients} onChange={handleChange}
                           placeholder="Ingredients (comma separated)" className="form-control"/>
                </div>
                <div className="col-12">
                    <input type="file" name="image" onChange={handleFileChange} className="form-control"/>
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary"
                            disabled={!product.name || !product.price || !product.category || !product.stock}>Add
                        Product
                    </button>
                </div>
            </form>
        </div>
    );
};