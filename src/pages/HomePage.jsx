import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Services from '../components/Services';
import Fleet from '../components/Fleet';
import Quote from '../components/Quote';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Fleet />
        <Quote />
        <Gallery />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
