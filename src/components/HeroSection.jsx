import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate();
    
    return (
        <section className="relative bg-linear-to-r from-indigo-600 to-purple-600 text-white py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">Discover The Latest <br /> Fashion & Trends</h1>
                    <p className="mt-4 text-lg opacity-90">Shop high-quality products at exclusive deals. Fast delivery, easy returns.</p>
                    <button onClick={() => navigate('/shop')} className="mt-6 cursor-pointer bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition">Shop Now</button>
                </div>
                <div className="flex justify-center">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Hero Product" className="rounded-xl shadow-xl w-full max-w-md" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection;