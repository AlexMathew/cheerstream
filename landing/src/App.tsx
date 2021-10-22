import React from "react";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import { Intro } from "./components/Intro";
import { Screenshots } from "./components/Screenshots";
// import { Summary } from "./components/Summary";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">
        <Intro />
        {/* <Summary /> */}
        <Screenshots />
      </main>
      <Footer />
    </>
  );
};

export default App;
