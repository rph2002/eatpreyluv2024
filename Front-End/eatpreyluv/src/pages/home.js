import AboutUs from "../components/AboutUs";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";
import PetSelector from "../components/PetSelector";
import Navbar from "./navbar";

function Home() {
  return (
    <div className="TestPage">
      <PageHeader />
      <Navbar />
      <div className="HomeContent">
        <PetSelector />
        <AboutUs />
      </div>
    </div>
  );
}

export default Home;
