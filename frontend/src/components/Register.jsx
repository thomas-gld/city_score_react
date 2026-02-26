// register
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState ({
        username:"",
        password:"",
        password2:"",
    });

    const handleChange = (e)=> {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    function getCookie(name) {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith(name + '='))
            ?.split('=')[1];
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (formData.password !== formData.password2) {
            alert("Les mots de passe ne correspondent pas"); 
            return; 
        }

        const response = await fetch("/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            }),
        });

        const data = await response.json();
        console.log("data : ", data); 

        navigate('/login/')
    }
    

    return (
        <>
        <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center font-serif leading-relaxed font-bold text-purple-900">
                <h1 className="shadow-lg/20 text-5xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 font-serif leading-relaxed font-bold text-purple-900">
                    City-Score {document.cookie["csrftoken"]}
                </h1>
                <h2 className="shadow-lg/20 text-2xl m-2 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200">
                    Créer un compte
                </h2>
                    <form onSubmit={handleRegister} className="shadow-lg/20 text-2xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 flex flex-col items-center gap-4">
                        <div>
                            <label htmlFor="username">Nom d'utilisateur
                                <br></br><input type="text" id="username" onChange={handleChange} className="border-2 border-black"/>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe
                                <br></br><input type="password" id="password" onChange={handleChange} className="border-2 border-black"/>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="password2">Confirmer le mot de passe
                                <br></br><input type="password" id="password2" onChange={handleChange} className="border-2 border-black"/>
                            </label>
                        </div>
                        <div>
                            <button type="submit" className="mt-5 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer border-2 border-yellow-300 m-3 p-3 rounded-xl shadow-lg/10">S'inscrire</button>
                        </div>
                    </form>
                    <div>
                        <button onClick={() => navigate('/login')} className="mt-5 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 hover:cursor-pointer border-2 border-yellow-300 m-3 p-3 rounded-xl shadow-lg/10">Se connecter</button>
                    </div>
            </div>
        </>
    )
}