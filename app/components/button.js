export default function Button({onClick,text}){

    return<>
    
<button 
  onClick={onClick}
  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
>
  {text}
</button>
    </>
}