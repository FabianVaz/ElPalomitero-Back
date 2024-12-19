# El Palomitero - Frontend

El Palomitero es una aplicación web para explorar, reseñar y gestionar información sobre películas. Este repositorio contiene el código fuente del frontend de la aplicación.

## Características

- **Explorar Películas**: Navega entre películas populares, mejor calificadas, en cartelera y próximas a estrenarse.
- **Iniciar Sesión y Registro**: Los usuarios pueden registrarse e iniciar sesión para interactuar con la aplicación.
- **Reseñas de Películas**: Escribe y publica reseñas sobre películas después de escanear un código QR.
- **Panel de Administración**: Sección exclusiva para administradores para ver estadísticas de usuarios y reseñas.
- **Perfil de Usuario**: Visualiza las reseñas realizadas por el usuario.

## Tecnologías Utilizadas

- **React**: Librería principal para construir la interfaz.
- **React Router**: Manejo de rutas dentro de la aplicación.
- **Axios**: Para realizar peticiones HTTP al backend.
- **Bootstrap**: Estilización y diseño responsivo.
- **TMDb API**: API utilizada para obtener información sobre películas.
- **HTML5 QR Code Scanner**: Librería para escaneo de códigos QR.

## Requisitos Previos

1. Node.js (v14 o superior)
2. npm o yarn

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/el-palomitero-frontend.git
   cd el-palomitero-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   VITE_BACKEND_URL=http://tu-backend-url.com
   VITE_TMDB_API_KEY=tu_clave_de_tmdb
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abre la aplicación en tu navegador en [http://localhost:3000](http://localhost:3000).

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye el proyecto para producción.
- `npm run preview`: Previsualiza la aplicación después de construirla.

## Estructura del Proyecto

```plaintext
src/
├── components/          # Componentes reutilizables como Header y Navbar
├── pages/               # Páginas principales como Login, Register, Home, etc.
├── services/            # Servicios y API
├── styles/              # Archivos CSS personalizados
├── App.tsx              # Configuración principal de la aplicación
├── main.tsx             # Punto de entrada del proyecto
└── env.d.ts             # Definición de tipos para variables de entorno
```

## Funcionalidades Principales

### Inicio de Sesión y Registro
Los usuarios pueden crear una cuenta o iniciar sesión para acceder a funcionalidades personalizadas, como:

- Publicar reseñas.
- Visualizar sus estadísticas y reseñas en el perfil.

### Exploración de Películas
El usuario puede navegar y buscar películas utilizando la API de TMDb. Las opciones incluyen:

- Mejor calificadas.
- En cartelera.
- Próximas.

### Reseñas de Películas
Para escribir una reseña, el usuario debe escanear un código QR proporcionado. Una vez autenticado, puede:

- Calificar la película de 1 a 5 estrellas.
- Escribir y publicar una reseña.

### Panel de Administración
Exclusivo para administradores, muestra estadísticas como:

- Total de usuarios registrados.
- Total de reseñas.
- Nuevos usuarios y reseñas del último mes.

## Despliegue
La aplicación puede ser desplegada en plataformas como Vercel. Asegúrate de configurar las variables de entorno en el entorno de despliegue.

## Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE).
