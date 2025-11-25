import { useForm } from "react-hook-form";
import Layout from "../../layout/Layout";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import { useEffect, useState } from "react";
import { createProduct, fetchCategory, imageUpload } from "../../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm();
    const [uploadImage, setUploadImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);
            setImagePreview(URL.createObjectURL(file));
        }
        try {
            const form = new FormData();
            form.append("image", file)
            const res = await imageUpload(form); 
            if (res) {
                setUploadImage(res);
            }
        } catch (error) {
            toast.error("Image upload failed");
        } finally {
            setUploading(false)
        }
    };

    useEffect(() => {
        const getCategories = async () => {
          try {
            const res = await fetchCategory();
            if (res) {
              setCategories(res); 
            }
          } catch (error) {
            toast.error("Failed to load categories");
          } finally {
            setLoading(false)
          }
        };
        getCategories();
    }, [])

    const onSubmit = async (data) => {
        if (uploading) {
            toast.error("Image is still uploading. Please wait...");
            return;
        }
        if (!uploadImage) {
            toast.error("Please upload an image first.");
            return;
        }
        data.image = uploadImage
        const res = await createProduct(data)
        if (res) {
            toast.success(res.message)
            navigate('/admin/products')
        }
    }

    if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-400">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )
    }

    return (
        <Layout style={{backgroundColor: "#f3f4f6", marginTop: '-5rem'}} title={"Create Product"} buttonText={"Submit"} disabled={isSubmitting} onSubmit={handleSubmit(onSubmit)}>
            <Input type={"text"} name={"name"} register={register} label={"Product name"} validation={{required: "Product name is required"}} errors={errors} />
            <Textarea label={"Product description"} name={"description"} register={register} validation={{required: "Product description is required"}} errors={errors}  />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
                <select {...register("category", { required: "Category is required" })} className={`w-full border rounded-lg px-3 py-2 cursor-pointer outline-none ${errors.category ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500`}>
                    <option value="">Choose Category</option>
                    {
                        categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))
                    }
                </select>
                {errors.category && (<p className="text-red-500 text-sm mt-1">{errors.category.message}</p>)}
            </div>
            <Input type={"text"} name={"price"} register={register} label={"Product price"} validation={{required: "Product price is required", pattern: { value: /^[0-9]+$/, message: "Enter valid numbers" }}} errors={errors} />
            <Input type={"text"} name={"stock"} register={register} label={"Stock"} validation={{required: "Stock is required", pattern: { value: /^[0-9]+$/, message: "Enter valid numbers" }}} errors={errors} />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className={`w-full cursor-pointer border rounded-lg px-3 py-2 focus:ring-2 outline-none focus:ring-indigo-500 border-gray-300" }`} />
                {uploading && (
                    <p className="text-indigo-600 text-sm mt-2">Uploading image...</p>
                )}
                { imagePreview && (
                    <div className="mt-3">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default ProductForm;