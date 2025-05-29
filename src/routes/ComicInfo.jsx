import FeaturedComic from "../components/FeaturedComics";
import Navbar from "../components/Navbar";
import SerieCard from "../components/SerieCard";
import EpisodeList from "../components/EpisodeList";
import SpecialCaps from "../components/SpecialCaps";

//importamos estilos globales
import "../variables.css"

const ComicInfo = () => {
    const galleryImgs = [
  "https://i.imgur.com/1.jpg",
  "https://i.imgur.com/2.jpg",
  "https://i.imgur.com/3.jpg",
  "https://i.imgur.com/4.jpg",
  "https://i.imgur.com/1.jpg",
  "https://i.imgur.com/2.jpg",
  "https://i.imgur.com/3.jpg",
  "https://i.imgur.com/1.jpg",
  "https://i.imgur.com/2.jpg",
  "https://i.imgur.com/3.jpg"
];

const episodes = [
  {
    number: 10,
    title: "El dia que conoci la oscuridad",
    date: "Agosto 20, 2023",
    img: "../assets/Portadas/1000105792.png",
    locked: true,
    price: 150,
    likes: 40,
    comments: 30,
    views: "10.567",
    read: true
  },
    {
        number: 9,
        title: "El despertar de los poderes",
        date: "Julio 15, 2023",
        img: "../assets/Portadas/1000105792.png",
        locked: false,
        price: 0,
        likes: 50,
        comments: 20,
        views: "8.123",
        read: false
    },
    {
        number: 8,
        title: "La batalla final",
        date: "Junio 10, 2023",
        img: "../assets/Portadas/1000105792.png",
        locked: true,
        price: 200,
        likes: 60,
        comments: 25,
        views: "12.345",
        read: false
    },
    {
        number: 7,
        title: "El viaje al pasado",
        date: "Mayo 5, 2023",
        img: "../assets/Portadas/1000105792.png",
        locked: false,
        price: 0,
        likes: 30,
        comments: 15,
        views: "5.678",
        read: true
    },
    {
        number: 6,
        title: "La verdad oculta",
        date: "Abril 1, 2023",
        img: "../assets/Portadas/1000105792.png",
        locked: true,
        price: 250,
        likes: 70,
        comments: 35,
        views: "15.678",
        read: false
    },
  // ...más episodios
];

    return (
        <>
        <Navbar></Navbar>
        <FeaturedComic></FeaturedComic>
        <div className="d-flex justify-content-center align-items-start flex-row custom-gap-10 py-4">
            <div style={{ flex: 1, maxWidth: 700 }}>
                <SerieCard gallery={galleryImgs} />
            </div>
            <div style={{ flex: 1, maxWidth: 700 }}>
                <EpisodeList episodes={episodes} />
            </div>
        </div>
        <SpecialCaps></SpecialCaps>


        </>
    );
}

export default ComicInfo;