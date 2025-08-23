export default function Footer() {
  return (
    <footer className="w-full mt-auto py-2 backdrop-blur bg-gray-300 text-center text-xs mb-0">
      <div className="lg:flex gap-2 items-center justify-center">
        <p>
          Powered By{" "}
          <a
            href="https://sct.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:underline text-sctblue-400 text-sm"
          >
            Smart Choice Technologies Ltd.
          </a>{" "}
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
