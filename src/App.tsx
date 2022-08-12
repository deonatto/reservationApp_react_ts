import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Hotels from "./views/hotels/Hotels";
import Hotel from "./views/hotel/Hotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/hotels" element={<Hotels/>} />
        <Route path="/hotels/:id" element={<Hotel/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
