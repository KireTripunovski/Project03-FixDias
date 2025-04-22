import Section1 from "../components/HomepageComponents/Section1";
import Section2 from "../components/HomepageComponents/Section2";
import Section3 from "../components/HomepageComponents/Section3";
import CraftsmanCarousel from "../components/HomepageComponents/Section4";
import Section5 from "../components/HomepageComponents/Section5";
import LatestJobPosting from "../components/HomepageComponents/Section6";
import TestimonialsSection from "../components/HomepageComponents/Section7";
import CustomersSection from "../components/HomepageComponents/Section8";
import Footer from "../components/HomepageComponents/Section9";
import Navbar from "../components/NavbarHomePage";

const Home = () => {
  return (
    <div className="custom-container">
      <div className="w-full">
        <Navbar />
      </div>
      <Section1 />
      <Section2 />
      <Section3 />
      <CraftsmanCarousel />
      <Section5 />
      <LatestJobPosting />
      <TestimonialsSection />
      <CustomersSection />
      <Footer />
    </div>
  );
};

export default Home;
