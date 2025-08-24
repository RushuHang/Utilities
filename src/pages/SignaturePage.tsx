import { useForm, type SubmitHandler } from "react-hook-form";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { toast } from "react-toastify";

type FormValues = {
  clientID: string;
  uri: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  timeStamp: string;
  body: string;
  clientPrivateKey: string;
};

export default function SignaturePage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [signature, setSignature] = useState("");
  const [copied, setCopied] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("okoko");
    let parsedBody: unknown = data.body;
    try {
      parsedBody = data.body?.trim() ? JSON.parse(data.body) : {};
    } catch {
      toast.error("Invalid JSON in Body");
      return;
    }
    const payload = {
      requestURI: data.uri,
      httpMethod: data.method.toUpperCase(),
      clientUniqueId: data.clientID,
      time: data.timeStamp,
      body: JSON.parse(data.body),
      clientPrivateKey: data.clientPrivateKey,
    };
    try {
      const res = await fetch(
        "http://10.0.22.4:8001/api/utils/signature/generate",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        throw new Error("could not generate");
      }
      const json = await res.json();
      setSignature(json.Signature);
      toast.success("Signature Generated");
    } catch (err) {
      toast.error("Unable to fetch");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(signature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Signature Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="clientID">*Client ID</label>
            <input
              id="clientID"
              type="text"
              {...register("clientID")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="uri"
              className="block text-bold font-medium text-gray-700"
            >
              *Uri
            </label>
            <input
              id="uri"
              type="text"
              {...register("uri")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="method"
              className="block text-bold font-medium text-gray-700"
            >
              *Method
            </label>
            <select
              id="method"
              {...register("method", { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            >
              <option value="">--Select a Method--</option>
              <option value="get">GET</option>
              <option value="post">POST</option>
              <option value="PUT">PUT</option>
              <option value="patch">PATCH</option>
              <option value="delete">DELETE</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="timeStamp"
              className="block text-sm font-bold text-gray-700 "
            >
              <sup className="text-red-500">*</sup>Time Stamp
            </label>
            <input
              id="timeStamp"
              type="datetime-local"
              {...register("timeStamp")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-bold font-medium text-gray-700"
            >
              *Body:
            </label>
            <textarea
              id="body"
              {...register("body", { required: true, maxLength: 10000 })}
              rows={5}
              cols={40}
              placeholder="Type your message here..."
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <div>
            <label htmlFor="clientPrivateKey">*Client Private Key</label>
            <textarea
              id="clientPrivateKey"
              {...register("clientPrivateKey", {
                required: true,
                maxLength: 10000,
              })}
              rows={5}
              cols={40}
              placeholder="Type your private key here..."
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-sctblue-600 px-4 py-2 text-white font-medium shadow hover:bg-sctblue-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Generate Signature
          </button>

          <div className="relative">
            <label
              htmlFor="generatedSignature"
              className="block text-bold font-medium text-gray-700"
            >
              Generated Signature:
            </label>
            <textarea
              id="generatedSignature"
              value={signature}
              readOnly
              rows={5}
              cols={20}
              placeholder=""
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className="absolute top-35 right-2 text-gray-500 hover:text-sky-600"
              title="Copy to clipboard"
            >
              <ContentCopyIcon
                fontSize="small"
                sx={{ color: "var(--color-sctblue-600)" }}
              />
            </button>
            {copied && (
              <p className="text-green-600 text-sm mt-1">
                Copied to clipboard!
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
