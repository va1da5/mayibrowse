import { Component, useState } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import Input from "./components/input";
import List from "./components/list";

function App() {
  const [section, setSection] = useState("hero");
  const [links, setLinks] = useState<string[]>([]);

  const handleOnInputSubmit = (links: string[]) => {
    links.sort();
    setLinks(links);
    setSection("list");
  };

  const handleOnLinkDelete = (link: string) => {
    setLinks(links.filter((item) => item !== link));
  };

  return (
    <>
      <Header onClick={() => setSection("hero")} />
      {section == "hero" ? (
        <Hero
          onClick={() => {
            setSection("input");
          }}
        />
      ) : null}

      {section == "input" ? <Input onSubmit={handleOnInputSubmit} /> : null}

      {section == "list" ? (
        <List links={links} onDelete={handleOnLinkDelete} />
      ) : null}
    </>
  );
}

export default App;
