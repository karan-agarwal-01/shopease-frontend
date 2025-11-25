import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import Input from "../../components/common/Input";
import { loginuser } from "../../services/apis";
import { toast } from "react-hot-toast";

const Login = () => {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm();
    const navigate = useNavigate('');

    const onSubmit = async (data) => {
        const res = await loginuser(data);
        if (res) {
            toast.success(res.message)
            navigate('/')
        }
    };

    return (
        <Layout title={"Login to your account"} onSubmit={handleSubmit(onSubmit)} navigateTitle={"Register"} navigateRoute={"register"} disabled={isSubmitting} buttonText={"Login"}>
            <Input type={"email"} label={"Email"} name={"email"} register={register} validation={{required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }}} errors={errors} />
            <Input type={"password"} label={"Password"} name={"password"} register={register} validation={{required: "Password is required", minLength: { value: 8, message: "At least 8 characters"}}} errors={errors} />
        </Layout>
    );
}

export default Login;