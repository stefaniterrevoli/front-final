# Manual de Usuario — creAtiva

## Versión 1.0
## Plataforma de Comunidad Artística Latinoamericana

---

## Índice

1. [Introducción](#1-introducción)
2. [Requisitos Técnicos](#2-requisitos-técnicos)
3. [Registro e Inicio de Sesión](#3-registro-e-inicio-de-sesión)
4. [Navegación General](#4-navegación-general)
5. [Página de Inicio](#5-página-de-inicio)
6. [Obras](#6-obras)
7. [Eventos](#7-eventos)
8. [Creadores](#8-creadores)
9. [Noticias](#9-noticias)
10. [Perfil de Usuario](#10-perfil-de-usuario)
11. [Panel de Administración](#11-panel-de-administración)
12. [Buscador](#12-buscador)
13. [Roles y Permisos](#13-roles-y-permisos)
14. [Solución de Problemas Comunes](#14-solución-de-problemas-comunes)

---

## 1. Introducción

**creAtiva** es una plataforma digital diseñada para conectar a la comunidad artística latinoamericana. Su objetivo es ser un espacio donde creadores, artistas visuales y amantes del arte puedan:

- **Descubrir** obras de arte ilustraciones, pinturas y arte digital.
- **Explorar** eventos culturales como exposiciones, talleres y encuentros.
- **Conocer** creadores y seguir su trabajo.
- **Interactuar** mediante me gusta y comentarios en las obras.
- **Apoyar** económicamente a los creadores mediante donaciones y suscripciones.
- **Mantenerse informado** con noticias, convocatorias y lanzamientos.

La plataforma está construida como una aplicación web moderna (SPA) que se comunica con un servidor backend para almacenar y recuperar datos.

---

## 2. Requisitos Técnicos

- **Navegador web**: Google Chrome, Mozilla Firefox, Microsoft Edge o Safari (versiones actualizadas).
- **Conexión a internet**: necesaria para cargar la aplicación y los datos.
- **Resolución de pantalla**: optimizada para escritorio y dispositivos móviles.
- **URL de acceso**: la dirección proporcionada por el administrador del sistema (entorno local o servidor).
- **Cuenta de usuario**: necesaria para funciones interactivas (likes, comentarios, suscripciones, perfil).

---

## 3. Registro e Inicio de Sesión

### 3.1. Crear una cuenta (Registro)

1. Desde la pantalla de inicio, haz clic en **"Ingresar"** en la barra superior.
2. En la página de inicio de sesión, haz clic en el enlace **"Registrate aqui"**.
3. Completa el formulario de registro con los siguientes campos obligatorios:

| Campo | Descripción | Formato |
|---|---|---|
| Nombre | Tu nombre | Texto |
| Apellido | Tu apellido | Texto |
| Correo electrónico | Email válido | ejemplo@correo.com |
| Año de nacimiento | Debes ser mayor de 18 años | Número de 4 dígitos |
| Comuna | Tu comuna de residencia | Texto |
| Teléfono | Número de contacto | +569XXXXXXXX |
| Dirección | Tu dirección física | Texto |
| Contraseña | Mínimo 6 caracteres | Se muestra oculta |

4. Haz clic en el botón **"Registrarse"**.
5. Si todos los datos son correctos, serás redirigido a la página de inicio de sesión.
6. Si hay errores, verás mensajes en rojo indicando qué campos corregir.

> **Tip**: La contraseña debe tener al menos 6 caracteres. El teléfono debe comenzar con +569.

### 3.2. Iniciar sesión

1. Haz clic en **"Ingresar"** en la barra de navegación (esquina superior derecha).
2. Ingresa tu **correo electrónico** y **contraseña**.
3. Haz clic en **"Iniciar Sesión"**.
4. Si las credenciales son correctas, serás redirigido a la página de inicio.
5. Si el inicio de sesión falla, verás un mensaje de error. Verifica tus credenciales.

### 3.3. Cerrar sesión

1. Estando con sesión iniciada, haz clic en **"Cerrar Sesion"** en la barra de navegación (versión escritorio) o en el menú lateral (versión móvil).
2. La sesión se cerrará y volverás a la página de inicio como visitante.

---

## 4. Navegación General

### 4.1. Barra de navegación (escritorio)

En la parte superior de la pantalla encontrarás los siguientes enlaces:

- **Inicio** — vuelve a la página principal
- **Obras** — explora las obras de arte
- **Eventos** — eventos culturales disponibles
- **Creadores** — lista de artistas registrados
- **Noticias** — novedades de la plataforma
- **Buscador** — campo de búsqueda (ver sección 12)
- **Ingresar** / **[Perfil]** / **[Admin]** / **Cerrar Sesion** — según tu estado de sesión

### 4.2. Menú lateral (móvil)

En dispositivos móviles, la barra de navegación se reemplaza por un botón de menú (ícono de tres líneas). Al hacer clic se despliega un panel lateral con los mismos enlaces.

### 4.3. Footer (pie de página)

Al final de cada página se muestra un pie de página con el nombre de la plataforma y el año.

---

## 5. Página de Inicio

La página principal (`/`) es la puerta de entrada a la plataforma.

### 5.1. Carrusel de novedades

En la parte superior hay un carrusel que muestra automáticamente las últimas **noticias** y **eventos** registrados.

- Las diapositivas cambian automáticamente cada 5 segundos.
- Puedes navegar manualmente con las flechas **<** y **>**.
- Puedes saltar a una diapositiva específica haciendo clic en los **puntos indicadores**.
- Si pasas el mouse sobre el carrusel, la rotación se detiene temporalmente.
- Al hacer clic en una diapositiva:
  - **Evento**: te lleva a la página de eventos con el detalle abierto.
  - **Noticia**: te lleva a la página de noticias con la noticia abierta.
- Las noticias se identifican con un fondo de tonos verdes y los eventos con tonos naranja/rojo.

### 5.2. Tarjetas de información

Debajo del carrusel hay 6 tarjetas que describen las áreas principales de la plataforma:

1. **Explora Obras** — descubre ilustraciones, pinturas y arte digital
2. **Eventos Culturales** — exposiciones, talleres, encuentros con geolocalización
3. **Creadores** — conoce talentos, síguelos y apóyalos
4. **Comunidad** — interactúa con likes y comentarios
5. **Noticias** — entérate de novedades, convocatorias y lanzamientos
6. **Suscripciones** — suscríbete a tus creadores favoritos

### 5.3. Creadores destacados

En la parte inferior se muestra una cuadrícula con tarjetas de creadores. Desde aquí puedes:

- Ver su **nombre artístico** y **email**.
- **Suscribirte** a un creador (requiere iniciar sesión).
- **Donar** a un creador al que ya estés suscrito.
- **Cancelar suscripción** si ya estás suscrito.

---

## 6. Obras

La página de obras (`/obras`) muestra todas las obras de arte disponibles en la plataforma.

### 6.1. Explorar obras

- Las obras se muestran en una cuadrícula de tarjetas.
- Cada tarjeta muestra: imagen de portada, título, nombre del artista, **género** (etiqueta rosa), cantidad de likes y cantidad de comentarios.
- Si no hay obras, verás el mensaje "No hay obras aun."

### 6.2. Filtrar obras por género

En la parte superior de la página hay botones tipo "pill" para filtrar las obras por género:

1. Haz clic en **"Todas"** para ver todas las obras.
2. Haz clic en un género específico (Romance, Aventura, Acción, etc.) para ver solo las obras de ese género.
3. El botón seleccionado se resalta en color rosa.

### 6.3. Dar like a una obra

1. Haz clic en el ícono de **corazón** en la tarjeta de la obra (requiere iniciar sesión).
2. El corazón se llenará de color y el contador de likes aumentará.
3. Para quitar el like, vuelve a hacer clic en el corazón.

### 6.4. Ver detalle de una obra

1. Haz clic en cualquier tarjeta de obra para abrir el **popup de detalle**.
2. En el popup podrás ver:
   - Imagen de la obra a tamaño completo.
   - **Título**, **artista** y **género** (etiqueta rosa).
   - **Descripción** completa.
   - **Capítulos** con sistema de pago (ver sección 6.7).
   - Botón de **like** con contador.
   - **Sección de comentarios**.

### 6.5. Comentar en una obra

1. Abre el detalle de una obra (haz clic en su tarjeta).
2. Desplázate hasta la sección de comentarios.
3. Escribe tu comentario en el campo de texto.
4. Haz clic en el botón de enviar (ícono de avión de papel).
5. Tu comentario aparecerá en la lista con tu nombre y la fecha.

### 6.6. Reportar un comentario

1. Haz clic **derecho** sobre cualquier comentario.
2. Aparecerá un menú contextual con la opción **"Reportar comentario"**.
3. Selecciona esa opción.
4. Se abrirá un cuadro de diálogo pidiendo el **motivo** del reporte.
5. Ingresa el motivo y confirma.
6. El reporte será enviado a los administradores para su revisión.

### 6.7. Capítulos y sistema de pago

- Si la obra tiene capítulos, aparecerán en una cuadrícula dentro del detalle.
- **Requiere iniciar sesión** para ver los capítulos. Si no has iniciado sesión, verás el mensaje "Inicia sesión para ver los capítulos."
- **Capítulo 1**: es **gratis** y se muestra completo sin restricciones.
- **Capítulos 2+**: están bloqueados con un candado 🔒 y la imagen se ve borrosa. Para acceder a ellos:
  1. Haz clic en el capítulo bloqueado.
  2. Se abrirá un popup **"Adquirir capítulo"** con un mensaje de *simulación de pago*.
  3. Haz clic en **"$2.000"** para simular el pago.
  4. Verás una pantalla de confirmación 🔓 indicando que el capítulo fue adquirido.
  5. Haz clic en **"Ver capítulo"** para acceder al contenido completo.
- Las compras se guardan en tu navegador, por lo que al volver a la obra el capítulo quedará desbloqueado.

---

## 7. Eventos

La página de eventos (`/eventos`) muestra los eventos culturales disponibles.

### 7.1. Explorar eventos

- Los eventos se muestran en una cuadrícula de tarjetas.
- Cada tarjeta muestra: imagen, título, descripción breve, fecha y comuna.
- Si no hay eventos, verás "No hay eventos próximos."

### 7.2. Filtrar eventos

En la parte superior de la página hay una barra de filtros para encontrar eventos específicos:

- **Comuna**: selector desplegable con las **52 comunas de la Región Metropolitana**. Selecciona una comuna para ver solo los eventos en esa ubicación.
- **Desde / Hasta**: dos selectores de fecha para filtrar eventos por rango. Solo disponible para el año **2026**.
- **"Limpiar filtros"**: aparece cuando hay filtros activos, haz clic para volver a ver todos los eventos.

Los filtros se combinan entre sí. Por ejemplo, puedes buscar eventos en "Providencia" entre "01-06-2026" y "30-06-2026".

### 7.3. Ver detalle de un evento

1. Haz clic en cualquier tarjeta de evento para abrir el **popup de detalle**.
2. En el popup podrás ver:
   - Imagen del evento a tamaño completo.
   - **Título**, **fecha** y **ubicación**.
   - **Descripción** completa.
   - **Mapa interactivo** (si el evento tiene coordenadas):
     - Muestra un mapa con la ubicación del evento.
     - Puedes hacer zoom con los botones + y -.
     - El mapa usa OpenStreetMap (no requiere clave API).

---

## 8. Creadores

La página de creadores (`/creadores`) lista todos los artistas registrados en la plataforma.

### 8.1. Explorar creadores

- Los creadores se muestran en una cuadrícula de tarjetas.
- Cada tarjeta muestra: avatar (o inicial del nombre), nombre artístico y email.
- Si no hay creadores, verás "No hay creadores registrados."

### 8.2. Suscribirse a un creador

1. Asegúrate de haber iniciado sesión.
2. En la tarjeta del creador, haz clic en el botón **"Suscribirse"**.
3. El botón cambiará a **"Suscrito"** para indicar que ahora sigues a ese creador.

### 8.3. Cancelar suscripción

1. Estando suscrito a un creador, el botón mostrará **"Suscrito"**.
2. Haz clic en el botón **"Suscrito"** para cancelar la suscripción.
3. El botón volverá a mostrar **"Suscribirse"**.

### 8.4. Donar a un creador

1. Debes estar **suscrito** al creador (ver paso 8.2).
2. Haz clic en el botón **"Donar"** en la tarjeta del creador.
3. Se abrirá un popup con las opciones de donación:
   - Selecciona un monto: **$2,000** o **$5,000** (pesos chilenos).
   - Opcionalmente, escribe un **mensaje de apoyo**.
4. Haz clic en el botón **"Donar $X"**.
5. Verás una pantalla de confirmación: "Gracias por apoyar a [nombre del creador]".
6. Haz clic en **"Cerrar"** para volver a la lista de creadores.

---

## 9. Noticias

La página de noticias (`/noticias`) muestra las novedades publicadas por los administradores.

### 9.1. Leer noticias

- Las noticias se muestran en una lista vertical (una debajo de otra).
- Cada noticia incluye: imagen destacada (si tiene), título, fecha y contenido completo.
- Si no hay noticias, verás "No hay noticias aun."

### 9.2. Navegar desde el carrusel

Si hiciste clic en una noticia desde el carrusel de la página de inicio, serás llevado directamente a esa noticia con su contenido abierto en un popup.

---

## 10. Perfil de Usuario

La página de perfil (`/perfil`) está disponible solo para usuarios con sesión iniciada. Es tu espacio personal dentro de la plataforma.

### 10.1. Ver y editar perfil

- **Encabezado del perfil**: muestra tu foto de avatar, nombre, username y biografía.
- **Editar nombre**: haz clic en el ícono de lápiz junto a tu nombre, escribe el nuevo nombre y presiona Enter o haz clic fuera.
- **Editar username**: haz clic en el lápiz junto a tu username, edita y confirma.
- **Editar biografía**: haz clic en el lápiz junto al texto de biografía, escribe y confirma.
- **Cambiar avatar**: en la sección de imagen, ingresa la URL de una nueva imagen y haz clic en **"Cambiar"** o **"+"**.

### 10.2. Convertirse en creador

Si aún no eres un creador:

1. En tu perfil, verás una sección con el mensaje "Quieres compartir tu arte?" y un botón **"Convertirse en Creador!"**.
2. Haz clic en el botón.
3. Se abrirá un formulario modal con los siguientes campos:

| Campo | Obligatorio | Descripción |
|---|---|---|
| Nombre artístico | Sí | Máximo 250 caracteres |
| Red social | No | Máximo 50 caracteres (ej: @usuario) |
| Biografía | No | Máximo 500 caracteres |

4. Verás contadores de caracteres que se pondrán en rojo al acercarte al límite.
5. Haz clic en **"Ser Creador"** para confirmar.
6. Una vez creado, verás las secciones de estadísticas, seguidores y obras.

### 10.3. Subir obras (solo creadores)

1. En tu perfil, ve a la sección de **obras**.
2. Haz clic en **"+ Subir obra"**.
3. Completa el formulario:

| Campo | Obligatorio | Límite |
|---|---|---|
| Título | Sí | 200 caracteres |
| Descripción | Sí | 500 caracteres |
| Género | No | Seleccionar de la lista |
| Capítulos | No | Hasta 6 capítulos |

4. **Género**: selecciona el género de la obra del menú desplegable (Romance, Aventura, Acción, Fantasía, Paranormal, Ciencia Ficción, Drama, Comedia, Terror, Poesía, Otro). Esto ayuda a los usuarios a encontrar tu obra más fácilmente.
5. Para cada capítulo, ingresa un **título** y una **URL de imagen**.
6. Puedes ver la previsualización de la imagen antes de guardar.
7. Haz clic en **"Subir"** para enviar la obra.
8. La obra quedará en estado **"Pendiente"** hasta que un administrador la apruebe.
9. Una vez aprobada, aparecerá con el estado **"Publicada"**.
10. Si es rechazada, verás el estado **"Rechazada"**.

### 10.4. Editar obra existente

1. En tu perfil, en la sección de obras, haz clic en **"Editar"** en la obra que deseas modificar.
2. Se abrirá el formulario con los datos actuales.
3. Realiza los cambios y haz clic en **"Guardar"**.

### 10.5. Estadísticas (solo creadores)

Como creador, verás en tu perfil:

- **Obras publicadas**: cantidad total de obras que has subido.
- **Likes totales**: suma de todos los likes recibidos en tus obras.

### 10.6. Seguidores y seguidos (solo creadores)

- **Seguidores**: lista de usuarios que te siguen, con nombre y fecha en que comenzaron a seguirte.
- **Siguiendo**: lista de creadores a los que sigues, con nombre y fecha.

### 10.7. Donaciones recibidas (solo creadores)

Verás un listado de las donaciones que has recibido, incluyendo:

- Nombre del donante.
- Monto donado.
- Mensaje opcional.
- Fecha de la donación.

### 10.8. Ventas de capítulos (solo creadores)

Verás un listado de las ventas de capítulos, incluyendo:

- **Obra** y **capítulo** adquirido.
- Nombre del comprador.
- Monto ($2.000 por capítulo).
- Fecha de la compra.

### 10.9. Historial de reportes

En tu perfil puedes ver los comentarios que has reportado, incluyendo el contenido del comentario y el estado del reporte.

---

## 11. Panel de Administración

El panel de administración (`/admin`) está disponible solo para usuarios con **rol de administrador**. Es el centro de control de la plataforma.

### 11.1. Acceder al panel

1. Inicia sesión con una cuenta de administrador.
2. En la barra de navegación verás el enlace **"Admin"**.
3. Haz clic en **"Admin"** para acceder al panel.

### 11.2. Estructura del panel

El panel tiene **4 pestañas** en la parte superior. Al hacer clic en cada una se muestra su contenido.

---

### 11.3. Pestaña Reportes

Muestra los comentarios reportados por los usuarios.

**Para gestionar un reporte:**

1. Ve a la pestaña **"Reportes"**.
2. Verás una tabla con: contenido del comentario, usuario que reportó, fecha, motivo y estado.
3. Para **aprobar** un reporte: haz clic en el botón **"Aprobar"**. El reporte se marca como "publicada".
4. Para **rechazar** un reporte: haz clic en el botón **"Rechazar"**. El reporte se marca como "rechazada".
5. Los reportes resueltos se muestran en una sección aparte con su estado final.

---

### 11.4. Pestaña Obras

Muestra las obras de arte pendientes de aprobación.

**Para gestionar una obra:**

1. Ve a la pestaña **"Obras"**.
2. Verás una tabla con: título de la obra, nombre del artista y fecha de publicación.
3. Para **aprobar** una obra: haz clic en **"Aprobar"**. La obra quedará visible para todos los usuarios.
4. Para **rechazar** una obra: haz clic en **"Rechazar"**. La obra no será visible públicamente.
5. Las obras ya procesadas se muestran en una tabla de historial.

---

### 11.5. Pestaña Noticias

Permite crear, editar y eliminar noticias de la plataforma.

**Para crear una noticia:**

1. Ve a la pestaña **"Noticias"**.
2. Completa los campos:
   - **Título**
   - **URL de imagen** (opcional, con previsualización)
   - **Contenido**
3. Haz clic en **"Publicar"** o el botón equivalente.
4. La noticia aparecerá en la página de noticias y en el carrusel de inicio.

**Para editar una noticia:**

1. Busca la noticia en la lista existente.
2. Haz clic en **"Editar"**.
3. Modifica los campos deseados.
4. Guarda los cambios.

**Para eliminar una noticia:**

1. Busca la noticia en la lista existente.
2. Haz clic en **"Eliminar"**.
3. Confirma la eliminación en el diálogo emergente.
4. La noticia se eliminará permanentemente.

---

### 11.6. Pestaña Eventos

Permite crear, editar y eliminar eventos de la plataforma.

**Para crear un evento:**

1. Ve a la pestaña **"Eventos"**.
2. Completa los campos:
   - **Título**
   - **Descripción**
   - **URL de imagen** (opcional, con previsualización)
   - **Fecha**
   - **Ubicación** (el sistema intentará geocodificar automáticamente usando OpenStreetMap)
   - **Región**
3. Haz clic en **"Publicar"**.
4. El evento aparecerá en la página de eventos y en el carrusel de inicio.

**Para editar un evento:**

1. Busca el evento en la lista existente.
2. Haz clic en **"Editar"**.
3. Modifica los campos deseados.
4. Guarda los cambios.

**Para eliminar un evento:**

1. Busca el evento en la lista existente.
2. Haz clic en **"Eliminar"**.
3. Confirma la eliminación.
4. El evento se eliminará permanentemente.

---

## 12. Buscador

El buscador está disponible en la barra de navegación (escritorio) y en el menú lateral (móvil).

### 12.1. Cómo usar el buscador

1. Haz clic en el campo de búsqueda (ícono de lupa + texto "Buscar...").
2. Escribe una palabra clave (no distingue mayúsculas/minúsculas).
3. Los resultados aparecen automáticamente en un menú desplegable mientras escribes.

### 12.2. Qué se puede buscar

El buscador encuentra coincidencias en 4 categorías:

| Categoría | Campos que busca |
|---|---|
| **Eventos** | Título, descripción, ubicación |
| **Noticias** | Título, contenido |
| **Obras** | Título, nombre del artista, descripción |
| **Creadores** | Nombre artístico, email |

### 12.3. Resultados de búsqueda

- Los resultados se muestran **agrupados por categoría** con encabezados (Eventos, Noticias, Obras, Creadores).
- Dentro de cada categoría, los resultados están **ordenados alfabéticamente**.
- Se muestran hasta **8 resultados** en total.
- Cada resultado tiene una etiqueta de color que indica la categoría:
  - **Evento** — etiqueta ámbar
  - **Noticia** — etiqueta verde
  - **Obra** — etiqueta rosa
  - **Creador** — etiqueta azul
- Al hacer clic en un resultado, serás redirigido a la página correspondiente.
- Si no hay coincidencias, verás "Sin resultados".

### 12.4. Cerrar el buscador

- El menú de resultados se cierra automáticamente al hacer clic fuera del buscador.

---

## 13. Roles y Permisos

La plataforma tiene 4 niveles de acceso:

| Rol | Acceso | Funciones disponibles |
|---|---|---|
| **Visitante** | Sin sesión | Ver obras, eventos, creadores, noticias |
| **Usuario** | Sesión iniciada | Like, comentar, reportar, suscribirse, donar, perfil propio |
| **Creador** | Usuario + perfil de creador | Subir obras, estadísticas, seguidores, donaciones |
| **Administrador** | Cuenta admin | Panel de administración (reportes, obras, noticias, eventos) |

### Resumen por funcionalidad:

| Funcionalidad | Visitante | Usuario | Creador | Admin |
|---|---|---|---|---|
| Ver obras, eventos, creadores, noticias | ✓ | ✓ | ✓ | ✓ |
| Dar like a obras | | ✓ | ✓ | ✓ |
| Comentar en obras | | ✓ | ✓ | ✓ |
| Reportar comentarios | | ✓ | ✓ | ✓ |
| Suscribirse a creadores | | ✓ | ✓ | ✓ |
| Donar a creadores | | ✓ | ✓ | ✓ |
| Comprar capítulos | | ✓ | ✓ | ✓ |
| Ver perfil propio | | ✓ | ✓ | ✓ |
| Editar perfil | | ✓ | ✓ | ✓ |
| Subir obras | | | ✓ | |
| Ver estadísticas de creador | | | ✓ | |
| Gestionar reportes | | | | ✓ |
| Aprobar/rechazar obras | | | | ✓ |
| Crear/editar/eliminar noticias | | | | ✓ |
| Crear/editar/eliminar eventos | | | | ✓ |

---

## 14. Solución de Problemas Comunes

### No puedo iniciar sesión

- Verifica que tu correo electrónico y contraseña sean correctos.
- Asegúrate de haber activado tu cuenta (si aplica).
- Si olvidaste tu contraseña, contacta al administrador del sistema.

### No puedo registrarme

- Revisa que todos los campos obligatorios estén completos.
- Verifica que el correo electrónico tenga un formato válido.
- Asegúrate de ser mayor de 18 años.
- La contraseña debe tener al menos 6 caracteres.
- El teléfono debe tener el formato +569XXXXXXXX.

### No veo obras disponibles

- Puede que no haya obras publicadas aún o que ninguna esté aprobada.
- Los creadores deben subir obras y los administradores deben aprobarlas.

### No veo eventos o noticias

- Estas secciones se gestionan desde el panel de administración. Si no hay datos, contacta al administrador.

### El mapa de un evento no se muestra

- El mapa solo aparece si el evento tiene coordenadas asignadas. El creador del evento debe ingresar una ubicación válida para que se geocodifique automáticamente.

### No puedo donar a un creador

- Debes estar **suscrito** al creador para poder donar. Primero haz clic en "Suscribirse" y luego aparecerá el botón "Donar".

### No veo el botón de "Subir obra"

- Debes ser un **creador** registrado. Ve a tu perfil y haz clic en "Convertirse en Creador!" para crear tu perfil artístico.

### Mis obras aparecen como "Pendiente"

- Es normal. Un administrador debe revisar y aprobar cada obra antes de que sea visible públicamente. Espera a que un admin la apruebe.

### No puedo acceder al panel de administración

- El panel es exclusivo para cuentas con rol de administrador. Si crees que deberías tener acceso, contacta a otro administrador.

### El buscador no encuentra resultados

- Asegúrate de escribir correctamente la palabra clave.
- Los resultados dependen de los datos existentes en la plataforma.
- Si no hay datos (eventos, noticias, obras, creadores), el buscador no mostrará resultados.

### La página no carga correctamente

- Verifica tu conexión a internet.
- Intenta recargar la página (F5 o Ctrl+R).
- Prueba con otro navegador actualizado.
- Si el problema persiste, contacta al administrador del sistema.

---

## Contacto y Soporte

Para soporte técnico o consultas, contacta al administrador del sistema.

---

© 2026 creAtiva. Todos los derechos reservados.
