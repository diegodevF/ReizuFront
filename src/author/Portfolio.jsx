import Navbar from "../components/Navbar";
import AuthorProfile from "../components/AuthorProfile";
import AuthorNav from "../components/AuthorNav";
import ChapterProfile from "../components/ChapterProfile";
import Illustrations from "../components/Illustrations";
import ArtBooks from "../components/ArtBooks";
import Footer from "../components/Footer";

const Portfolio = () => {
  return (
    <>
        <Navbar/>
        <AuthorProfile />
        <AuthorNav />
        <ChapterProfile/>
        <Illustrations />
        <ArtBooks />
        <Footer />
    </>
  );
};

export default Portfolio;