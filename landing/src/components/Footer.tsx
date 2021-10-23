import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex items-center justify-center mt-16 md:mt-24 mx-4 md:mx-32 h-16 border-t border-solid border-white font-medium text-base md:text-lg">
      <h3>
        Built for the love of live sports by{" "}
        <span>
          <a
            className=" underline"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/alxmth03/"
          >
            Alex Mathew
          </a>
        </span>
      </h3>
    </footer>
  );
};
