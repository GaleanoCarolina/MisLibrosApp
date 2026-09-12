# Mis Libros App

## 5. Reflexión

**¿Por qué es conveniente separar la lógica de los libros de App.tsx?**
Para mantener el código ordenado y escalable. App.tsx solo se encarga de mostrar la interfaz de usuario, no de procesar cómo funcionan los datos.

**¿Qué responsabilidad tiene LibroService?**
Manejar la lógica de negocio. Es el que se encarga directamente de almacenar, agregar y eliminar los libros de la lista.

**¿Qué responsabilidad tiene la clase Libro?**
Servir como modelo de datos. Define los atributos que forman a un libro (id, título, autor, año) y sus métodos internos.