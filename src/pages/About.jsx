const  AboutPage = () =>  {
    return (
        <div className="max-w-6xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">About ShopEase</h1>
            <p className="text-gray-600 leading-7">
                ShopEase is your trusted online shopping destination built to deliver
                modern, stylish, and high-quality products at the best prices.
            </p>
            <div className="mt-12 grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                    <p className="text-gray-600 leading-7">
                        To make online shopping simple and enjoyable with reliable customer support,
                        fast shipping, and a seamless user experience.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-3">Why Choose Us?</h2>
                    <ul className="text-gray-600 leading-7 list-disc list-inside">
                        <li>Fast Delivery</li>
                        <li>Best Prices</li>
                        <li>High-Quality Products</li>
                        <li>Easy Returns</li>
                        <li>24/7 Customer Support</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default AboutPage;