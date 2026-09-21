import { Libro } from '../models/Libro';
import { LibroRepository } from '../repositories/LibroRepository';

export class LibroService {
    private repository: LibroRepository;

    constructor() {
        this.repository = LibroRepository.getInstance();
    }

    public obtenerLibros(): Libro[] {
        return this.repository.obtenerLibros();
    }

    public agregarLibro(titulo: string, autor: string, anio: string): void {
        const id = Math.random().toString();
        const nuevoLibro = new Libro(id, titulo, autor, anio);
        this.repository.agregarLibro(nuevoLibro);
    }

    public eliminarLibro(id: string): void {
        this.repository.eliminarLibro(id);
    }
}