import React from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="top-0 z-30 h-16 bg-skin-fill bg-opacity-60 backdrop-filter firefox:bg-opacity-90 backdrop-blur-xl px-10 py-10 lg:mx-32">
      <div className="flex items-center justify-between h-full md:mx-auto">
        <div className="cursor-pointer flex items-center justify-between">
          <img
            className="h-24 mt-6"
            src="/logo192_with_text.png"
            alt="Twickr"
            draggable="false"
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-36">
            <a
              href="https://chrome.google.com/webstore/detail/twickr-for-hotstar/ohjenobipjkabhgcfhglplhaeagjlgdn/"
              target="_blank"
              rel="noopener noreferrer"
              draggable="false"
              className="btn hover:scale-98 active:scale-95 w-36 text-base md:grid place-content-center hidden noselect"
            >
              Add to Chrome
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
