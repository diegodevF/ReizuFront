//Importamos dependencias
import {Routes, Route} from "react-router-dom"

//Importing Routes
import Landing from "./routes/Landing"
import Login from "./routes/Login"
import ComicInfo from "./routes/ComicInfo"
import Exclusives from "./routes/Exclusives"
import Genres from "./routes/Genres"
import Register from "./routes/Register"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/ComicInfo" element={<ComicInfo/>}/>
      <Route path="/Exclusives" element={<Exclusives/>}/>
      <Route path="/Genres" element={<Genres/>}/>
    </Routes>
    
    </>
  )
}

export default App
