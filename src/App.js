import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Propiedad from "./pages/Propiedad";
import RegistrarPropiedad from "./pages/RegistrarPropiedad";
import FichaTecnica from "./pages/FichaTecnica";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/propiedad/:id" element={<Propiedad />}></Route>
          <Route
            path="/registrar-propiedad"
            element={<RegistrarPropiedad />}
          ></Route>
          <Route path="/ficha-tecnica/:id" element={<FichaTecnica />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
