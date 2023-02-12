import React from "react";
import Container from "./container";

type Props = {
  onClick: () => void;
};

export default function Header({ onClick }: Props) {
  return (
    <>
      <Container className="flex w-full flex-wrap">
        <button
          onClick={onClick}
          className="bg-gradient-to-r from-violet-300 to-violet-700 bg-clip-text text-3xl font-bold uppercase text-transparent"
        >
          May I Browse?
        </button>
      </Container>
    </>
  );
}
