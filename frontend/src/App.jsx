import { useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import FormCriteres from "./components/FormCriteres"
import FormLieux from "./components/FormLieux"
import FormCategories from "./components/FormCategories"
import FormEstImportant from "./components/FormEstImportant"
import FormLoisirs from "./components/FormLoisir";
import FormMeteo  from "./components/FormMeteo";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home"
import Resultat from "./components/Resultat"


function App() {
  useEffect(() => {
    fetch("http://localhost:8000/api/csrf/", { credentials: "include" })
  }, [])

  return (
    <Routes>
      {/* Pages publiques accessibles à tous */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      {/* Pages protégées */}
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/categories" element={<ProtectedRoute><FormCategories/></ProtectedRoute>}/>
      <Route path="/criteres" element={<ProtectedRoute><FormCriteres/></ProtectedRoute>}/>
      <Route path="/lieux" element={<ProtectedRoute><FormLieux/></ProtectedRoute>}/>
      <Route path="/est-important" element={<ProtectedRoute><FormEstImportant/></ProtectedRoute>}/>
      <Route path="/loisirs" element={<ProtectedRoute><FormLoisirs/></ProtectedRoute>}/>
      <Route path="/meteo" element={<ProtectedRoute><FormMeteo/></ProtectedRoute>}/>
      <Route path="/resultats" element={<ProtectedRoute><Resultat/></ProtectedRoute>}/>                       
    </Routes>
  )
}

export default App