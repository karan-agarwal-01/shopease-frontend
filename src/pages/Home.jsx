import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {

    return (
        <>
        <HeroSection />
        <Categories />
        <Products />
        <Testimonials />
        <Footer />
        </>
    );
}

export default Home;