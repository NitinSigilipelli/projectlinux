import CopyButton from "./CopyButton";

export default function MessageCard({text}){

return(

<div className="bg-[#111] p-4 rounded-lg flex justify-between items-center">

<p>{text}</p>

<CopyButton text={text}/>

</div>

)

}