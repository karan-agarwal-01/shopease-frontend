import React from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ item }) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/product-details/${item._id}`)} className="bg-gray-50 rounded-xl p-4 shadow hover:shadow-xl transition cursor-pointer flex flex-col justify-between">
        <img src= {item.image} className="w-full h-48 rounded-xl mb-2 object-cover" />
        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-1">₹{item.price}</p>
        <div className="flex items-center mt-2 text-yellow-500">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
            ))}
        </div>
    </div>
  )
}

export default ProductCard