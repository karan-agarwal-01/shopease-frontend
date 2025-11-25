import { useForm } from "react-hook-form";
import Layout from "../../layout/Layout";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import { useState } from "react";
import { createCategory, imageUpload } from "../../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm();
    const [uploadImage, setUploadImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        setUploading(true)
        setImagePreview(URL.createObjectURL(file));
        try {
            const form = new FormData();
            form.append("image", file)
            const res = await imageUpload(form)
            setUploadImage(res);
        } catch (error) {
            toast.error("Image upload failed!");
        } finally {
            setUploading(false);
        }
    };

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
        const res = await createCategory(data)
        if (res) {
            toast.success(res.message)
            navigate('/admin/products')
        }
    }

    return (
        <Layout style={{backgroundColor: "#f3f4f6", marginTop: '-7rem'}} title={"Create Category"} buttonText={"Submit"} disabled={isSubmitting} onSubmit={handleSubmit(onSubmit)}>
            <Input type={"text"} name={"name"} register={register} label={"Category name"} validation={{required: "Category name is required"}} errors={errors} />
            <Textarea label={"Category description"} name={"description"} register={register} validation={{required: "Category description is required"}} errors={errors}  />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className={`w-full cursor-pointer border rounded-lg px-3 py-2 focus:ring-2 outline-none focus:ring-indigo-500 border-gray-300" }`} />
                {uploading && (
                    <p className="text-indigo-600 mt-2 text-sm">Uploading image...</p>
                )}
                {imagePreview && (
                    <div className="mt-3">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default CategoryForm;