import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Desplay from "./Desplay";
import Hero from "./Hero";
import Vedio from "./Vedio";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/desplay" element={<Desplay />} />
      <Route path="/hero" element={<Hero />} />
      <Route path="/vedio" element={<Vedio />} />
    </Routes>
  </>
  );
}

export default App;
