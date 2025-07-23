import Navbar from "../components/Navbar";
import AuthorProfile from "../components/AuthorProfile";
import AuthorNav from "../components/AuthorNav";
import CommissionTable from "../components/CommissionTable";
import SpecialCapsProfile from "../components/SpecialCapsProfile";
import CommissionOptions from "../components/CommissionOptions";
import CustomProducts from "../components/CustomProducts";
import Footer from "../components/Footer";

const Products = () => {
  return (
    <div>
        <Navbar />
        <AuthorProfile />
        <AuthorNav />
        <SpecialCapsProfile />
        <CommissionTable/>
        <CommissionOptions />
        <CustomProducts />
        <Footer />
    </div>
  );
};

export default Products;