import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import SignaturePage from "./pages/SignaturePage";
import JsonFormatter from "./components/JsonFormatter";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="signature" element={<SignaturePage />}></Route>
          <Route path="jsonformatter" element={<JsonFormatter />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
