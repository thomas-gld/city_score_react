// Q1
import { useState } from "react"
import { useNavigate, } from "react-router-dom"
import { useGlobalState } from "../GlobalState"

export default function FormCriteres(){
    const navigate = useNavigate()
    const { criteres, setCriteres } = useGlobalState()

    // state local pour les sliders
    const [formValues, setFormValues] = useState({
        climat: criteres.climat || 50,
        culture: criteres.culture || 50,
        loisirs: criteres.loisirs || 50,
        sante: criteres.sante || 50,
        prix: criteres.prix || 50,
        securite: criteres.securite || 50,
        pollution: criteres.pollution || 50
    })
    // fonction pour gérer les sliders 

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues(prev => ({ ...prev, [name]: Number(value) }))
    }

    function handleNext(){
        setCriteres(formValues) // sauvegarde globale
        navigate('/lieux')
    }

    return (
        <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Quels critères t'importent le plus ?</h1>

        <div className="flex flex-col items-center justify-between gap-6">

            {Object.entries(formValues).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 w-full max-w-md">
                <label className="w-32 text-right capitalize">{key} :</label>
                <input
                type="range"
                name={key}
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                className="flex-1"
                />
                <span className="w-12 text-right">{value}</span>
            </div>
            ))}

        </div>

        <button
            onClick={handleNext}
            className="mt-20 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer text-black text-3xl font-serif font-bold border-2 border-yellow-300 m-5 p-6 rounded-xl shadow-lg/10"
        >
            Suivant
        </button>
        </div>
  )
}