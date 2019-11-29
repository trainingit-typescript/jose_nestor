import { ControladorPeliculas } from "./controlador-peliculas";
import { Formatos } from "./datos/enum-formatos";

export class VistaPeliculas {
  private HTML: any = {};

  constructor(private CPeliculas: ControladorPeliculas) {
    this.cargaHTML();
    this.pintaLista(false);
    this.pintaLista(true);
    this.getNumPeliculas();
    this.pintarEstadisticas();
    this.pintaListaDirectores();
  }

  private cargaHTML(): void {
    this.HTML.nPeliculasPendientes = document.querySelector(".js-n-peliculas-pendientes");
    this.HTML.listaPendientes = document.querySelector(".js-lista-pendientes");
    this.HTML.peliculasPendientes = this.HTML.listaPendientes.querySelectorAll(".js-pelicula");
    this.HTML.peliculaPendiente = document.querySelector(".js-lista-pendientes .js-pelicula");
    this.HTML.listaVistas = document.querySelector(".js-lista-vistas");
    this.HTML.peliculasVistas = this.HTML.listaVistas.querySelectorAll(".js-pelicula");
    this.HTML.peliculaVista = document.querySelector(".js-lista-vistas .js-pelicula");
    this.HTML.nPeliculasVistas = document.querySelector(".js-n-peliculas-vistas");
    this.HTML.hayPeliculas = document.querySelector(".js-hay-peliculas");
    this.HTML.peliculaBase = document.querySelector(".js-pelicula-base");
    this.HTML.oscars = document.querySelector(".js-oscars");
    this.HTML.formatoVHS = document.querySelector(".js-formato-vhs");
    this.HTML.formatoArchivo = document.querySelector(".js-formato-archivo");
    this.HTML.formatoDVD = document.querySelector(".js-formato-dvd");
    this.HTML.titulo = document.querySelector(".js-titulo");
    this.HTML.valoracion = document.querySelector(".js-valoracion");
    this.HTML.director = document.querySelector(".js-director");
    this.HTML.anyo = document.querySelector(".js-anyo");
    this.HTML.mejorValorada = document.querySelector(".js-mejor-valorada");
    this.HTML.masOscars = document.querySelector(".js-mas-oscars");
    this.HTML.masReciente = document.querySelector(".js-mas-reciente");
    this.HTML.listaDirectores = document.querySelector(".js-lista-directores");
    this.HTML.directores = this.HTML.listaDirectores.querySelectorAll("li");
    this.HTML.directorBase = document.querySelector(".js-director-base");
    this.HTML.listaPeliculasDirectores = document.querySelector(".js-lista-peliculas-directores");
    this.HTML.peliculaDirectorBase = document.querySelector(".js-pelicula-director-base");
  }

  private pintaLista(vista: boolean): void {
    this.limpiarLista(vista);

    const listaPeliculas = (vista ? this.HTML.listaVistas : this.HTML.listaPendientes) as HTMLElement;

    for (const pelicula of this.CPeliculas.getPeliculasPorTipo(vista)) {
      const nuevoElemento = this.HTML.peliculaBase.cloneNode(true);

      nuevoElemento.querySelector(".js-cartel").src = pelicula.cartel;
      nuevoElemento.querySelector(".js-cartel").alt = pelicula.titulo;
      nuevoElemento.querySelector(".js-cartel").title = pelicula.titulo;
      nuevoElemento.querySelector(".js-titulo").textContent = pelicula.titulo;
      nuevoElemento.querySelector(".js-director").textContent = pelicula.director;
      nuevoElemento.querySelector(".js-anyo").textContent = pelicula.getAnioFecha();

      if (pelicula.oscars < 1) {
        nuevoElemento.querySelector(".js-oscars").remove();
      }

      switch (pelicula.formato) {
        case Formatos.DVD:
          nuevoElemento.querySelector(".js-formato-dvd").classList.remove("hide");
          break;
        case Formatos.VHS:
          nuevoElemento.querySelector(".js-formato-vhs").classList.remove("hide");
          break;
        case Formatos.archivo:
          nuevoElemento.querySelector(".js-formato-archivo").classList.remove("hide");
          break;
      }

      nuevoElemento.querySelector(".js-valoracion").dataset.puntos = pelicula.valoracion > 0 ? pelicula.valoracion : "";

      for (let i = 1; i <= 5; i++) {
        nuevoElemento.querySelector(".js-valoracion-" + i).classList.remove("glyphicon-star", "glyphicon-star-empty");
        nuevoElemento.querySelector(".js-valoracion-" + i).classList.add(!pelicula.vista ? "glyphicon-star-empty" : (i <= pelicula.valoracion ? "glyphicon-star" : "glyphicon-star-empty"));
      }

      listaPeliculas.appendChild(nuevoElemento);
    }
  }

  private limpiarLista(vista: boolean): void {
    const listaItems = vista ? this.HTML.peliculasVistas : this.HTML.peliculasPendientes;
    console.log(listaItems);
    for (const item of listaItems) {
      item.remove();
    }
  }

  private getNumPeliculas(): void {
    this.HTML.nPeliculasPendientes.textContent = this.CPeliculas.getNPeliculas(false);
    this.HTML.nPeliculasVistas.textContent = this.CPeliculas.getNPeliculas(true);
  }

  private pintarEstadisticas(): void {
    const peliculaMasValorada = this.CPeliculas.getPeliculaMasValorada();
    const peliculaMasOscars = this.CPeliculas.getPeliculaMasOscars();
    const peliculaMasReciente = this.CPeliculas.getPeliculaMasReciente();

    this.HTML.mejorValorada.querySelector(".js-cartel").src = peliculaMasValorada.cartel;
    this.HTML.mejorValorada.querySelector(".js-cartel").alt = peliculaMasValorada.titulo;
    this.HTML.mejorValorada.querySelector(".js-cartel").title = peliculaMasValorada.titulo;
    this.HTML.mejorValorada.querySelector(".js-titulo").textContent = peliculaMasValorada.titulo;

    this.HTML.masOscars.querySelector(".js-cartel").src = peliculaMasOscars.cartel;
    this.HTML.masOscars.querySelector(".js-cartel").alt = peliculaMasOscars.titulo;
    this.HTML.masOscars.querySelector(".js-cartel").title = peliculaMasOscars.titulo;
    this.HTML.masOscars.querySelector(".js-titulo").textContent = peliculaMasOscars.titulo;

    this.HTML.masReciente.querySelector(".js-cartel").src = peliculaMasReciente.cartel;
    this.HTML.masReciente.querySelector(".js-cartel").alt = peliculaMasReciente.titulo;
    this.HTML.masReciente.querySelector(".js-cartel").title = peliculaMasReciente.titulo;
    this.HTML.masReciente.querySelector(".js-titulo").textContent = peliculaMasReciente.titulo;
  }

  private pintaListaDirectores(): void {
    this.limpiarListaDirectores();

    const listaDirectores = this.HTML.listaDirectores as HTMLElement;

    for (const director of this.CPeliculas.getTodosDirectores()) {
      const nuevoElementoDirector = this.HTML.directorBase.cloneNode(true);

      nuevoElementoDirector.querySelector(".js-director").textContent = director;

      const listaPeliculasDirectores = nuevoElementoDirector.querySelector(".js-lista-peliculas-directores") as HTMLElement;

      for (const pelicula of this.CPeliculas.getPeliculasDirector(director)) {
        const nuevoElementoPelicula = this.HTML.peliculaDirectorBase.cloneNode(true);

        nuevoElementoPelicula.querySelector(".js-titulo").textContent = pelicula.titulo;
        nuevoElementoPelicula.querySelector(".js-anyo").textContent = pelicula.getAnioFecha();

        listaPeliculasDirectores.appendChild(nuevoElementoPelicula);
      }

      listaDirectores.appendChild(nuevoElementoDirector);
    }
  }

  private limpiarListaDirectores(): void {
    const listaItems = this.HTML.directores;
    console.log(listaItems);
    for (const item of listaItems) {
      item.remove();
    }
  }
}
