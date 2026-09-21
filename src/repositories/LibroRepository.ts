import { Libro } from '../models/Libro';

export class LibroRepository {
    private static instancia: LibroRepository;
    
    private libros: Libro[] = [
        new Libro('1', '1984', 'George Orwell', '1949'),
        new Libro('2', 'El Principito', 'Antoine de Saint-Exupéry', '1943'),
        new Libro('3', 'Cien años de soledad', 'Gabriel García Márquez', '1967')
    ];

    private constructor() {}

    public static getInstance(): LibroRepository {
        if (!LibroRepository.instancia) {
            LibroRepository.instancia = new LibroRepository();
        }
        return LibroRepository.instancia;
    }

    public obtenerLibros(): Libro[] {
        return this.libros;
    }

    public agregarLibro(libro: Libro): void {
        this.libros.push(libro);
    }

    public eliminarLibro(id: string): void {
        this.libros = this.libros.filter(l => l.id !== id);
    }
}