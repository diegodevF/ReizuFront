//Importamos dependencias
import {Routes, Route} from "react-router-dom"

//Importing Routes
import Landing from "./routes/Landing"
import Login from "./routes/Login"
import ComicInfo from "./routes/ComicInfo"
import Exclusives from "./routes/Exclusives"
import Genres from "./routes/Genres"
import Register from "./routes/Register"
import Shop from "./routes/Shop"

//Subrutas de la Shop
import PersonalizePage from "./subRoutes/PersonalizePage"
import CommissionPage from "./subRoutes/CommissionPage"
import ExchangePage from "./subRoutes/ExchangePage"
import SpecialChaptersPage from "./subRoutes/SpecialChaptersPage"

//Importamos Admin Panel
import Dashboard from "./admin/Dashboard"
import Works from "./admin/Works"
import AddWork from "./admin/AddWork"
import Caps from "./admin/Caps"
import AddCap from "./admin/AddCap"
import AddCapConfig from "./admin/AddCapConfig"
import Banners from "./admin/Banners"
import AddBanner from "./admin/AddBanner"
import Comments from "./admin/Comments"


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
      <Route path="/Shop" element={<Shop/>}/>
          {/* SubRutas de la shop */}
          <Route path="/Shop/PersonalizeSection" element={<PersonalizePage />} />
          <Route path="/Shop/CommissionPage" element={<CommissionPage />} />
          <Route path="/Shop/ExchangePage" element={<ExchangePage />} />
          <Route path="/Shop/SpecialChaptersPage" element={<SpecialChaptersPage />} />

      {/* Admin Panels */}
      <Route path="/Admin/Dashboard" element={<Dashboard />} />
      <Route path="/Admin/Works" element={<Works />} />
      <Route path="/Admin/AddWork" element={<AddWork />} />
      <Route path="/Admin/Caps" element={<Caps />} />
      <Route path="/Admin/AddCap" element={<AddCap />} />
      <Route path="/Admin/AddCapConfig" element={<AddCapConfig />} />
      <Route path="/Admin/Banners" element={<Banners />} />
      <Route path="/Admin/AddBanner" element={<AddBanner />} />
      <Route path="/Admin/Comments" element={<Comments />} />

    </Routes>

    </>
  )
}

export default App
