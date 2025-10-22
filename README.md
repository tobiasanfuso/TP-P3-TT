# 🏗️ AlquiMaq S.R.L - Sistema de Alquiler de Máquinas de Construcción

## 📋 Descripción del Proyecto

**AlquiMaq S.R.L** es una plataforma de e-commerce especializada en el alquiler de máquinas de construcción. El sistema permite a los usuarios solicitar el alquiler de equipos, mientras que los administradores pueden gestionar el inventario y aprobar/rechazar solicitudes según la disponibilidad.

## 🎯 Funcionalidades Principales

### 👥 Sistema de Roles de Usuario

El sistema implementa **3 roles de usuario** con diferentes niveles de acceso:

#### 🔹 **Customer (Cliente)**

- Visualizar catálogo de máquinas disponibles
- Solicitar alquiler de máquinas con fechas específicas
- Ver el estado de sus solicitudes
- Consultar historial de solicitudes
- Cancelar solicitudes pendientes

#### 🔹 **Admin (Administrador)**

- Todas las funcionalidades del Customer
- Agregar nuevas máquinas al catálogo
- Editar información de máquinas existentes
- Eliminar máquinas del sistema
- Aprobar/rechazar solicitudes de alquiler
- Cambiar estados de solicitudes
- Ver todas las solicitudes del sistema

#### 🔹 **Sysadmin (Super Administrador)**

- Todas las funcionalidades del Admin
- **Panel de control de usuarios**
- Crear nuevos usuarios con cualquier rol
- Editar información de usuarios existentes
- Eliminar usuarios del sistema
- Gestionar habilitaciones de administradores

## 🛠️ Arquitectura Técnica

### Frontend (React + Vite)

- **Framework**: React 19.1.1 con Vite
- **UI Library**: React Bootstrap 2.10.10
- **Routing**: React Router DOM 7.5.1
- **State Management**: Context API
- **Notifications**: React Toastify
- **Icons**: Bootstrap Icons

### Backend (Node.js + Express)

- **Runtime**: Node.js con Express 5.1.0
- **Database**: SQLite3 con Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Habilitado para comunicación frontend-backend

### Base de Datos

- **ORM**: Sequelize 6.37.7
- **Database**: SQLite3 5.1.7
- **Modelos**:
  - `Users` (usuarios con roles)
  - `Maquinas` (catálogo de equipos)
  - `SolicitudesAlquiler` (solicitudes de alquiler)

## 📁 Estructura del Proyecto

```
TP-P3-TT/
├── AlquilerMaq/                 # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/            # Autenticación
│   │   │   │   ├── login/       # Componente de login
│   │   │   │   └── userRegister/ # Componente de registro
│   │   │   ├── dashboar/        # Pantallas principales
│   │   │   │   ├── adminPanel/  # Panel de administración
│   │   │   │   ├── mainscren/  # Pantalla principal
│   │   │   │   └── notFound/   # Página 404
│   │   │   ├── layout/          # Layout principal
│   │   │   ├── UserManagement/ # Gestión de usuarios
│   │   │   ├── Productcard/    # Tarjetas de productos
│   │   │   ├── rentalModal/     # Modal de solicitud
│   │   │   ├── requestsList/    # Lista de solicitudes
│   │   │   ├── myRequests/      # Mis solicitudes
│   │   │   ├── historyRequests/ # Historial de solicitudes
│   │   │   ├── Newproduct/     # Nuevo producto
│   │   │   ├── editProduct/    # Editar producto
│   │   │   ├── productModal/    # Modal de producto
│   │   │   ├── confirmDeleteModal/ # Modal de confirmación
│   │   │   ├── protectedRoute/ # Rutas protegidas
│   │   │   ├── loadingCard/     # Componente de carga
│   │   │   ├── loadingUsers/    # Carga de usuarios
│   │   │   ├── service/         # Servicios (auth context)
│   │   │   └── utils/           # Utilidades y validaciones
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── AlquilerMaq-api/             # Backend Node.js
    ├── src/
    │   ├── Models/              # Modelos de base de datos
    │   │   ├── Users.js
    │   │   ├── Maquinas.js
    │   │   └── SolicitudesAlquiler.js
    │   ├── controllers/         # Controladores de API
    │   │   ├── authControllers.js
    │   │   ├── maquinasControllers.js
    │   │   ├── solicitudesController.js
    │   │   └── usersController.js
    │   ├── routes/             # Rutas de la API
    │   │   ├── authRoutes.js
    │   │   ├── maquinasRoutes.js
    │   │   ├── solicitudesRoutes.js
    │   │   ├── usersRoutes.js
    │   │   └── protectedRoutes.js
    │   ├── middleware/         # Middleware de autenticación
    │   │   ├── authMiddleware.js
    │   │   └── roleMiddleware.js
    │   ├── helpers/            # Validaciones
    │   │   └── validations.js
    │   ├── config/             # Configuración
    │   │   └── db.js
    │   ├── app.js
    │   └── index.js
    ├── dbs/                    # Base de datos
    │   └── db.sqlite
    └── package.json
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd TP-P3-TT
```

### 2. Configurar Backend

```bash
cd AlquilerMaq-api
npm install
npm run dev
```

### 3. Configurar Frontend

```bash
cd AlquilerMaq
npm install
npm run dev
```

### 4. Variables de Entorno

Crear archivo `.env` en `AlquilerMaq-api/`:

```env
REACT_APP_JWT_SECRET=tu_clave_secreta_jwt_aqui
```

## 📊 Modelos de Base de Datos

### Users (Usuarios)

```javascript
{
  id: INTEGER (PK),
  username: STRING (unique),
  email: STRING (unique),
  role: ENUM('customer', 'admin', 'sysadmin'),
  password: STRING (hashed),
  timestamps: true
}
```

### Maquinas (Máquinas)

```javascript
{
  id: INTEGER (PK),
  nombre: STRING,
  marca: STRING,
  descripcion: TEXT,
  precioPorDia: FLOAT,
  disponible: BOOLEAN,
  imagen: TEXT,
  timestamps: true
}
```

### SolicitudesAlquiler (Solicitudes)

```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK),
  maquinaId: INTEGER (FK),
  fechaInicio: DATE,
  fechaFin: DATE,
  estado: ENUM('pendiente', 'aprobado', 'rechazado', 'finalizado'),
  timestamps: true
}
```

## 🔐 Sistema de Autenticación

### JWT Token

- **Duración**: 2 horas
- **Payload**: `{ id, role }`
- **Almacenamiento**: localStorage

### Middleware de Seguridad

- `verifyToken`: Verifica validez del JWT
- `checkRole`: Controla acceso por roles
- Rutas protegidas según permisos

## 🎨 Características de la Interfaz

### Diseño Responsivo

- Bootstrap 5.3.8 para diseño responsive
- Componentes adaptables a móviles y desktop
- Iconografía consistente con Bootstrap Icons

### Experiencia de Usuario

- **Notificaciones**: Toast notifications para feedback
- **Loading States**: Spinners durante cargas
- **Validaciones**: Formularios con validación en tiempo real
- **Navegación**: Rutas protegidas según roles

## 🔄 Flujo de Trabajo

### Para Clientes

1. **Registro/Login** → Acceso al sistema
2. **Explorar Catálogo** → Ver máquinas disponibles
3. **Solicitar Alquiler** → Completar formulario con fechas
4. **Seguimiento** → Ver estado de solicitudes
5. **Historial** → Consultar solicitudes anteriores

### Para Administradores

1. **Gestión de Inventario** → Agregar/editar/eliminar máquinas
2. **Revisar Solicitudes** → Ver todas las solicitudes pendientes
3. **Aprobar/Rechazar** → Cambiar estados según disponibilidad
4. **Seguimiento** → Monitorear solicitudes activas

### Para Super Administradores

1. **Gestión de Usuarios** → Crear/editar/eliminar usuarios
2. **Control de Roles** → Asignar permisos de administrador
3. **Todas las funciones** → Acceso completo al sistema

## 🛡️ Seguridad

### Validaciones

- **Frontend**: Validación de formularios
- **Backend**: Validación de datos en controladores
- **Base de Datos**: Constraints y relaciones

### Autenticación

- Contraseñas hasheadas con bcryptjs
- Tokens JWT con expiración
- Middleware de verificación en rutas protegidas

### Autorización

- Control de acceso por roles
- Rutas protegidas según permisos

## 📱 API Endpoints

### Autenticación

- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Máquinas

- `GET /api/maquinas` - Listar máquinas
- `GET /api/maquinas/:id` - Obtener máquina por ID
- `POST /api/maquinas` - Crear máquina (admin/sysadmin)
- `PUT /api/maquinas/:id` - Actualizar máquina (admin/sysadmin)
- `DELETE /api/maquinas/:id` - Eliminar máquina (admin/sysadmin)

### Solicitudes

- `POST /api/solicitudes` - Crear solicitud
- `GET /api/solicitudes` - Listar solicitudes (admin/sysadmin)
- `GET /api/solicitudes/mis-solicitudes` - Mis solicitudes
- `GET /api/solicitudes/historial-solicitudes` - Historial del usuario
- `GET /api/solicitudes/historial-solicitudes-admin` - Historial completo (admin/sysadmin)
- `PUT /api/solicitudes/:id/estado` - Cambiar estado (admin/sysadmin)
- `DELETE /api/solicitudes/:id` - Eliminar solicitud (admin/sysadmin)
- `DELETE /api/solicitudes/:id/usuario` - Eliminar solicitud del usuario

### Usuarios

- `GET /api/users` - Listar usuarios (admin/sysadmin)
- `GET /api/users/:id` - Obtener usuario por ID (sysadmin)
- `POST /api/users` - Crear usuario (sysadmin)
- `PUT /api/users/:id` - Actualizar usuario (sysadmin)
- `DELETE /api/users/:id` - Eliminar usuario (sysadmin)

### Rutas Protegidas

- `GET /api/customer` - Acceso para usuarios logueados
- `GET /api/admin` - Acceso para admin/sysadmin
- `GET /api/sysadmin` - Acceso solo para sysadmin

## 🎯 Funcionalidades Implementadas

✅ **Sistema de autenticación completo**
✅ **Gestión de roles y permisos**
✅ **Catálogo de máquinas con CRUD**
✅ **Sistema de solicitudes de alquiler**
✅ **Panel de administración**
✅ **Gestión de usuarios (sysadmin)**
✅ **Interfaz responsive**
✅ **Validaciones frontend y backend**
✅ **Notificaciones de usuario**
✅ **Estados de solicitudes**
✅ **Historial de solicitudes**

## 🔧 Tecnologías Utilizadas

### Frontend

- React 19.1.1
- Vite 7.1.2
- React Bootstrap 2.10.10
- React Router DOM 7.5.1
- React Toastify 11.0.5
- Bootstrap Icons 1.11.6

### Backend

- Node.js
- Express 5.1.0
- Sequelize 6.37.7
- SQLite3 5.1.7
- JWT 9.0.2
- bcryptjs 3.0.2
- CORS 2.8.5

## 📝 Notas de Desarrollo

- El proyecto está estructurado como monorepo con frontend y backend separados
- La base de datos SQLite se inicializa automáticamente
- Todas las rutas están protegidas según los roles
- El sistema maneja estados de solicitudes: pendiente, aprobado, rechazado, finalizado
- La interfaz es completamente responsive y accesible

## 👥 Contribuidores
- Felipe Sbuttoni ( felipesbuttoni )  
- Tobías Anfuso ( tobiasanfuso ) 
- Agustín Reymundez ( AgusRey04 ) 
---

**AlquiMaq S.R.L** - Sistema de gestión de alquiler de máquinas de construcción
