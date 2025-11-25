import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/orders')
        }, 2500);

        return () => clearTimeout(timer) 
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
            <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Cancelled</h1>
            <p className="text-slate-600">Redirecting to your orders...</p>
        </div>
    );
}

export default PaymentCancel;