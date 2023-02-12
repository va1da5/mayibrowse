import React from "react";
import Container from "./container";
import { HiOutlineTrash } from "react-icons/hi2";

const errors: { [key: string]: string } = {
  TIMEOUT: "Request failed due to timeout",
  DNS: "Domain name resolution failed",
  REFUSED: "Connection refused",
};

type ItemProps = {
  url: string;
  onDelete: (link: string) => void;
  status: Status;
};

const Item = ({ url, onDelete, status }: ItemProps) => {
  onDelete = onDelete || (() => {});

  return (
    <li
      key={url}
      className="m-4 flex justify-between rounded-md bg-gray-800 p-5"
    >
      <span className="flex items-center gap-3 text-lg">
        <span
          className={`relative mr-5 inline-block h-5 w-5 ${
            status?.loading ? "animate-pulse bg-gray-500" : ""
          } ${status?.blocked === true ? "bg-red-700" : ""} ${
            status?.blocked === false ? "bg-green-700" : ""
          }
          ${
            status?.blocked === undefined && !status?.loading
              ? "bg-gray-700"
              : ""
          }
          rounded-3xl `}
        ></span>
        <span>{url}</span>
        {status?.time ? (
          <div className="text-gray-400"> {status?.time}ms</div>
        ) : null}

        {status?.error?.length ? (
          <div className="text-gray-400">{errors[status?.error]}</div>
        ) : null}
      </span>
      <button
        onClick={() => {
          onDelete(url);
        }}
      >
        <HiOutlineTrash className="text-3xl text-gray-400 hover:text-indigo-500" />
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

type Status = {
  loading: boolean;
  blocked?: boolean;
  error?: string;
  time?: number;
};

export default function List({ links, onDelete }: Props) {
  onDelete = onDelete || (() => {});
  const [timeout, setTimeout] = React.useState(15);
  const [statusMap, setStatusMap] = React.useState<{ [key: string]: Status }>(
    {}
  );

  const handleAnalyze = () => {
    links.forEach((link: string) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link, timeout }),
      };
      const tmp: { [key: string]: Status } = {};
      tmp[link] = { loading: true };

      setStatusMap((current) => ({ ...current, ...tmp }));
      fetch("/api/check", requestOptions)
        .then((response) => response.json())
        .then((status) => {
          const tmp: { [key: string]: Status } = {};
          tmp[link] = { loading: false, ...status };
          setStatusMap((current) => ({ ...current, ...tmp }));
        });
    });
  };

  return (
    <>
      <Container className="mt-20 flex flex-wrap ">
        <div className="m-4 flex w-full items-center justify-between rounded-md  bg-slate-800 p-6">
          <Button onClick={handleAnalyze} />
          <div className="ml-1 flex ">
            <div className="flex flex-col items-end">
              <div className=" text-4xl">{links.length}</div>
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
          {links.map((url: string) => (
            <Item
              key={url}
              url={url}
              onDelete={onDelete}
              status={statusMap[url]}
            />
          ))}
        </ul>
      </Container>
    </>
  );
}
