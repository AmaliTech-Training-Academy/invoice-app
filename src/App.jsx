import { useState,useEffect } from "react";
import Nav from "./components/Home/Nav/Nav";
import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";
import CreateInvoice from "./components/createInvoice/CreateInvoice";
import Edit from "./components/editInvoiceForm/Edit";
import Viewinvoice from "./pages/Viewinvoice";
import Home from "./pages/Home";
import {Routes,Route} from "react-router-dom"

import Viewinvoice from "./pages/Viewinvoice"


function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 
   
  return (

    <div className={`App ${darkMode ? 'dark' : 'light'} lg:flex`}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

      <Routes>
      <Route path="/" exact element={<Home darkMode={darkMode}/>} />
      <Route path="/viewinvoice/:id"  element={<ViewInvoice/>} />
    </Routes>
      </div>

  );
}


export default App;
