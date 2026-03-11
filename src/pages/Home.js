import { useNavigate } from "react-router-dom";

export default function Home(){

const navigate = useNavigate()

return(

<div className="h-screen flex items-center justify-center gap-10">

<button
className="bg-[#1f1f1f] px-12 py-6 rounded-xl text-xl hover:bg-[#333]"
onClick={()=>navigate("/input")}
>
INPUT
</button>

<button
className="bg-[#1f1f1f] px-12 py-6 rounded-xl text-xl hover:bg-[#333]"
onClick={()=>navigate("/output")}
>
OUTPUT
</button>

</div>

)
}