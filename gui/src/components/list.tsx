import React from "react";
import Container from "./container";
import { HiOutlineTrash } from "react-icons/hi2";

type ItemProps = {
  data: EntryStatus;
  loading: boolean;
  onDelete: (link: string) => void;
};

const Item = ({ data, onDelete, loading }: ItemProps) => {
  onDelete = onDelete || (() => {});

  return (
    <li className="m-4 flex justify-between rounded-md bg-gray-800 p-5">
      <span className="flex items-center gap-3 text-lg">
        <span
          className={`relative mr-5 inline-block h-5 w-5 ${
            loading ? "animate-pulse bg-gray-500" : ""
          } ${data?.blocked === true ? "bg-red-700" : ""} ${
            data?.blocked === false ? "bg-green-700" : ""
          }
          ${data?.blocked === undefined && !loading ? "bg-gray-700" : ""}
          rounded-3xl`}
        ></span>
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400"
        >
          {data.link}
        </a>
        {data?.time ? (
          <div className="text-gray-400"> {data?.time}ms</div>
        ) : null}

        {data?.error?.length ? (
          <div className="text-gray-400">{data?.error}</div>
        ) : null}
      </span>
      <button
        onClick={() => {
          onDelete(data.link);
        }}
      >
        <HiOutlineTrash className="text-3xl text-gray-400 hover:text-indigo-400" />
      </button>
    </li>
  );
};

const Button = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-center text-xl font-medium text-white opacity-90 hover:opacity-100"
    >
      Analyze
    </button>
  );
};

type Props = {
  links: string[];
  onDelete: (link: string) => void;
};

type EntryStatus = {
  domain: string;
  link: string;
  blocked?: boolean;
  error?: string;
  time?: number;
};

export default function List({ links, onDelete }: Props) {
  onDelete = onDelete || (() => {});
  const [timeout, setTimeout] = React.useState(15);
  const [entries, SetEntries] = React.useState<{ [key: string]: EntryStatus }>(
    {}
  );
  const [loading, setLoading] = React.useState(false);

  const handleAnalyze = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        urls: Object.values(entries).map((entry) => entry.link),
        timeout,
      }),
    };

    setLoading(true);
    fetch("/api/check", requestOptions)
      .then((response) => response.json())
      .then((status) => {
        Object.keys(status).forEach((domain) => {
          SetEntries((current) => {
            return {
              ...current,
              [domain]: { ...current[domain], ...status[domain] },
            };
          });
        });
        setLoading(false);
      });
  };

  React.useEffect(() => {
    SetEntries(
      links.reduce((out, link) => {
        const url: URL = new URL(link);
        const domain = url.hostname;

        return {
          ...out,
          [domain]: {
            domain,
            link,
            blocked: undefined,
            error: "",
            time: 0,
          },
        };
      }, {})
    );
  }, [links]);

  return (
    <>
      <Container className="mt-20 flex flex-wrap ">
        <div className="m-4 flex w-full items-center justify-between rounded-md  bg-slate-800 p-6">
          <Button onClick={handleAnalyze} />
          <div className="ml-1 flex ">
            <div className="flex flex-col items-end">
              <div className=" text-4xl">{Object.keys(entries).length}</div>
              <div className="mt-1 text-sm uppercase text-gray-400">Count</div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="mr-10 flex h-full flex-col items-end">
              <input
                type="number"
                id="timeout"
                className="block w-20 rounded-lg  border border-gray-600 bg-gray-700 p-1 pl-2 text-2xl text-white  placeholder-gray-400  focus:border-blue-500 focus:ring-blue-500"
                value={timeout}
                onChange={(event) => setTimeout(parseInt(event.target.value))}
                required
              />
              <label
                htmlFor="timeout"
                className="mt-1.5 block text-sm font-medium  uppercase text-gray-400"
              >
                Request Timeout
              </label>
            </div>
          </div>
        </div>
        <ul className="w-full flex-row ">
          {Object.values(entries).map((entry: EntryStatus) => (
            <Item
              key={entry.domain}
              data={entry}
              onDelete={onDelete}
              loading={loading}
            />
          ))}
        </ul>
      </Container>
    </>
  );
}
