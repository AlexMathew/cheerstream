import React from "react";
import Header from "./components/Header";
import { Intro } from "./components/Intro";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">
        <Intro />
      </main>
    </>
  );
};

export default App;
