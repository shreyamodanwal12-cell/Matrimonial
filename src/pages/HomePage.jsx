import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import FeaturedProfiles from "../components/FeaturedProfiles";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SearchBox />
      <FeaturedProfiles />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePage;