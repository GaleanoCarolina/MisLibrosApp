import { supabase } from '../supabase/supabaseClient';
import { Libro } from '../models/Libro';

export class LibroRepository {
  static async obtenerLibros(): Promise<Libro[]> {
    const { data, error } = await supabase.from('libros').select('*');
    if (error) throw error;
    return data || [];
  }

  static async agregarLibro(libro: Omit<Libro, 'id'>) {
    const { data, error } = await supabase.from('libros').insert([libro]).select();
    if (error) throw error;
    return data[0];
  }

  static async eliminarLibro(id: string) {
    const { error } = await supabase.from('libros').delete().eq('id', id);
    if (error) throw error;
  }
}