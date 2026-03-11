import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InputPage from "./pages/InputPage";
import OutputPage from "./pages/OutputPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/input" />} />

        {/* Input terminal */}
        <Route path="/input" element={<InputPage />} />

        {/* Output terminal */}
        <Route path="/output" element={<OutputPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;