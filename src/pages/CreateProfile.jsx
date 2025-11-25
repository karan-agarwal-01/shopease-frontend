import { useForm } from "react-hook-form";
import Layout from "../layout/Layout";
import Input from "../components/common/Input";
import { createProfile } from "../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Textarea from "../components/common/Textarea";

const CreateProfile = () => {

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await createProfile(data);
        if (res) {
            toast.success(res.message)
            navigate('/profile')
        }
    }

    return (
        <Layout title={"Create user profile"} disabled={isSubmitting} buttonText={"Create Profile"} onSubmit={handleSubmit(onSubmit)} >
            <Input type={"text"} label={"Full name"} name={"fullname"} register={register} validation={{required: "Fullname is required"}} errors={errors} />
            <Input type={"text"} label={"Phone no."} name={"phone"} register={register} validation={{required: "Phone number is required", pattern: { value:  /^[6-9]\d{9}$/, message: "Enter a valid 10-digit phone number" }}} errors={errors} />
            <Textarea label={"Address"} name={"address"} register={register} validation={{required: "Address is required"}} errors={errors}  />
        </Layout>
    );
}

export default CreateProfile;