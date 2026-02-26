// Q6
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../GlobalState"

const LABEL_TO_KEY = {
    "Espaces verts":   "espaceVertValue",
    "Restaurants":     "restaurantValue",
    "Bars":            "barValue",
    "Lieux de santé":  "santeValue",
}

const sliderLabels = Object.keys(LABEL_TO_KEY)

export default function FormEstImportant() {
    const navigate = useNavigate()
    const { criteres, lieux, meteo, categories, setImportant, setVilles } = useGlobalState()

    const [importantChoice, setImportantChoice] = useState(
        Object.fromEntries(Object.values(LABEL_TO_KEY).map(key => [key, 50]))
    )

    const categoriesSliders = sliderLabels.map(label => {
        const key = LABEL_TO_KEY[label]
        return (
            <div key={label} className="mb-7">
                <label className="text-xl font-serif mr-5 p-3 border-2 border-yellow-300 bg-yellow-100 rounded-lg shadow-lg/10">{label}</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={50}
                    onChange={e => setImportantChoice(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                />
            </div>
        )
    })

    function getCsrfToken() {
        return document.cookie.split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1]
    }

    async function handleNext() {
        setImportant(importantChoice)
        const payload = {
            criteres,
            lieux,
            meteo,
            categories,
            important: importantChoice,
        }
        const response = await fetch("http://127.0.0.1:8000/api/cityscore/", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CSRFToken": getCsrfToken() },
            credentials: "include",
            body: JSON.stringify(payload),
        })
        if (!response.ok) return
        const data = await response.json()
        setVilles(data)
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
