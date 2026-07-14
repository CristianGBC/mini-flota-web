# Mini-Flota Web

Aplicación frontend para gestionar vehículos, conductores y asignaciones de una flota.

El proyecto consume la API de Mini-Flota y permite iniciar sesión, registrar vehículos, registrar conductores y asignar un conductor a un vehículo.

## Tecnologías utilizadas

* React
* TypeScript
* Vite
* TanStack Query
* TanStack Router
* React Hook Form
* Zod
* Axios
* Tailwind CSS

## Funcionalidades

* Inicio de sesión con validación.
* Almacenamiento del JWT en `localStorage`.
* Rutas protegidas.
* Interceptor de Axios para agregar el token.
* Manejo centralizado de respuestas `401`.
* Listado y creación de vehículos.
* Listado y creación de conductores.
* Asignación y cambio de conductor.
* Actualización automática de las listas con TanStack Query.
* Estados de carga y error.
* Validación de formularios con Zod.
* Interfaz adaptable con Tailwind CSS.

## Estructura principal

```text
src/
├── api/
│   └── axiosInstance.ts
├── features/
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── drivers/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   └── vehicles/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── types/
│       └── utils/
├── lib/
│   └── queryClient.ts
├── main.tsx
└── router.tsx
```

El código se organiza por funcionalidad para mantener juntas la API, los componentes, los hooks, los tipos y las validaciones de cada feature.

## Requisitos

Antes de ejecutar el frontend necesitas:

* Node.js.
* Yarn.
* La API de Mini-Flota ejecutándose.
* Git.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/CristianGBC/mini-flota-web
cd mini-flota-web
```

Instala las dependencias:

```bash
yarn install
```

## Variables de entorno

Crea un archivo `.env` en la raíz:

```env
VITE_API_URL=http://127.0.0.1:8000
```

También existe un archivo `.env.example` como plantilla:

```env
VITE_API_URL=http://127.0.0.1:8000
```

El archivo `.env` no debe subirse al repositorio.

Las variables que comienzan con `VITE_` son visibles en el navegador, por lo que no se deben almacenar contraseñas, claves privadas ni otros secretos.

## Ejecutar el proyecto

Inicia el servidor de desarrollo:

```bash
yarn dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

## Rutas

```text
/login
/vehicles
/drivers
```

Las rutas de vehículos y conductores están protegidas. Si no existe un token en `localStorage`, el usuario es redirigido al login.

## Autenticación

El formulario de login utiliza:

* React Hook Form para manejar los campos.
* Zod para validar email y contraseña.
* Axios para enviar las credenciales.
* TanStack Router para navegar después del login.

El token se guarda con:

```ts
localStorage.setItem("access_token", response.access_token);
```

Las peticiones protegidas utilizan una instancia compartida de Axios.

```ts
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
```

El interceptor de request agrega automáticamente:

```http
Authorization: Bearer TOKEN_JWT
```

Cuando la API responde con `401`, el interceptor de respuesta elimina el token y redirige al login.

## Vehículos

La pantalla de vehículos permite:

* Crear vehículos.
* Mostrar vehículos en una tabla.
* Mostrar estados de carga y error.
* Consultar el conductor actual.
* Seleccionar y asignar un conductor.
* Cambiar el conductor de un vehículo.

La lista utiliza:

```ts
useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
});
```

La creación y asignación utilizan `useMutation`.

Después de una operación exitosa se invalida la consulta:

```ts
queryClient.invalidateQueries({
    queryKey: ["vehicles"],
});
```

Esto actualiza la tabla automáticamente sin usar `useEffect` ni recargar la página.

## Conductores

La pantalla de conductores permite:

* Registrar un conductor.
* Listar los conductores existentes.
* Validar que la licencia tenga exactamente 10 dígitos.
* Mostrar errores de licencia duplicada.
* Actualizar automáticamente la lista después de crear.

La licencia se maneja como texto y el campo utiliza:

```tsx
type="text"
inputMode="numeric"
maxLength={10}
```

Esto conserva posibles ceros iniciales y muestra un teclado numérico en dispositivos compatibles.

## Asignación de conductores

Cada vehículo tiene un selector con los conductores registrados.

Al confirmar la selección, se envía:

```text
PUT /vehicles/{vehicle_id}/driver
```

con:

```json
{
    "driver_id": "ID_DEL_CONDUCTOR"
}
```

Después de una asignación exitosa, TanStack Query vuelve a consultar los vehículos y muestra inmediatamente el conductor actualizado.

La API es la responsable final de impedir que un conductor esté asignado a dos vehículos.

## Validaciones

Las validaciones se encuentran en archivos separados:

```text
src/features/auth/utils/loginValidator.ts
src/features/vehicles/utils/vehicleValidator.ts
src/features/drivers/utils/driverValidator.ts
```

Esto evita mezclar la lógica de validación con la presentación de los componentes.

## Tailwind CSS

Tailwind está configurado mediante el plugin oficial para Vite.

En `vite.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite";
```

En `src/index.css`:

```css
@import "tailwindcss";
```

## Decisiones de implementación

### Axios centralizado

Todas las peticiones utilizan `axiosInstance`. La URL base se encuentra en una variable de entorno y el token se agrega desde un interceptor.

### TanStack Query para datos remotos

No se utiliza `useEffect` con `fetch` manual. Las consultas y mutaciones se manejan con TanStack Query.

### Organización por feature

Cada funcionalidad mantiene juntos sus componentes, API, hooks, tipos y validaciones.

### Tipado estricto

Los datos de vehículos y conductores están definidos mediante tipos de TypeScript. Los errores se reciben como `unknown` y se verifican con `axios.isAxiosError`.

### Rutas protegidas

Las rutas comprueban que exista un token antes de permitir el acceso. Además, el backend valida que el token sea auténtico y no esté expirado.

## Compilar para producción

Ejecuta:

```bash
yarn build
```

Para revisar localmente la compilación:

```bash
yarn preview
```

## Mejoras futuras

* Implementar una barra de navegación compartida para evitar repetirla en cada página.
* Crear componentes reutilizables dentro de `src/components/ui/`.
* Mostrar únicamente conductores disponibles en el selector.
* Agregar notificaciones visuales de éxito.
* Agregar confirmaciones para operaciones sensibles.
* Implementar eliminación y edición de conductores.
* Agregar filtros y búsqueda.
* Agregar paginación.
* Agregar pruebas de componentes y hooks.
* Mejorar la accesibilidad de formularios y tablas.
* Implementar un manejo global de errores.
* Utilizar cookies seguras para la autenticación en un entorno de producción.

## Aspectos que se mejorarían con más tiempo

Con más tiempo se priorizaría:

* aumentar la cobertura de pruebas;
* crear componentes UI reutilizables;
* optimizar la experiencia de asignación;
* agregar mensajes de éxito;
* implementar filtros, búsqueda y paginación;
* mejorar el manejo de sesiones y autenticación para producción.
