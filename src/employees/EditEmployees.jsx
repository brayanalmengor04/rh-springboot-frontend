import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
/**
 * Componente funcional que permite editar los datos de un empleado.
 * Utiliza React Hooks para manejar el estado y React Router para la navegación.
 */
export default function EditEmployees() { 
    const urlBackend = "http://localhost:8080/rh-app/employee";   
    let navigate = useNavigate();
    const { id } = useParams(); // Obtiene el id de la URL

    const [employee, setEmployee] = useState({
        name: "",
        department: "",
        salary: ""
    });

    const { name, department, salary } = employee;

    useEffect(()=>{
        loadEmployee();
    },[])

    const loadEmployee = async () => {
        const result = await axios.get(`${urlBackend}/${id}`) 
        setEmployee(result.data);
    }
  
    const onInputChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar datos al backend mediante una petición PUT
            await axios.put(`${urlBackend}/${id}`, employee);
            navigate("/"); // Redirige al listado de empleados
        } catch (error) {
            console.error("Error al editar el empleado:", error);
        }
    };

    return (
        <div className='container'>
            <div className='text-center' style={{ margin: "30px" }}>
                <h3>Edit Employee</h3>
            </div>
            
            {/* Formulario para editar el empleado */}
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        required
                        value={name} 
                        onChange={onInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="department" 
                        name="department"
                        required
                        value={department} 
                        onChange={onInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input 
                        type="number" 
                        step="any" 
                        className="form-control" 
                        id="salary" 
                        name="salary"
                        required
                        value={salary} 
                        onChange={onInputChange}
                    />
                </div>

                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Save</button>
                    <a href="/" className='btn btn-danger btn-sm'>Back</a>
                </div>
            </form>
        </div>
    );
}
