//login
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";


export default function Login(){
    const { login } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState ({
        username:"",
        password:"",
    });

    const handleChange = (e)=> {
        setFormData({...formData, [e.target.id]: e.target.value});
    };
    
    async function handleLogin(e) {
         e.preventDefault();
         const response = await fetch("/api/login/", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            login(formData.username);
            console.log("Connecté !", data);
            navigate("/");
            
        } else {
            console.log("Erreur")
            alert(data.error || "Erreur lors de la connexion");
        }
    }


    function goRegister(){
        navigate('/register/')
    }
    return (
        <>
            <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center font-serif leading-relaxed font-bold text-purple-900">
                <h1 className="shadow-lg/20 text-5xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 font-serif leading-relaxed font-bold text-purple-900">
                    City-Score
                </h1>
                <h2 className="shadow-lg/20 text-2xl m-2 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200">
                    Login
                </h2>
                    <form onSubmit={handleLogin} className="shadow-lg/20 text-2xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 flex flex-col items-center gap-4">
                        <div>
                            <label htmlFor="username">Nom d'utilisateur
                                <br></br><input type="text" id="username" onChange={handleChange} className="border-2 border-black"></input>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe
                                <br></br><input type="password" id="password" onChange={handleChange} className="border-2 border-black"></input>
                            </label>
                        </div>
                        <div>
                            <button type="submit" className="mt-5 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer border-2 border-yellow-300 m-3 p-3 rounded-xl shadow-lg/10">Connexion</button>
                        </div>
                    </form>
                    <div>
                        <button onClick={goRegister} className="mt-5 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer border-2 border-yellow-300 m-3 p-3 rounded-xl shadow-lg/10">Créer un compte</button>
                    </div>
            </div>
            
        </>
    )
}