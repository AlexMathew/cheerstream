import React, { useState } from "react";

interface ScreenshotsProps {}

export const Screenshots: React.FC<ScreenshotsProps> = () => {
  const [selected, setSelected] = useState<string>("cricket");

  const selectSport = (sport: string) => {
    setSelected(sport);
  };

  return (
    <section className="summary mt-16 flex flex-col pt-10 pb-8 mx-4 md:mt-lg rounded-xl md:items-center md:flex-row">
      <h2 className="md:hidden text-3xl leading-9 text-center font-bold max-w-xs md:mx-8 mx-auto">
        Live sports and tweets — all in one screen
      </h2>
      <div className="mt-10 md:mt-4 md:mr-10">
        <div className="relative flex flex-col items-center justify-center pb-8 ml-auto mr-auto w-full max-w-5xl pl-8 pr-8">
          <div className="relative flex flex-col w-full max-w-3xl p-6 border motion-safe:transition-shadow rounded-3xl hover:shadow-none hover:shadow-lg border-geistGray-200 shadow-none bg-black border-geistGray-700">
            <div className="absolute top-0 left-0 w-full h-full max-w-3xl border border-geistGray-700 border-geistGray-200 bg-black rounded-3xl"></div>
            <div className="block z-10">
              <img
                className="w-full h-full"
                src={`/screenshots/${selected}.png`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-lg px-7 md:pl-6 md:py-5 lg:pl-0">
        <h2 className="md:text-3xl text-xl font-bold leading-10 drop-shadow hidden md:block">
          Live sports and tweets — all in one screen
        </h2>
        <p className="leading-6 text-lg md:pt-6 md:text-xl opacity-80">
          Twickr lets you live stream tweets while watching live sports on
          Hotstar
        </p>
        <div className="inline-flex flex-col items-start mt-8 space-y-4 ">
          <div>
            <button
              className={`tab-title text-xl font-semibold opacity-60 hover:opacity-80 ${
                selected === "cricket" ? "opacity-100 font-bold" : ""
              }`}
              onClick={() => selectSport("cricket")}
            >
              Cricket
            </button>
          </div>
          <div>
            <button
              className={`tab-title text-xl font-semibold opacity-60 hover:opacity-80 ${
                selected === "football" ? "opacity-100 font-bold" : ""
              }`}
              onClick={() => selectSport("football")}
            >
              Football
            </button>
          </div>
          <div>
            <button
              className={`tab-title text-xl font-semibold opacity-60 hover:opacity-80 ${
                selected === "f1" ? "opacity-100 font-bold" : ""
              }`}
              onClick={() => selectSport("f1")}
            >
              Formula 1
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
