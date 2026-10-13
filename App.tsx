import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { supabase } from './src/supabase/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { AuthService } from './src/services/AuthService';
import { LibroRepository } from './src/repositories/LibroRepository';
import { Libro } from './src/models/Libro';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState<'login' | 'register' | 'home'>('login');
  
  // Estados para Login/Registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para Libros
  const [libros, setLibros] = useState<Libro[]>([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setView('home');
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setView('home');
        cargarLibros();
      } else {
        setView('login');
      }
    });
  }, []);

  // --- Funciones de Auth ---
  const handleLogin = async () => {
    try {
      await AuthService.iniciarSesion(email, password);
      // El onAuthStateChange cambiará la vista a 'home'
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await AuthService.registrar(email, password);
      Alert.alert('Éxito', 'Registrado correctamente.');
      setView('login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.cerrarSesion();
      // El onAuthStateChange cambiará la vista a 'login'
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  // --- Funciones de Libros ---
  const cargarLibros = async () => {
    try {
      const data = await LibroRepository.obtenerLibros();
      setLibros(data);
    } catch (error: any) {
      Alert.alert('Error al cargar', error.message);
    }
  };

  const handleAgregarLibro = async () => {
    if (!titulo || !autor) {
      Alert.alert('Error', 'Título y autor son requeridos');
      return;
    }
    try {
      await LibroRepository.agregarLibro({ titulo, autor, anio } as any);
      setTitulo(''); setAutor(''); setAnio('');
      cargarLibros();
    } catch (error: any) {
      Alert.alert('Error al agregar', error.message);
    }
  };

  const handleEliminarLibro = async (id: string) => {
    try {
      await LibroRepository.eliminarLibro(id);
      cargarLibros();
    } catch (error: any) {
      Alert.alert('Error al eliminar', error.message);
    }
  };

  // --- Vistas ---
  if (view === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Entrar" onPress={handleLogin} />
        <View style={{ marginTop: 10 }}>
          <Button title="Ir a Registro" onPress={() => setView('register')} color="#888" />
        </View>
      </View>
    );
  }

  if (view === 'register') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Crear Cuenta" onPress={handleRegister} color="#28a745" />
        <View style={{ marginTop: 10 }}>
          <Button title="Volver al Login" onPress={() => setView('login')} color="#888" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.homeContainer}>
      <View style={styles.header}>
        <Text style={styles.titleHome}>Mis Libros</Text>
        <Button title="Cerrar Sesión" onPress={handleLogout} color="#dc3545" />
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor} />
        <TextInput style={styles.input} placeholder="Año" value={anio} onChangeText={setAnio} keyboardType="numeric" />
        <Button title="Agregar Libro" onPress={handleAgregarLibro} />
      </View>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.libroCard}>
            <View>
              <Text style={styles.libroTitulo}>{item.titulo}</Text>
              <Text>{item.autor} - {item.anio}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEliminarLibro(item.id)}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  homeContainer: { flex: 1, padding: 20, backgroundColor: '#f4f4f4', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  titleHome: { fontSize: 24, fontWeight: 'bold' },
  form: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 20 },
  input: { height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, paddingHorizontal: 10 },
  libroCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  libroTitulo: { fontSize: 16, fontWeight: 'bold' },
  deleteText: { color: 'red', fontWeight: 'bold', fontSize: 18 }
});