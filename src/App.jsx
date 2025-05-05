//Importamos dependencias
import {Routes, Route} from "react-router-dom"

//Importing Routes
import Landing from "./routes/Landing"
import Login from "./routes/Login"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/Login" element={<Login/>}/>
    </Routes>
    
    </>
  )
}

export default App
