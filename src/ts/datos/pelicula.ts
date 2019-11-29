import * as moment from "moment";
import { Formatos } from "./enum-formatos";
import { PeliculaJSON } from "./interface-pelicula";
import { ValoracionPeliculas } from "./type-valoracion-peliculas";

export class Pelicula {

  private fecha: moment.Moment;
  public formato: Formatos;
  public valoracion: ValoracionPeliculas;

  constructor(
    public id: number,
    public titulo: string,
    public director: string,
    fecha: string,
    public cartel: string,
    public vista: boolean,
    formato: string,
    valoracion: number,
    public oscars: number,
  ) {
    this.formato = Formatos[formato];
    this.fecha = moment(fecha, "DD/MM/YYYY");
    this.valoracion = valoracion as ValoracionPeliculas;
  }

  public getFormatoAString(): string {
    const formato = Formatos[this.formato];
    return formato.charAt(0).toUpperCase() + formato.slice(1);
  }

  public getAnioFecha(): string {
    return this.fecha.year().toString();
  }

  public isPeliculaMasActual(nuevaPelicula: Pelicula): boolean {
    return nuevaPelicula.fecha.isAfter(this.fecha);
  }
}
