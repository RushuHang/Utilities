import { useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [data, setData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const beautify = () => {
    try {
      const obj = JSON.parse(input);
      setData(obj);
      setInput(JSON.stringify(obj, null, 2));
      setError(null);
      setShowPreview(true);
    } catch (e: any) {
      setError("Not a valid JSON");
      setData(null);
      setShowPreview(false);
    }
  };

  const minify = () => {
    try {
      const obj = JSON.parse(input);
      setInput(JSON.stringify(obj));
      setData(obj);
      setError(null);
      setShowPreview(true);
    } catch (e: any) {
      setError("Not a valid JSON");
      setData(null);
      setShowPreview(false);
    }
  };

  return (
    <div className="p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON Here"
        className="w-full h-48 p-3 sborder rounded font-mono border-1 border-black"
      ></textarea>
      <div className="mt-2 flex gap-2">
        <button
          onClick={beautify}
          className="px-3 py-2 bg-sctblue-600 text-white rounded hover:bg-sctblue-400"
        >
          Beautify
        </button>
        <button
          onClick={minify}
          className="px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Minify
        </button>
      </div>
      {error && <p className="mt-3 text-red-600 ">{error}</p>}
      {showPreview && (
        <div className="mt-4 bg-white rounded shadow p-3 overflow-auto">
          <JSONPretty data={data ?? input} />
        </div>
      )}
    </div>
  );
}
