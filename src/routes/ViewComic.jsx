import Navbar from "../components/Navbar";
import ComicViewer from "../components/ComicViewer";
import Footer from "../components/Footer";
import ComicRating from "../components/ComicRating";
import UserReviews from "../components/UserReviews";
import RecommendedWorks from "../components/RecommendedWorks";

const ViewComic = () => {
  return (
    <>
        <Navbar></Navbar>
        <ComicViewer title="Reizu Comic"></ComicViewer>
        <ComicRating></ComicRating>
        <div className="container py-4">
        <div className="row g-5">
            <div className="col-lg-7">
            <UserReviews />
            </div>
            <div className="col-lg-5">
            <RecommendedWorks />
            </div>
        </div>
        </div>
        <Footer></Footer>
    </>
  );
}

export default ViewComic;