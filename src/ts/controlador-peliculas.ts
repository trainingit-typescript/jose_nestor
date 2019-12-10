import { Pelicula } from "./datos/pelicula";
import * as peliculasAPI from "./peliculas.json";

export class ControladorPeliculas {

  private peliculas: Pelicula[] = [];
  private peliculasVistas: Pelicula[] = [];
  private peliculasPendientes: Pelicula[] = [];

  constructor() {
    this.cargaPeliculas();
    this.getTodosDirectores();
  }

  public cargaPeliculas(): void {
    const peliculasJSON = peliculasAPI.peliculas;

    for (const pelicula of peliculasJSON) {
      const nuevaPelicula = new Pelicula(
        pelicula.id,
        pelicula.titulo,
        pelicula.director,
        pelicula.fecha,
        pelicula.cartel,
        pelicula.vista,
        pelicula.formato,
        pelicula.valoracion,
        pelicula.oscars,
      );

      this.peliculas.push(nuevaPelicula);
    }

    this.dividirPeliculasPorTipo();
  }

  public getNPeliculas(vistas: boolean): number {
    return this.peliculas.filter(pelicula => pelicula.vista === vistas).length;
  }

  private dividirPeliculasPorTipo(): void {
    this.peliculasVistas = this.peliculas.filter(pelicula => pelicula.vista);
    this.peliculasPendientes = this.peliculas.filter(pelicula => !pelicula.vista);
  }

  public getPeliculasPorTipo(vista: boolean): Pelicula[] {
    return vista ? this.peliculasVistas : this.peliculasPendientes;
  }

  public getPeliculaMasValorada(): Pelicula {
    return this.peliculas.reduce((prev, current) => prev.valoracion > current.valoracion ? prev : current);
  }

  public getPeliculaMasOscars(): Pelicula {
    return this.peliculas.reduce((prev, current) => prev.oscars > current.oscars ? prev : current);
  }

  public getPeliculaMasReciente(): Pelicula {
    return this.peliculas.reduce((prev, current) => prev.isPeliculaMasActual(current) ? current : prev);
  }

  public getTodosDirectores(): string[] {
    return this.peliculas.map(pelicula => pelicula.director).filter((elemento, indice, lista) => lista.indexOf(elemento) === indice);
  }

  public getPeliculasDirector(director: string) {
    return this.peliculas.filter(pelicula => pelicula.director === director);
  }
}
