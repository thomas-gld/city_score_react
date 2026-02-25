import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()

    function handleStart() {
        navigate('/criteres')
    }

    return (
        <>
        <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center font-serif leading-relaxed font-bold text-purple-900">
        <div className="bg-yellow-200 text-4xl p-5 mt-10 rounded-lg shadow-lg/30 font-serif">
            <h1>
                Quelle ville te correspond le plus ?
            </h1>
        </div>
        <div className="text-2xl p-3 bg-amber-100 mt-10 rounded-lg shadow-xl/10 hover:cursor-pointer hover:bg-yellow-300">
            <button onClick={handleStart} className="hover:cursor-pointer hover:bg-yellow-300">
                Commencer    
            </button>   
        </div>
        </div>
        </>
    )
}