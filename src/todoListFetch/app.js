import React, { useState, useEffect } from "react";

export const App = () => {

    const usuarioUrl = "https://assets.breatheco.de/apis/fake/todos/user/LagomarsinoHS";

    const [state, setState] = useState({
        tareas: []
    })

    useEffect(() => {
        getData(usuarioUrl);

    }, [])


    const getData = (url) => {
        fetch(url).
            then((resolve) => {
                return resolve.json()
            })
            .then((data) => {
                if (data.msg) {
                    console.log("get", data)
                    createData();
                } else {
                    console.log("get3", data);
                    setState(prevState => {
                        return { ...prevState, tareas: data };
                    });
                }
            })
    }

    const createData = () => {
        let opciones = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        }
        fetch(usuarioUrl, opciones)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    console.log("create:", data);
                    getData(usuarioUrl);
                }
            })
    }
    const insertarTarea = (e) => {
        if (e.target.value !== "" && e.key === "Enter") {
            let newData = {
                tareas: state.tareas.concat({ label: e.target.value, done: false })
            }
            setState(prevState => {
                return { ...prevState, ...newData }
            })
            e.target.value = ""
            updateData(newData.tareas);
        }
    }

    const updateData = (newData = []) => {
        let opciones = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        }
        fetch(usuarioUrl, opciones)
            .then((resolve) => {
                return resolve.json()
            }).then((data) => {
                console.log("update", data)
                if (data.msg == "The request body is empty but it must be an array of todo's") {
                    data = [{ label: "sample task", done: false }]
                    updateData(data);
                }
                getData(usuarioUrl);
            })
    }

    const eliminarTarea = (e, i) => {

        let nuevaData = state.tareas.filter((tarea, tareaIndice) => {
            return tareaIndice !== i;
        })
        setState(prevState => {
            return { ...prevState, tareas: nuevaData }
        })

        updateData(nuevaData);
    }

    //Boton que elimina todo
    const deleteAll = () => {
        let opciones = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }
        fetch(usuarioUrl, opciones)
            .then(response => response.json())
            .then((data) => {
                console.log("Eliminar todo:", data)
                getData(usuarioUrl);
            })

    }





    return (
        <>
            <div className="container bg-secondary rounded">
                <div className="row mt-5 ">
                    <div className="col-md-6 text-center mx-auto mt-3">
                        <h1 className="text-white">TO-DO List</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6 mx-auto">
                        <div className="card text-center mb-5">
                            <div className="card-header">
                                <input autoFocus id="input" type="text" className="form-control" placeholder="¿Qué se necesita hacer?" onKeyPress={e => insertarTarea(e)} />
                            </div>
                            <div className="card-body">
                                <ul className="list-group text-left">
                                    {
                                        state.tareas.length > 0 &&
                                        state.tareas.map((ele, index) => {
                                            return <li key={index} className="list-group-item" onClick={e => eliminarTarea(e, index)}>{index + 1} - {ele.label}<i id="eliminar" className="fas fa-times"></i></li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="card-footer text-muted text-left">
                                {state.tareas.length} item restantes.
                                <button type="button" className="btn btn-danger float-right" onClick={e => deleteAll(e)}>Eliminar Todo</button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}