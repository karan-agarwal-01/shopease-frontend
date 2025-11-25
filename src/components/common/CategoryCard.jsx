import React from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ item }) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/shop', { state: item._id})} className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
        <img src= {item.image} className="w-full h-48 rounded-xl mb-2 object-cover" />
        <h3 className="text-lg font-semibold text-gray-700 text-center">{item.name}</h3>
    </div>
  )
}

export default CategoryCard;
