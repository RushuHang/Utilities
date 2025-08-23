import { useForm } from "react-hook-form";

export default function SignaturePage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Signature Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <option value="post">Post</option>
              <option value="patch">Patch</option>
              <option value="get">Get</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-bold font-medium text-gray-700"
            >
              *Url
            </label>
            <input
              id="url"
              type="text"
              {...register("url")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="timeStamp"
              className="block text-sm font-bold text-gray-700 "
            >
              *Time Stamp
            </label>
            <input
              id="timeStamp"
              type="date"
              {...register("timeStamp")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-bold font-medium text-gray-700"
            >
              Body:
            </label>
            <textarea
              id="body"
              {...register("body", { required: true, maxLength: 500 })}
              rows={5}
              cols={40}
              placeholder="Type your message here..."
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-sctblue-600 px-4 py-2 text-white font-medium shadow hover:bg-sctblue-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
