export default function Input({type,placeholder,onChange,value,name}){

    return(<>
    <input
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    className="w-full mb-8 p-2 border rounded text-center bg-white placeholder:text-lg"
    />
    </>)
}