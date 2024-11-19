import CategoryEvent from "./components/CategoryEvent";
import EventList from "./components/EventList";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CategoryEvent />
      <EventList />
      <Footer /> 
    </div>
  );
};

export default HomePage;
