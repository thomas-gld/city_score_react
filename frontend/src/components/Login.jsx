//login

function handleLogin(){
    return
}
function goRegister(){
    return
}

export default function Login(){
    return (
        <>
            <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center font-serif leading-relaxed font-bold text-purple-900">
                <h1 className="shadow-lg/20 text-5xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 font-serif leading-relaxed font-bold text-purple-900">
                    City-Score
                </h1>
                <h2 className="shadow-lg/20 text-2xl m-2 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200">
                    Login
                </h2>
                    <form action="" className="shadow-lg/20 text-2xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 flex flex-col items-center gap-4">
                        <div>
                            <label htmlFor="userName">Nom d'utilisateur
                                <br></br><input type="text" id="userName" className="border-2 border-black"></input>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe
                                <br></br><input type="text" id="password" className="border-2 border-black"></input>
                            </label>
                        </div>
                        <div>
                            <button onClick={handleLogin} className="mt-5 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer border-2 border-yellow-300 m-3 p-3 rounded-xl shadow-lg/10">Connexion</button>
                        </div>
                    </form>
                    <div>
                        <button onClick={goRegister} className="mt-5 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer border-2 border-yellow-300 m-3 p-3 rounded-xl shadow-lg/10">Créer un compte</button>
                    </div>
            </div>
            
        </>
    )
}