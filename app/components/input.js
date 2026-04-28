export default function Input({type,placeholder,onChange,value}){

    return(<>
    <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    className="w-full mb-8 p-2 border rounded text-center bg-white placeholder:text-lg"
    />
    </>)
}