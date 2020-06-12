import React, { useState, useEffect } from "react";

export const App = () => {

    const [state, setState] = useState({
        tareas: [{ tarea: "Tarea 1" }, { tarea: "Tarea 2" }, { tarea: "Tarea 3" }]
    })

    const getInput = (e) => {


        if (e.target.value !== "" && e.key === "Enter") {

            let newData = {
                //propiedad
                //del Obj       V Lo que quiero insertar EN el obj
                tareas: state.tareas.concat({ tarea: e.target.value, eliminar: false }),
                enterApretado: true
            }
            setState(prevState => {
                return { ...prevState, ...newData }
            })
            e.target.value = "";

        }
    }

    /*     //NO SIRVE PERO ES IMPORTANTE TENER LA LOGICA
        const mouseOver = (i) => {
    
            //Hago destructuracion, esto me entrega mi arreglo de tareas
            const { tareas } = state
            //En tar asigno el valor de tarea en la posicion X, es decir, toda la fila del elemento
            let tar = tareas[i];
            //Al valor de eliminar, le asigno su contrario
            tar.eliminar = !tar.eliminar
            //A Tareas en esa posicion le asigno mi nuevo valor de eliminar
            tareas[i] = tar
            let newData = {
                //En mi objeto tareas, le asigno el valor del arreglo de tareas
                tareas: tareas
            }
    
            setState(prevState => {
                return { ...prevState, ...newData }
            })
        }
    
        //NO SIRVE PERO ES IMPORTANTE TENER LA LOGICA
        const mouseOut = (i) => {
            const { tareas } = state
            let tar = tareas[i];
            tar.eliminar = !tar.eliminar
            tareas[i] = tar
            let newData = {
                tareas: tareas
            }
            setState(prevState => {
                return { ...prevState, ...newData }
            })
        } */

    const clickEliminar = (e, i) => {
        let nuevaData = state.tareas.filter((tarea, tareaIndice) => {
            return tareaIndice !== i;
        })
        console.log(nuevaData)
        setState(prevState => {
            return { ...prevState, tareas: nuevaData }
        })
        /*//Con Slice
         setState(prevState => {
         return { ...prevState, tareas:prevState.tareas.slice(i,1) }
         }) */

    }

    const asda = (cantidad) => {
        console.log(cantidad)
        switch (true) {
            case (cantidad > 0 && cantidad <= 2): return <span className="ml-3 text-info font-weight-bold">Queda poco!</span>;
            case (cantidad > 2 && cantidad <= 5): return <span className="ml-3 text-warning font-weight-bold">Trabaje trabaje!</span>;;
            case cantidad > 5: return <span className="ml-3 text-danger font-weight-bold">pff, flojo</span>;
        }

    }

    return (<>
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
                            <input autoFocus id="input" type="text" className="form-control" placeholder="¿Qué se necesita hacer?" onKeyPress={(e) => getInput(e)} />
                        </div>
                        <div className="card-body">
                            <ul className="list-group text-left">
                                {
                                    state.tareas.length > 0 ? (

                                        state.tareas.map((ele, i) => {
                                            return <li key={i} className="list-group-item" >{ele.tarea}<i id="eliminar" className="fas fa-times" onClick={e => clickEliminar(e, i)}></i></li>
                                        })
                                    ) :
                                        (
                                            <li className="list-group-item bg-success"><span className="mr-4">No hay Tareas pendientes.</span><i className="fas fa-check fa-2x"></i><i className="fas fa-check fa-2x"></i><i className="fas fa-check fa-2x"></i></li>
                                        )
                                }
                            </ul>
                        </div>
                        <div className="card-footer text-muted text-left">
                            {state.tareas.length} item restantes.

                            {
                                asda(state.tareas.length)
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )



}