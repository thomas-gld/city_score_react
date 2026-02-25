// Q5

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../GlobalState"

export default function FormCategories() {
    const navigate = useNavigate()
    const categories = ["Etudiants", "Actifs", "Retraités", "Autres"]
    const [categoriesChoice, setCategoriesChoice] = useState([])

    const { setCategories } = useGlobalState()

    const categoriesSelect = categories.map(c => {
        return (<button key={c} onClick={() => categoriesChoice.includes(c) ? setCategoriesChoice(categoriesChoice.filter(el => el !== c)) : setCategoriesChoice([...categoriesChoice, c])} className={`hover:cursor-pointer text-xl font-serif font-bold border-2 m-5 p-3 rounded-xl transition-all duration-200 ${categoriesChoice.includes(c) ? "bg-yellow-400 border-yellow-600 text-purple-900 scale-105 shadow-lg" : "bg-yellow-100 border-yellow-300 text-black hover:bg-yellow-200"}`}>{c}</button>)
    })

    function handleNext() {
        if (categoriesChoice.length === 0) return  // bloquer si aucun choix
        setCategories(categoriesChoice)
        navigate('/est-important')
    }
    
    return <>
    <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center">
        <div>
            <h1 className="shadow-lg/20 text-5xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 font-serif leading-relaxed font-bold text-purple-900">
                Qu'est-ce qui est important pour toi ?
            </h1>
        </div>
        <div className="">
            {categoriesSelect}
        </div>
        <div>
            <button
                onClick={handleNext}
                disabled={categoriesChoice.length === 0}
                className={`mt-20 text-black text-3xl font-serif font-bold border-2 m-5 p-6 rounded-xl shadow-lg/10
                    ${categoriesChoice.length === 0
                    ? "bg-gray-300 border-gray-400 cursor-not-allowed"
                    : "bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer border-yellow-300"
                    }
                `}
                >
                Suivant
            </button>
        </div>
    </div>
    </> 

}