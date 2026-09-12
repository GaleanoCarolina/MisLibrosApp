import { Libro } from '../models/Libro';

export class LibroService {
  private libros: Libro[] = [];

  public obtenerLibros(): Libro[] {
    return this.libros;
  }

  public agregarLibro(titulo: string, autor: string, anio: string): void {
    const id = Math.random().toString();
    const nuevoLibro = new Libro(id, titulo, autor, anio);
    this.libros.push(nuevoLibro);
  }

  public eliminarLibro(id: string): void {
    this.libros = this.libros.filter(libro => libro.id !== id);
  }
}