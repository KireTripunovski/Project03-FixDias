import Section1 from "../components/HomepageComponents/Section1";
import Section2 from "../components/HomepageComponents/Section2";
import Section3 from "../components/HomepageComponents/Section3";
import Section4 from "../components/HomepageComponents/Section4";
import Section5 from "../components/HomepageComponents/Section5";
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
      <Section4 />
      <Section5 />
    </div>
  );
};

export default Home;
