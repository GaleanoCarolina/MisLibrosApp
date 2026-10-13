import { supabase } from '../supabase/supabaseClient';

export class AuthService {
  static async registrar(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  static async iniciarSesion(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  static async cerrarSesion() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}