import React from "react";
import Header from "./components/Header";
import { Intro } from "./components/Intro";
import { Summary } from "./components/Summary";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">
        <Intro />
        <Summary />
      </main>
    </>
  );
};

export default App;
