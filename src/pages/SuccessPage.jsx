import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/')
        }, 2500);

        return () => clearTimeout(timer) 
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
            <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
            <p className="text-slate-600">Your Order is Confirmed. Redirecting to home page...</p>
        </div>
    );
}

export default PaymentSuccess;