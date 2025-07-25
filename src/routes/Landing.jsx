//Importing Components
import Navbar from "../components/Navbar"
import BestArtist from "../components/BestArtist"
import ListNovel from "../components/ListNovel"
import Footer from "../components/Footer"
import RecentCaps from "../components/RecentCaps"
import RankingPopulares from "../components/RankingPopulares"
import ComicShowcase from "../components/ComicShowcase"
import MostVisited from "../components/MostVisited"
import Carousel from "../components/Carousel"
import Partners from "../components/Partners"

const Landing = () => {
    return (
        <>
            <Navbar></Navbar>
            <Carousel></Carousel>
            <div style={{maxWidth:'1300px', margin:'0 auto'}}>
            <RankingPopulares></RankingPopulares>
            <RecentCaps></RecentCaps>
            <ComicShowcase></ComicShowcase> {/**/}
            <MostVisited></MostVisited>
            <ListNovel></ListNovel>
            </div>
            <BestArtist></BestArtist>
            <Partners></Partners>
            <Footer></Footer>
        </>
)}
export default Landing;