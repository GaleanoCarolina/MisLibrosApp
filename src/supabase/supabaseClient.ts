import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Usando las credenciales de la captura proporcionada
const supabaseUrl = 'https://eirfooyiwqwnqvjkvquh.supabase.co';
const supabaseAnonKey = 'sb_publishable_3Fm7AX8xwqiRVvWcBUzYlQ_Rkq8Aq5b'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});