import React from "react";
import Container from "./container";
import heroImg from "../assets/undraw_connected_world_transprent.svg";

type Props = {
  onClick: () => void;
};

export default function Hero({ onClick }: Props) {
  onClick = onClick || (() => {});

  return (
    <>
      <Container className="mt-20 flex flex-wrap">
        <div className="flex w-full items-center lg:w-1/2">
          <div className="mb-8  max-w-2xl">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Discover the accessibility of your favorite webpages
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-300 lg:text-xl xl:text-2xl">
              This user-friendly application enables you to check the
              accessibility of your favorite websites. It helps determine if any
              of your preferred sites are being blocked by your corporate proxy
              or other network devices.
            </p>
            <div className="relative flex flex-col items-start space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <button
                className="rounded-md bg-indigo-600 px-8 py-4 text-center text-lg font-medium text-white "
                onClick={onClick}
              >
                Let's find out
              </button>
            </div>
          </div>
        </div>
        <div className="relative isolate flex w-full items-center justify-center lg:w-1/2">
          <div className="absolute top-5 -left-10 h-3/4 w-3/4 animate-blob rounded-full bg-fuchsia-900 opacity-30 mix-blend-multiply blur-3xl filter"></div>
          <div className="animation-delay-2000 absolute top-3 -right-10 h-3/4 w-2/4 animate-blob rounded-full bg-violet-900 opacity-30 mix-blend-multiply blur-3xl filter"></div>
          <div className="animation-delay-4000 left-50 absolute bottom-5 h-2/4 w-2/4 animate-blob rounded-full bg-sky-900 opacity-30 mix-blend-multiply blur-3xl filter"></div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
              className="h-auto max-w-full"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
