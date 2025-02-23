import AddEmployees from "./employees/AddEmployees"
import EditEmployees from "./employees/EditEmployees"
import ListEmployees from "./employees/ListEmployees"
import Navigation from "./template/Navigation"
import {BrowserRouter, Route, Routes} from "react-router-dom"

// npm i react-router-dom (para hacer el tema de rutas)

function App() {
  return (
      <div className="container"> 
      <BrowserRouter>
        <Navigation /> 
        <Routes>
          <Route exact path="/" element={<ListEmployees />}/>
          <Route exact path="/employee-add" element={<AddEmployees/>}/>
          <Route exact path="/employee/:id" element={<EditEmployees/>}/>
        </Routes>
      </BrowserRouter>
      </div>
   
  )
}
export default App
