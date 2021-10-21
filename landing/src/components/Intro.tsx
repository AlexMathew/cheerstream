import React from "react";

interface IntroProps {}

export const Intro: React.FC<IntroProps> = () => {
  return (
    <div className="px-7 lg:px-0 m-auto mt-20 text-center">
      <h1 className="mx-auto font-bold text-3xl md:text-5xl">
        Live sports and tweets — all in one screen
      </h1>
      <p className="max-w-6xl sm:max-w-screen-sm mx-auto font-normal opacity-60 mt-7 text-lg md:text-2xl">
        Twickr lets you live stream tweets while watching live sports on Hotstar
      </p>
      <a
        href="https://chrome.google.com/webstore/detail/twickr-for-hotstar/ohjenobipjkabhgcfhglplhaeagjlgdn/"
        target="_blank"
        rel="noopener noreferrer"
        draggable="false"
        className="inline-block text-white mt-8 btn text-base leading-8 hover:scale-98 active:scale-95 noselect w-40"
      >
        Add to Chrome
      </a>
    </div>
  );
};
