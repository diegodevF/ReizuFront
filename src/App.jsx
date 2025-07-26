//Importamos dependencias
import {Routes, Route} from "react-router-dom"

import "./App.css"

//Importing Routes
import Landing from "./routes/Landing"
import Login from "./routes/Login"
import ForgotPassword from "./routes/ForgotPassword"
import ComicInfo from "./routes/ComicInfo"
import Exclusives from "./routes/Exclusives"
import Genres from "./routes/Genres"
import Register from "./routes/Register"
import ViewComic from "./routes/ViewComic"

//Subrutas de Profile
import Profile from "./routes/Profile"
import Portfolio from "./author/Portfolio"
import Products from "./author/Products"
import Subscription from "./author/Subscription"
import About from "./author/About"

//Subrutas de la Shop
import Shop from "./routes/Shop"
import PersonalizePage from "./subRoutes/PersonalizePage"
import CommissionPage from "./subRoutes/CommissionPage"
import ExchangePage from "./subRoutes/ExchangePage"
import SpecialChaptersPage from "./subRoutes/SpecialChaptersPage"


//Importamos Admin Panel
import Dashboard from "./admin/Dashboard"
import EditProfile from "./admin/EditProfile"
import AnalyticsDashboard from "./admin/components/AnalyticsDashboard"
import Works from "./admin/Works"
import AddWork from "./admin/AddWork"
import Caps from "./admin/Caps"
import AddCap from "./admin/AddCap"
import AddCapConfig from "./admin/AddCapConfig"
import Banners from "./admin/Banners"
import AddBanner from "./admin/AddBanner"
import Comments from "./admin/Comments"
import ProductsShop from "./admin/ProductsShop"
import AddProduct from "./admin/AddProduct"
import ArtBooks from "./admin/ArtBooks"
import AddArtBook from "./admin/AddArtBook"
import Commissions from "./admin/Commissions"
import AddCommission from "./admin/AddCommission"
import Popups from "./admin/Popups"
import AddPopup from "./admin/AddPopup"
import Participants from "./admin/Participants"
import AddParticipant from "./admin/AddParticipant"
import ConvocatoriaInfo from "./admin/ConvocatoriaInfo"
import ConvocatoriaRules from "./admin/ConvocatoriaRules"
import Achievements from "./admin/Achivements"
import AddAchievement from "./admin/AddAchivement"
import Subscriptions from "./admin/Subscriptions"
import AddSubscription from "./admin/AddSubcription"
import ViewCaps from "./admin/ViewCaps"
import ShopRuiz from "./routes/shopRuiz"


import NotFound from "./routes/NotFound"
import RedeemCode from "./routes/RedeemCode"
import RuizInfo from "./routes/RuizInfo"


import ConvocatoriaPage from "./routes/ConvocatoriaPage"
import ConvoRules from "./routes/ConvoRules"
import ConvoForm from "./routes/ConvoForm"
import Ranking from "./routes/Ranking"
import Winners from "./routes/Winners"
import QuestionFrequent from "./routes/QuestionFrequent"
import Who from "./routes/Who"
import ContactE from "./routes/contactE"
import TermCondi from "./routes/TermCondi"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
      <Route path="/ComicInfo" element={<ComicInfo/>}/>
      <Route path="/Exclusives" element={<Exclusives/>}/>
      <Route path="/Genres" element={<Genres/>}/>
      <Route path="/ViewComic" element={<ViewComic/>}/>
      <Route path="/preguntas-frecuentes" element={<QuestionFrequent/>}/>
      <Route path="/quienes-somos" element={<Who/>}/>
      <Route path="contacto-empresa" element={<ContactE/>}/>
      <Route path="terminos-y-condiciones" element={<TermCondi/>}/>


      <Route path="/redeem-code" element={<RedeemCode/>}/>
      <Route path="/reizu-info" element={<RuizInfo/>}/>


      {/* convocatoria panel */}
      <Route path="/convocatoria" element={<ConvocatoriaPage/>}/>
      <Route path="/convocatoria/reglas" element={<ConvoRules/>}/>
      <Route path="/convocatoria/formulario" element={<ConvoForm/>}/>
      <Route path="/convocatoria/top10" element={<Ranking/>}/>
      <Route path="/convocatoria/ganadores" element={<Winners/>}/>



      <Route path="/Shop" element={<Shop/>}/>
          {/* SubRutas de la shop */}
          <Route path="/Shop/PersonalizeSection" element={<PersonalizePage />} />
          <Route path="/Shop/CommissionPage" element={<CommissionPage />} />
          <Route path="/Shop/ExchangePage" element={<ExchangePage />} />
          <Route path="/Shop/SpecialChaptersPage" element={<SpecialChaptersPage />} />
          <Route path="/Shop/reizu" element={<ShopRuiz/>}/>


      {/* Admin Panels */}
      <Route path="/Admin" element={<Dashboard />} />
      <Route path="/Admin/EditProfile" element={<EditProfile />} />
      <Route path="/Admin/Analytics" element={<AnalyticsDashboard />} />
      <Route path="/Admin/Works" element={<Works />} />
      <Route path="/Admin/AddWork" element={<AddWork />} />
      <Route path="/Admin/Caps" element={<Caps />} />
      <Route path="/Admin/AddCap" element={<AddCap />} />
      <Route path="/Admin/AddCapConfig" element={<AddCapConfig />} />
      <Route path="/Admin/Banners" element={<Banners />} />
      <Route path="/Admin/AddBanner" element={<AddBanner />} />
      <Route path="/Admin/Comments" element={<Comments />} />
      <Route path="/Admin/ProductsShop" element={<ProductsShop/>}/>
      <Route path="/Admin/AddProduct" element={<AddProduct/>}/>
      <Route path="/Admin/ArtBooks" element={<ArtBooks/>}/>
      <Route path="/Admin/AddArtBook" element={<AddArtBook/>}/>
      <Route path="/Admin/Commissions" element={<Commissions/>}/>
      <Route path="/Admin/AddCommission" element={<AddCommission/>}/>
      <Route path="/Admin/Popups" element={<Popups/>}/>
      <Route path="/Admin/AddPopup" element={<AddPopup/>}/>
      <Route path="/Admin/Participants" element={<Participants/>}></Route>
      <Route path="/Admin/AddParticipant" element={<AddParticipant/>}></Route>
      <Route path="/Admin/ConvocatoriaInfo" element={<ConvocatoriaInfo/>}></Route>
      <Route path="/Admin/ConvocatoriaRules" element={<ConvocatoriaRules/>}></Route>
      <Route path="/Admin/Achivements" element={<Achievements/>}></Route>
      <Route path="/Admin/AddAchivement" element={<AddAchievement/>}></Route>
      <Route path="/Admin/Subscriptions" element={<Subscriptions/>}></Route>
      <Route path="/Admin/AddSubscription" element={<AddSubscription/>}></Route>
      <Route path="/Admin/ViewCaps" element={<ViewCaps />} />

      {/* Profile Route */}
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Portfolio" element={<Portfolio />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Subscriptions" element={<Subscription />} />
      <Route path="/About" element={<About />} />



      <Route path="*" element={<NotFound />} />
    </Routes>

    </>
  )
}

export default App
