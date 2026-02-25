// Q6
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../GlobalState"

export default function FormEstImportant() {  
    const navigate = useNavigate()
    const categories = ["Espaces vert", "Restaurants", "Bars", "Lieux de santé", "Commerces", "Industries"]
    const [importantChoice, setImportantChoice] = useState({})
    const {setImportant} = useGlobalState()

    const categoriesSliders = categories.map(c => {
        return (<div className="mb-7">
            <label className="text-xl font-serif mr-5 p-3 border-2 border-yellow-300 bg-yellow-100 rounded-lg shadow-lg/10"  >{c}</label>
            <input type="range" onChange={e => setImportantChoice({ ...importantChoice, [c]: e.target.value })}/>
            </div>)
    })

    function handleNext() {
        setImportant(importantChoice)
        console.log(importantChoice)
        navigate('/resultats')
    }
    
    return <>
    <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center">
        <div>
            <h1 className="shadow-lg/20 text-5xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 font-serif leading-relaxed font-bold text-purple-900">
                Qu'est-ce qui est le plus important pour toi ?
            </h1>
        </div>
        <div>
            {categoriesSliders}
        </div>
        <div>
            <button onClick={handleNext} className="mt-20 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer text-black text-3xl font-serif font-bold border-2 border-yellow-300 m-5 p-6 rounded-xl shadow-lg/10">Suivant</button>
        </div>
    </div>
    </> 

}