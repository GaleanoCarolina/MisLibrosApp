import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { LibroService } from './src/services/LibroService';
import { LibroRepository } from './src/repositories/LibroRepository';

const libroService = new LibroService();

// PRUEBA DE SINGLETON 
const repo1 = LibroRepository.getInstance();
const repo2 = LibroRepository.getInstance();

console.log("pruebita");
console.log("Instancia 1 y Instancia 2 son iguales?: ", repo1 === repo2);
if (repo1 === repo2) {
    console.log("ÉXITO: Ambas llamadas retornan la misma instancia del Repository.");
}

export default function App() {
  const [libros, setLibros] = useState(libroService.obtenerLibros());
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');

  const agregar = () => {
    if (titulo && autor && anio) {
      libroService.agregarLibro(titulo, autor, anio);
      setLibros([...libroService.obtenerLibros()]);
      setTitulo('');
      setAutor('');
      setAnio('');
    }
  };

  const eliminar = (id: string) => {
    libroService.eliminarLibro(id);
    setLibros([...libroService.obtenerLibros()]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Libros</Text>
      
      <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
      <TextInput placeholder="Autor" value={autor} onChangeText={setAutor} style={styles.input} />
      <TextInput placeholder="Año" value={anio} onChangeText={setAnio} style={styles.input} keyboardType="numeric" />
      
      <Button title="Agregar Libro" onPress={agregar} />

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.libroItem}>
            <Text>{item.obtenerInfo()}</Text>
            <Button title="Eliminar" color="red" onPress={() => eliminar(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#fff', marginTop: 30 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  libroItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, padding: 10, backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee' }
});