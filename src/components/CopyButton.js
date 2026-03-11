import toast from "react-hot-toast";

export default function CopyButton({text}){

const copy = () =>{
navigator.clipboard.writeText(text)
toast.success("Copied!")
}

return(
<button
onClick={copy}
className="bg-[#333] px-3 py-1 rounded"
>
Copy
</button>
)

}