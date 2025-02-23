import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente funcional que permite agregar nuevos empleados.
 * Utiliza React Hooks para manejar el estado y React Router para la navegación.
 */
export default function EditEmployees() { 
    // Hook de navegación para redirigir al usuario después de enviar el formulario
    let navigate = useNavigate();

    /**
     * Estado local para almacenar los datos del empleado.
     * Se inicializa con valores vacíos.
     */
    const [employee, setEmployee] = useState({
        name: "",
        department: "",
        salary: ""
    });
    // Desestructuración del estado para facilitar su uso en los inputs
    const { name, department, salary } = employee;
    /**
     * Maneja los cambios en los campos del formulario.
     * 
     * @param {Object} e - Evento del input.
     */
    const onInputChange = (e) => {
        // Actualiza el estado del empleado con el nuevo valor ingresado en el campo correspondiente
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    /**
     * Maneja el envío del formulario.
     * 
     * @param {Object} e - Evento del formulario.
     */
    const onSubmit = async (e) => {
        e.preventDefault(); // Previene la recarga de la página

        // URL del backend donde se enviarán los datos del empleado
        const urlBackend = "http://localhost:8080/rh-app/employee-add";
        
        try {
            // Enviar datos al backend mediante una petición POST
            await axios.post(urlBackend, employee);
            
            // Redirigir al usuario a la página principal después de agregar el empleado
            navigate("/");
        } catch (error) {
            console.error("Error al agregar el empleado:", error);
        }
    };

    return (
        <div className='container'>
            {/* Título de la página */}
            <div className='text-center' style={{ margin: "30px" }}>
                <h3>Edit Employee</h3>
            </div>
            
            {/* Formulario para agregar empleados */}
            <form onSubmit={onSubmit}>
                {/* Campo de entrada para el nombre del empleado */}
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
                
                {/* Campo de entrada para el departamento del empleado */}
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
                
                {/* Campo de entrada para el salario del empleado */}
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
                
                {/* Botones de acción */}
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Save</button>
                    <a href="/" className='btn btn-danger btn-sm'>Back</a>
                </div>
            </form>
        </div>
    );
}
