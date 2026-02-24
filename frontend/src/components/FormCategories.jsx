// Q5

export default function FormCategories() {
    const categories = ["Etudiants", "Actifs", "Retraités", "Autres"]

    const categoriesSelect = categories.map(c => {
        return <button className="bg-yellow-100 hover:bg-yellow-300 hover:cursor-pointer text-black text-xl font-serif font-bold border-2 border-yellow-300 m-5 p-3 rounded-xl shadow-lg/10">{c}</button>
    })
    
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
    </div>
    </> 

}