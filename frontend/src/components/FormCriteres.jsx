// Q1
import { useNavigate } from "react-router-dom"

export default function FormCriteres(){
    const navigate = useNavigate()

    function handleNext(){
        navigate('/lieux')
    }
    return (
        <>
            <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center gap-3">
                <h1 className="text-2xl font-bold text-white">Quels critères t'importent le plus ? </h1>

                <div className="flex justify-between gap-3 ms-20">
                    <p className="text-sm font-medium text-purple-900 border border-purple-400 bg-white/30 rounded-full px-3 py-1 backdrop-blur-sm">Pas important</p>
                    <p className="text-sm font-medium text-purple-900 border border-purple-400 bg-white/30 rounded-full px-3 py-1 backdrop-blur-sm">Égal</p>
                    <p className="text-sm font-medium text-purple-900 border border-purple-400 bg-white/30 rounded-full px-3 py-1 backdrop-blur-sm">Très important</p>
                </div>

                <div className="flex flex-col items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                        <label htmlFor="climat" className="text-right">Climat :</label>
                        <input type="range" id="climat" name="climat" min="0" max="100" defaultValue="50" className="flex-1"/>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="culture" className="text-right">Culture :</label>
                        <input type="range" id="climat" name="climat" min="0" max="100" defaultValue="50" className="flex-1"/>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="loisir" className="text-right">Loisirs :</label>
                        <input type="range" id="loisirs" name="climat" min="0" max="100" defaultValue="50" className="flex-1"/>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="sante" className="text-right">Santé :</label>
                        <input type="range" id="sante" name="climat" min="0" max="100" defaultValue="50" className="flex-1"/>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="prix" className="text-right">Coût de la vie :</label>
                        <input type="range" id="climat" name="prix" min="0" max="100" defaultValue="50" className="flex-1"/>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="securite" className="text-right">Sécurité :</label>
                        <input type="range" id="securite" name="climat" min="0" max="100" defaultValue="50" className="flex-1"/>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="pollution" className="text-right">Pollution :</label>
                        <input type="range" id="climat" name="climat" min="0" max="100" defaultValue="50" className="flex-1"/>
                    </div>
                </div>

                <div>
                    <button onClick={handleNext} className="mt-20 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer text-black text-3xl font-serif font-bold border-2 border-yellow-300 m-5 p-6 rounded-xl shadow-lg/10">Suivant</button>
                </div>
            </div>
        </>
    )
}