import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./css/style.css"

//***** Importar Archivo que quieres correr *****
//import { App } from "./todoList/app";
import { App } from "./todoListFetch/app";




ReactDOM.render(<App/>, document.querySelector("#root"))

