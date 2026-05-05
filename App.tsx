
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Skills from './components/Skills';
import Work from './components/Work';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Skills />
        <Work />
      </main>
      <Footer />
    </div>
  );
};

export default App;
