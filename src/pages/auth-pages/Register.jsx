import { useForm } from "react-hook-form";
import Layout from "../../layout/Layout";
import Input from "../../components/common/Input";
import { registeruser } from "../../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const { register, handleSubmit, watch, formState: {errors, isSubmitting} } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await registeruser(data)
        if (res) {
            toast.success(res.message)
            navigate('/login')
        }
    };

    return (
        <Layout title={"Register to your account"} onSubmit={handleSubmit(onSubmit)} navigateTitle={"Login"} navigateRoute={"login"} disabled={isSubmitting} buttonText={"Register"}>
            <Input type={"email"} label={"Email"} name={"email"} register={register} validation={{required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }}} errors={errors} />
            <Input type={"password"} label={"Password"} name={"password"} register={register} validation={{required: "Password is required", minLength: { value: 8, message: "At least 8 characters"}}} errors={errors} />
            <Input type={"password"} label={"Confirm Password"} name={"cpassword"} register={register} validation={{required: "Confirm password is required", minLength: { value: 8, message: "At least 8 characters"}, validate: (value) => value === watch("password") || "Password do not match"}} errors={errors} />
        </Layout>
    );
}

export default Register;