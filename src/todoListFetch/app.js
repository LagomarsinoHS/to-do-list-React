import React, { useState, useEffect } from "react";

const USUARIO_URL = "https://assets.breatheco.de/apis/fake/todos/user/LagomarsinoHS";

export const App = () => {
    const [tareas, setTareas] = useState([]);
    const [apiError, setApiError] = useState(null);

    const handleFetchError = (error) => {
        console.error("API error:", error);
        setApiError("No se pudo conectar con el servidor. Los cambios se guardan solo en pantalla.");
    };

    const getData = () => {
        return fetch(USUARIO_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.msg) {
                    return createData();
                }
                setTareas(Array.isArray(data) ? data : []);
                setApiError(null);
            })
            .catch(handleFetchError);
    };

    const createData = () => {
        return fetch(USUARIO_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.result) {
                    return getData();
                }
            })
            .catch(handleFetchError);
    };

    const updateData = (newData) => {
        return fetch(USUARIO_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.msg === "The request body is empty but it must be an array of todo's") {
                    return updateData([{ label: "sample task", done: false }]);
                }
                return getData();
            })
            .catch(handleFetchError);
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const insertarTarea = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            const label = e.target.value;
            const newTareas = tareas.concat({ label, done: false });
            setTareas(newTareas);
            e.target.value = "";
            updateData(newTareas);
        }
    };

    const eliminarTarea = (_, i) => {
        const nuevaData = tareas.filter((_, tareaIndice) => tareaIndice !== i);
        setTareas(nuevaData);
        updateData(nuevaData);
    };

    const deleteAll = () => {
        fetch(USUARIO_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(() => getData())
            .catch(() => {
                setTareas([]);
                handleFetchError(new Error("delete failed"));
            });
    };

    return (
        <div className="container bg-secondary rounded">
            <div className="row mt-5">
                <div className="col-md-6 text-center mx-auto mt-3">
                    <h1 className="text-white">TO-DO List</h1>
                </div>
            </div>

            {apiError && (
                <div className="row mt-3">
                    <div className="col-md-6 mx-auto">
                        <div className="alert alert-warning mb-0" role="alert">
                            {apiError}
                        </div>
                    </div>
                </div>
            )}

            <div className="row mt-3">
                <div className="col-md-6 mx-auto">
                    <div className="card text-center mb-5">
                        <div className="card-header">
                            <input
                                autoFocus
                                id="input"
                                type="text"
                                className="form-control"
                                placeholder="¿Qué se necesita hacer?"
                                onKeyDown={insertarTarea}
                            />
                        </div>
                        <div className="card-body">
                            <ul className="list-group text-start">
                                {tareas.length > 0 &&
                                    tareas.map((ele, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item"
                                            onClick={() => eliminarTarea(null, index)}
                                        >
                                            {index + 1} - {ele.label}
                                            <i id="eliminar" className="fas fa-times"></i>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="card-footer text-muted text-start">
                            {tareas.length} item restantes.
                            <button type="button" className="btn btn-danger float-end" onClick={deleteAll}>
                                Eliminar Todo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
