import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Hotels from "./views/hotels/Hotels";
import Hotel from "./views/hotel/Hotel";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/hotels/:destination" element={<Hotels/>} />
        <Route path="/hotel/:id" element={<Hotel/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
