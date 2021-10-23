import React from "react";

interface IntroProps {}

export const Intro: React.FC<IntroProps> = () => {
  return (
    <div className="px-7 lg:px-0 m-auto mt-20 text-center">
      <h1 className="mx-auto font-bold text-3xl md:text-5xl">
        Live sports and tweets — all in one screen
      </h1>
      <p className="max-w-6xl sm:max-w-screen-sm mx-auto font-normal opacity-60 mt-7 text-lg md:text-2xl">
        Twickr brings you live tweets from top Twitter accounts on the same
        screen as your live sports on Hotstar.
      </p>
      <div className="mt-8 flex flex-col md:flex-row justify-center items-center">
        <a
          href="https://chrome.google.com/webstore/detail/twickr-for-hotstar/ohjenobipjkabhgcfhglplhaeagjlgdn/"
          target="_blank"
          rel="noopener noreferrer"
          draggable="false"
          className="inline-block text-white btn text-base leading-8 hover:scale-98 active:scale-95 noselect w-40"
        >
          Add to Chrome
        </a>
        <a
          href="https://www.producthunt.com/posts/twickr-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-twickr-2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 md:mt-0 md:ml-8"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=316968&theme=dark"
            alt="Twickr - Add live tweets to your sports streams on Hotstar | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            width="250"
            height="54"
          />
        </a>
      </div>
    </div>
  );
};
