import { createContext, useContext, useState } from "react"

const GlobalContext = createContext()

export function GlobalProvider({ children }) {

  const [criteres, setCriteres] = useState({})
  const [lieux, setLieux] = useState("")
  const [meteo, setMeteo] = useState({})
  const [loisir, setLoisir] = useState([])
  const [important, setImportant] = useState({})
  const [categories, setCategories] = useState([])
  const [villes, setVilles] = useState([])
  const [userName, setUserName] = useState("")

  return (
    <GlobalContext.Provider
      value={{
        criteres, setCriteres,
        lieux, setLieux,
        meteo, setMeteo,
        loisir, setLoisir,
        important, setImportant,
        categories, setCategories,
        villes, setVilles,
        userName, setUserName
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalState() {
  return useContext(GlobalContext)
}