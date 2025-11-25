const Textarea = ({ label, register, name, validation, errors }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea type="text" {...register(name, validation)} rows={4} className={`w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none ${errors[name] ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500 border-gray-300" }`}></textarea>
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
        </div>
    );
}

export default Textarea;