import React from "react";

interface SummaryProps {}

export const Summary: React.FC<SummaryProps> = () => {
  return (
    <section className="summary mt-20 flex flex-col pt-10 pb-8 mx-4 md:mt-lg rounded-xl md:items-center md:flex-row">
      <h2 className="md:hidden text-3xl leading-9 text-center font-bold max-w-xs md:mx-8 mx-auto">
        Live sports and tweets — all in one screen
      </h2>
      <div className="mt-10 md:mt-0 md:mr-10 mb-4">
        <img src="/screenshots/cricket.png" alt="" />
      </div>
      <div className="max-w-lg px-7 md:pl-6 md:py-5 lg:pl-0">
        <h2 className="md:text-5xl text-3xl font-bold leading-10 drop-shadow hidden md:block">
          Live sports and tweets — all in one screen
        </h2>
        <p className=" leading-6 text-lg md:pt-6 md:text-2xl opacity-60">
          Twickr lets you live stream tweets while watching live sports on
          Hotstar
        </p>
        <a
          href="https://chrome.google.com/webstore/detail/twickr-for-hotstar/ohjenobipjkabhgcfhglplhaeagjlgdn/"
          target="_blank"
          rel="noopener noreferrer"
          draggable="false"
          className="inline-block text-white mt-8 btn btn-secondary text-base hover:scale-98 active:scale-95 noselect w-36"
        >
          Add to Chrome
        </a>
      </div>
    </section>
  );
};
