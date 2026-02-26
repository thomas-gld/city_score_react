// Q2
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../GlobalState"


export default function FormLieux(){
    const [selected, setSelected] = useState(null)
    const navigate = useNavigate()
    const { setLieux } = useGlobalState()

    function handleNext(){
        if (!selected) return
        setLieux(selected)
        navigate('/loisirs')  
    }
    return (
        <>
            <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center gap-3">
                <h1 className="text-2xl font-bold text-white">Vers quel lieu souhaites-tu vivre ?</h1>
                <div className="flex gap-2 bg-white/20 p-1 rounded-full">
                    <button 
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-200${selected === "mer"? "bg-white text-purple-800 shadow" : "text-white hover:bg-white/20"}`}
                        onClick= {() => setSelected("mer")}
                        >
                            Mer
                    </button>
                    <button 
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-200${selected === "montagne"? "bg-white text-purple-800 shadow" : "text-white hover:bg-white/20"}`}
                        onClick= {() => setSelected("montagne")}
                        >
                            Montagne
                    </button>
                    <button 
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-200${selected === "both"? "bg-white text-purple-800 shadow" : "text-white hover:bg-white/20"}`}
                        onClick= {() => setSelected("both")}
                        >
                            Les deux
                    </button>
                </div>
                <div>
                    <button 
                        onClick={handleNext} 
                        disabled={!selected} 
                        className={`mt-20 text-black text-3xl font-serif font-bold border-2 m-5 p-6 rounded-xl shadow-lg/10
                            ${!selected
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
    )
}