
# 📱 ¿Qué Me Pongo? – App Móvil (Frontend)

**¿Qué Me Pongo?** es una aplicación móvil desarrollada con **React Native** que permite a los usuarios gestionar su ropa, subir imágenes, y generar outfits automáticamente según el clima.  
Con una interfaz simple e intuitiva, los usuarios pueden registrar prendas, visualizar combinaciones sugeridas y acceder al historial de outfits generados.

> 🔗 Repositorio del Backend (NestJS): [https://github.com/jocesman/que-me-pongo](https://github.com/jocesman/que-me-pongo)

---

## 🚀 Tecnologías utilizadas

- **React Native** (CLI)
- **TypeScript**
- **React Navigation**
- **AsyncStorage**
- **Cloudinary** (para imágenes)
- **@env** (para variables de entorno)
- **Native Stack Navigator**
- **react-native-image-picker**
- **@react-native-picker/picker**

---

## 📲 Funcionalidades principales

- ✍️ Registro e inicio de sesión con validación
- 📤 Subida de imágenes desde la galería
- 🧥 Agregar, editar y eliminar prendas
- 🎲 Generación de outfits según el clima (frío, calor, templado, lluvia)
- 🖼 Historial de outfits generados
- 🔐 Autenticación persistente con `AsyncStorage`
- 🌤 Selector de clima personalizado

---

## ⚙️ Requisitos previos

- Node.js >= 18
- React Native CLI
- Android Studio y/o Xcode configurado
- Emulador o dispositivo real conectado

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/jocesman/que-me-pongo.git
cd que-me-pongo/frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del frontend con la siguiente variable:

```env
API_URL=http://<TU_IP_LOCAL>:3000
```

> ℹ️ Usa tu IP local para conectarte al backend desde el emulador o dispositivo (ej. `http://192.168.1.100:3000`).

4. Limpia el caché de metro bundler:

```bash
npx react-native start --reset-cache
```

---

## ▶️ Ejecución

### En Android

```bash
npx react-native run-android
```

### En iOS (Mac + Xcode)

```bash
npx react-native run-ios
```

---

## 🧭 Estructura de navegación

```
screens/
├── SplashScreen.tsx         // Verifica sesión activa
├── AuthScreen.tsx           // Login con validación
├── RegisterScreen.tsx       // Registro de usuario
├── MainScreen.tsx           // Generador de outfit e historial
├── AddPrendaScreen.tsx      // Agregar prenda + imagen
├── EditPrendaScreen.tsx     // Editar nombre/tipo/abrigo
└── ManagePrendasScreen.tsx  // Lista para editar y eliminar
```

---

## 🌦 Generación de outfits inteligentes

En la pantalla principal, el usuario selecciona el clima y la app hace una solicitud a:

```http
POST /outfit/generate
```

La respuesta contiene un outfit generado según las reglas del backend.

---

## 🛡️ Manejo de sesión

La sesión se guarda en `AsyncStorage` y se verifica en cada arranque de la app desde `SplashScreen.tsx`.  
El token se envía en el header `Authorization` en cada solicitud protegida.

---

## 🖼 Subida de imágenes

Las imágenes seleccionadas desde la galería se suben a Cloudinary a través del backend.  
Soporta formatos `.jpg`, `.png` y tamaños de hasta 5MB.

---

## 🐞 Depuración

Para ver los logs:

```bash
npx react-native log-android
```

Si usas un emulador y tienes problemas de conexión:

- Asegúrate de usar tu IP local (no `localhost`).
- Permite tráfico de red en el backend (`CORS` en `.env` con `ALLOWED_ORIGINS`).

---

## 📌 Notas adicionales

- El clima **no se guarda** en la prenda, solo se usa como parámetro para generar outfits.
- Puedes reiniciar sesión eliminando el token manualmente desde AsyncStorage o cerrando sesión desde la app.

---

## ✍️ Autor

**José Céspedes** – [@jocesman](https://github.com/jocesman)  
Frontend desarrollado como complemento del backend NestJS.

---

## 📃 Licencia

Este proyecto está bajo la Licencia MIT.
