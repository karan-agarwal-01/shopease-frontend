import React from 'react'

const Footer = () => {
    return (<footer className="bg-gray-900 text-white py-10 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
                <h3 className="font-bold mb-4">Shop</h3>
                <ul className="space-y-2 text-gray-300">
                    <li className='cursor-pointer'>New Arrivals</li>
                    <li className='cursor-pointer'>Bestsellers</li>
                    <li className='cursor-pointer'>Discounts</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-300">
                    <li className='cursor-pointer'>About Us</li>
                    <li className='cursor-pointer'>Careers</li>
                    <li className='cursor-pointer'>Contact</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-300">
                    <li className='cursor-pointer'>Help Center</li>
                    <li className='cursor-pointer'>Order Tracking</li>
                    <li className='cursor-pointer'>Returns</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-4">Follow Us</h3>
                <ul className="space-y-2 text-gray-300">
                    <li className='cursor-pointer'>Instagram</li>
                    <li className='cursor-pointer'>Twitter</li>
                    <li className='cursor-pointer'>Facebook</li>
                </ul>
            </div>
        </div>
        <p className="text-center text-gray-400 mt-10"> © {new Date().getFullYear()} ShopEase — All rights reserved.</p>
    </footer>
    )
}

export default Footer