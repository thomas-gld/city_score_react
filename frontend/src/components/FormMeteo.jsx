// Q4
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormMeteo() {
  const navigate = useNavigate()
  const [sunValue, setSunValue] = useState(50);
  const [heatValue, setHeatValue] = useState(50);

  function handleNext() {
    console.log({ sunValue, heatValue });
    navigate('/categories')
    
  }

  return (
    <div className="min-h-screen bg-linear-to-tr from-purple-200 to-purple-800 flex flex-col items-center p-10">
      <h1 className="shadow-lg/20 text-5xl m-10 p-5 border-yellow-400 border-2 rounded-2xl bg-linear-to-br from-white to-yellow-200 font-serif leading-relaxed font-bold text-purple-900">
        Quelles sont tes préférences climatiques ?
      </h1>

      <div className="flex flex-col gap-10 w-full max-w-xl">
        <div className="flex items-center gap-4">
          <span className="icone-meteo">☁️</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sunValue}
            onChange={(e) => setSunValue(e.target.value)}
            className="flex-1"
          />
          <span className="icone-meteo">☀️</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="icone-meteo">❄️</span>
          <input
            type="range"
            min="0"
            max="100"
            value={heatValue}
            onChange={(e) => setHeatValue(e.target.value)}
            className="flex-1"
          />
          <span className="icone-meteo">🔥</span>
        </div>

        <button
          onClick={handleNext}
          className="mt-10 bg-yellow-100 hover:bg-linear-to-tr from-yellow-100 to-yellow-300 text-black text-3xl font-serif font-bold border-2 border-yellow-300 p-6 rounded-xl shadow-lg/10"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}