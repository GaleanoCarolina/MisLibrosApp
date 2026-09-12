export class Libro {
  public id: string;
  public titulo: string;
  public autor: string;
  public anio: string;

  constructor(id: string, titulo: string, autor: string, anio: string) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
  }

  // El método que pide la tarea
  public obtenerInfo(): string {
    return `${this.titulo} por ${this.autor} (${this.anio})`;
  }
}