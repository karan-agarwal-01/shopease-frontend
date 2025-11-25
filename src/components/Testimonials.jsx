import React from 'react'
import TestimonialCard from './common/TestimonialCard'

const Testimonials = () => {
  return (
    <section className="py-16 px-6 md:px-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((item) => (
                <TestimonialCard key={item} />
            ))}
        </div>
    </section>
  )
}

export default Testimonials