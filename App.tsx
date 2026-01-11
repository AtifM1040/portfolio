
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Work from './components/Work';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Tools />
        <Work />
      </main>
      <Footer />
    </div>
  );
};

export default App;
