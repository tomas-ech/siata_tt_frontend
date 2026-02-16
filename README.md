# Estructura del Proyecto

```
siata_tt_frontend/
├── src/
│   ├── api/               # Configuración de Axios e interceptores
│   ├── assets/            # Imágenes, logos y SVGs
│   ├── components/        # Componentes reutilizables (Botones, Cards)
│   │   └──commons/        # Componentes reusables
│   ├── provider/          # Estados globales 
│   ├── pages/             # Vistas principales (AuthPage, HomePage)
│   ├── routes/            # Router
│   ├── types/             # Interfaces de TypeScript (modelos de datos)
│   └──  utils/            # Formateadores de fecha, moneda, etc.
│        └──services/      # Llamadas a FastAPI
│        └──validations/   # Archivos de yup para la validación de formularios
├── .env                   # URL del backend y llaves públicas
└── README.md
```

# Tecnologías Utilizadas

## Vite vs Next.js
Para este proyecto de gestión interna (Dashboard), elegimos Vite sobre Next.js por las siguientes razones:

Velocidad de desarrollo: Vite utiliza Native ESM, lo que hace que el inicio del servidor y el HMR (Hot Module Replacement) sean instantáneos, sin importar el tamaño del proyecto.

Arquitectura SPA: Al ser una aplicación que requiere autenticación constante y manejo de estado complejo en el cliente, una Single Page Application (SPA) es más eficiente que el renderizado en el servidor (SSR) que prioriza Next.js.

Simplicidad: Evitamos la sobrecarga de configuraciones de servidor de Next.js, manteniendo el despliegue ligero y enfocado en la interacción del usuario.

## TypeScript vs JavaScript
El uso de TypeScript fue fundamental para garantizar la robustez del sistema de envíos:

Contratos de Datos: Definimos interfaces que coinciden exactamente con los DTOs de FastAPI, eliminando errores de "undefined" al acceder a propiedades de un envío.

Autocompletado y Mantenimiento: Facilita la refactorización y permite que cualquier desarrollador entienda qué datos espera cada componente sin leer toda la lógica.

## Comunicación con el API: axios.ts
En lugar de usar fetch directamente en los componentes, centralizamos la lógica en un archivo de configuración de Axios.

¿Cómo funciona?
El archivo src/services/axios.ts crea una instancia personalizada que actúa como un túnel inteligente entre React y FastAPI:

Configuración Base: Define la baseURL obtenida de las variables de entorno, evitando escribir la dirección del servidor en cada componente.

Interceptores de Petición: Antes de que cada llamada salga al backend, un interceptor revisa el localStorage. Si existe un token JWT, lo inyecta automáticamente en los headers de autorización:


```config.headers.Authorization = `Bearer ${token}`;```

Interceptores de Respuesta: Si el backend responde con un error 401 (No autorizado), el interceptor puede limpiar el almacenamiento y redirigir al usuario al Login automáticamente, centralizando el manejo de errores de sesión.

# Guía de Inicio Rápido (Frontend)
Sigue estos pasos para configurar el entorno de desarrollo localmente.

## 1 Requisitos Previos
Asegúrate de tener instalado:

Node.js (Versión 18.0 o superior)

npm (Viene con Node)

## 2 Clonar el Proyecto
Abre tu terminal y ejecuta:

```
git clone https://github.com/tu-usuario/siata_tt_frontend.git
cd siata_tt_frontend
```

## 3 Configuración de Variables de Entorno
El frontend necesita saber dónde está el backend.

Crea un archivo llamado .env en la raíz del proyecto.

Copia el contenido de .env.example o pega lo siguiente:

Fragmento de código

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## 5 Levantar el Servidor de Desarrollo
Inicia Vite para ver la aplicación:


```
npm run dev
```
