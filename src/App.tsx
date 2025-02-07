import { DarkThemeToggle } from "flowbite-react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Desplay from "./Desplay";
import Hero from "./Hero";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/desplay" element={<Desplay />} />
      <Route path="/hero" element={<Hero />} />
    </Routes>
  </>
  );
}

export default App;
