// rfc (sniper extension)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListEmployees() {
  /**
   * URL del backend donde se encuentra el endpoint de empleados.
   * Se asume que el backend está corriendo en `localhost:8080`.
   */
  const urlBackend = "http://localhost:8080/rh-app/employees";

  /**
   * Estado que almacena la lista de empleados obtenidos del backend.
   * Inicialmente, se define como un arreglo vacío.
   */
  const [employees, setEmployees] = useState([]);

  /**
   * useEffect se ejecuta cuando el componente se monta.
   * Llama a la función `loadEmployees` para obtener la lista de empleados.
   * El segundo argumento es un arreglo vacío `[]`, lo que indica que el efecto
   * solo se ejecutará una vez al renderizar el componente.
   */
  useEffect(() => {
    loadEmployees();
  }, []);

  /**
   * Función asíncrona encargada de obtener los empleados desde el backend.
   * Utiliza `axios.get` para realizar una petición HTTP GET a la API.
   * Una vez obtenida la respuesta, actualiza el estado `employees` con los datos recibidos.
   */
  const loadEmployees = async () => {
    try {
      const result = await axios.get(urlBackend);
      setEmployees(result.data);
    } catch (error) {
      console.error("Error al cargar los empleados:", error);
    }
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>System Employees Resources!</h3>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Employee</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Iteramos el arreglo de empleados */}
          {employees.map((employee, index) => (
            <tr key={index}>
              <th scope="row">{employee.id}</th>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>
                <NumericFormat
                  value={employee.salary}
                  displayType={"text"}
                  thousandSeparator=","
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale
                />
              </td>
              <td className="text-center">
                <div>
                  <Link
                    to={`/employee/${employee.id}`}
                    className="btn btn-warning btn-sm me-3"
                  >
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
