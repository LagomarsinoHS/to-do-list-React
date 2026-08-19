import React from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/style.css";

//***** Importar Archivo que quieres correr *****
//import { App } from "./todoList/app";
import { App } from "./todoListFetch/app";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
