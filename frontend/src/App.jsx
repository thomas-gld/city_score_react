import { Route, Routes, Navigate } from "react-router-dom"
import FormCriteres from "./components/FormCriteres"
import FormLieux from "./components/FormLieux"
import FormCategories from "./components/FormCategories"
import FormEstImportant from "./components/FormEstImportant"
import FormLoisirs from "./components/FormLoisir";
import FormMeteo  from "./components/FormMeteo";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/categories" element={<FormCategories/>}/>
      <Route path="/criteres" element={<FormCriteres/>}/>
      <Route path="/lieux" element={<FormLieux/>}/>
      <Route path="/est-important" element={<FormEstImportant/>}/>
      <Route path="/loisirs" element={<FormLoisirs/>}/>
      <Route path="/meteo" element={<FormMeteo/>}/>
    </Routes>
  )
}

export default App