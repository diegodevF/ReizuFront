import Navbar from "../components/Navbar";
import AuthorProfile from "../components/AuthorProfile";
import AuthorNav from "../components/AuthorNav";
import ProfileSummary from "../components/ProfileSummary";
import SubscriptionPlans from "../components/SubscriptionPlans";
import Footer from "../components/Footer";

const Subscription = () => {
  return (
    <div>
      <Navbar />
      <AuthorProfile />
      <AuthorNav />
      
      {/* Layout centrado como en la imagen */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          {/* Header del autor centrado */}
          <div className="col-12 col-md-8 col-lg-6">
            <ProfileSummary/>
          </div>
        </div>
        
        {/* Planes de suscripción */}
        <div className="row justify-content-center mt-4">
          <div className="col-12">
            <SubscriptionPlans />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
