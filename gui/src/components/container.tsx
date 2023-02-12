import React from "react";

export default function Container(props: any) {
  return (
    <div
      className={`container mx-auto p-8 text-white xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
}
