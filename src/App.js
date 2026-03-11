import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InputPage from "./pages/InputPage";
import OutputPage from "./pages/OutputPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;