// Q3
import { useState } from "react"


export default function FormLoisirs() {
    const categories = ["Opéra", "Football", "Cinéma", "Rugby", "Théatre", "Musée",
                        "Surf", "Œnologie", "Lecture", "Promenade", "Natation", 
                        "Course à pied", "Tennis", "Musique"
    ]

    const [categoriesChoice, setCategoriesChoice] = useState([])

    const categoriesSelect = categories.map(c => {
        return <button key={c} onClick={() => categoriesChoice.includes(c) ? setCategoriesChoice(categoriesChoice.filter(el => el !== c)) : setCategoriesChoice([...categoriesChoice, c])} className={`hover:cursor-pointer text-xl font-serif font-bold border-2 m-5 p-3 rounded-xl transition-all duration-200 ${categoriesChoice.includes(c) ? "bg-yellow-400 border-yellow-600 text-purple-900 scale-105 shadow-lg" : "bg-yellow-100 border-yellow-300 text-black hover:bg-yellow-200"}`}>{c}</button>
    })

    function handleNext() {
        console.log(categoriesChoice)
    }
    
    return <>
    <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center">
        <div>
            <h1 className="shadow-lg/20 text-5xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 font-serif leading-relaxed font-bold text-purple-900">
                Quels sont tes loisirs ?
                <br />
                (plusieurs choix possibles)
            </h1>
        </div>
        <div className="">
            {categoriesSelect}
        </div>
        <div>
            <button onClick={handleNext} className="mt-20 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer text-black text-3xl font-serif font-bold border-2 border-yellow-300 m-5 p-6 rounded-xl shadow-lg/10">Suivant</button>
        </div>
    </div>
    </> 

}

