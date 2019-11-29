/* Éste es el archivo de entrada y el que arrancará tu aplicación, desde aquí instanciarás el controlador de películas y el controlador de la vista */
import { ControladorPeliculas } from "./controlador-peliculas";
import { VistaPeliculas } from "./vista-peliculas";

const CPeliculas = new ControladorPeliculas();
const VPeliculas = new VistaPeliculas(CPeliculas);
