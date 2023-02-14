import React from "react";
import { useDropzone } from "react-dropzone";
import Container from "./container";

const DropBox = ({ className, onChange }: any) => {
  let fileReader: FileReader;

  const handleFileRead = () => {
    const content = fileReader.result;
    onChange(content);
  };

  const onDrop = React.useCallback((acceptedFiles: any) => {
    // Do something with the files
    if (!acceptedFiles.length) return;
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`flex w-full items-center justify-center ${
        className ? className : ""
      }`}
    >
      <label
        htmlFor="dropzone-file"
        className={`${
          isDragActive
            ? "border-gray-500  bg-gray-700"
            : "border-gray-600  bg-gray-800"
        } flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed  border-gray-600  bg-gray-800 hover:border-gray-500  hover:bg-gray-700`}
        {...getRootProps()}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="mb-3 h-10 w-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-base text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-sm text-gray-400">XML, JSON, HTML or TXT</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          {...getInputProps()}
        />
      </label>
    </div>
  );
};

type Props = {
  onSubmit: (links: string[]) => void;
};

export default function Input({ onSubmit }: Props) {
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleParse = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    };
    setLoading(true);
    fetch("/api/parse", requestOptions)
      .then((response) => response.json())
      .then((parseLinks: string[]) => {
        setLoading(false);
        setContent("");
        onSubmit(parseLinks);
      });
  };

  return (
    <>
      <Container className=" mt-20 flex flex-wrap">
        <div className="group relative w-full">
          <div className="absolute -inset-0.5 animate-tilt rounded-lg  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  opacity-75  blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>

          <div className="relative w-full rounded-lg border-gray-700 bg-slate-900 p-10 shadow">
            <label
              htmlFor="links"
              className="mb-2 block text-xl font-medium text-white"
            >
              Your links
            </label>
            <textarea
              id="links"
              rows={4}
              spellCheck="false"
              className="text-body block w-full rounded-lg border-2 border-gray-600 bg-gray-800 p-2.5 text-white placeholder-gray-400 focus:border-blue-500  focus:ring-blue-500 dark:focus:ring-blue-500"
              placeholder="Paste your list of URLs/links you want to test..."
              onChange={(event) => setContent(event.target.value)}
              value={content}
            ></textarea>
            <p className="text-md mt-2 text-gray-400">
              Hint: you can export browser bookmarks and ingest it to the tool
            </p>

            <DropBox className="mb-10 mt-10" onChange={setContent} />

            <div className="flex justify-start">
              <button
                onClick={() => {
                  handleParse();
                }}
                disabled={content.length < 1 || loading}
                className="flex items-center rounded-md bg-indigo-600 px-8 py-4 text-center text-lg font-medium text-white opacity-90 hover:opacity-100 disabled:opacity-75"
              >
                {loading ? (
                  <span className="flex">
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>{" "}
                    Loading...
                  </span>
                ) : (
                  <span>Parse</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
