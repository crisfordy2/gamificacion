# Gamificación DevOps.

Este es el proyecto de la empresa **DevOps** de Gamificación. Aquí encontrarán <br> el código que sostiene la aplicación, junto con la explicación de su funcionalidad.

Esta aplicación fue basada en Node, así que para hacer uso del código, tendrán que <br> primero reconstruir los módulos de Node con el comando:
```npm install```. Para entender más <br> acerca de Node, pueden leer su [documentación oficial](https://nodejs.org/es/docs/).

## Estructuración.
La organización de las carpetas en una aplicación es importante, por ende, diseñamos una tabla <br> para explicar mejor cómo están creados los módulos y saber dónde se van a ubicar futuros <br> bloques de código, esto además, ayuda a la mantenibilidad de la aplicación. La estructura es la siguiente:

| Carpeta  | Descripción breve |
| ------------- |:-------------:|
| Controllers      | Aquí es donde se aplica la lógica del código. La conexión de la app con el modelo de negocio.|
| Models      | Archivo de configuración del servidor. Ejemplo: Conexión a la BD.     |
| Public      | Archivos que sirven para el diseño de la aplicación. Ejemplo: Estilos/CSS |
|    Pages    |  Pages/Views that you are going to render in your application.  |
| Routes | Las rutas que alcanzan nuestra aplicación. Ejemplo: gamificación/login |
| Views | Páginas actuales de la aplicación que son renderizadas, cómo el landing page. |

<br>

> **Nota**: Hay otros archivos como el archivo de configuración `.env` que contiene información sensible <br> tales como el número del puerto donde la app está corriendo entre otras cosas. Modificar esto con cuidado.

## Qué es gamificación y que verás dentro. 

Para contextuar qué es gamificación, nos hemos dirigido a [esta definición](https://www.educaciontrespuntocero.com/noticias/gamificacion-que-es-objetivos/), que nos indica:

> La gamificación es una técnica de aprendizaje que **traslada la mecánica de los juegos** al ámbito <br> educativo-profesional con el fin de conseguir mejores resultados.

Básicamente el objetivo de la gamificación es hacer que el aprendizaje sea más divertido, e incentive <br> a más estudiantes. Si eres una persona que se te dificulta un poco la enseñanza, prueba  utilizando <br> este método para que obtengas mejores resultados.

Los profesores tendrán la facultad de asignar actividades, ya sean grupales o individuales. Los <br> estudiantes podrán crear sus empresas para las actividades grupales. En base a esto, cada actividad <br> entregada representará aparte de la nota, unos ECoins, que luego se podrán canjear por exquisitas <br> recompensas.

Los estudiantes podrán matricularse a cursos, y ver las actividades que tienen pendientes y poder <br> envíar los entregables para ser calificados. Por otro lado, los profesores tendrán una tabla con las notas <br> de los respectivos estudiantes en el semestre.

<hr>

### Espacio para desarrolladores.

Para los desarrolladores, tenemos este apartado dónde explicaremos ciertos aspectos técnicos a tener <br> en cuenta. 

Para empezar, esta es una aplicación de SSR (Server-Side Rendering). La definición básicamente es que del <br> lado del cliente se realiza tanto cómo las operaciones del servidor  cómo la renderización de las páginas <br> que se verán en el navegador de internet. Si quieres ampliar este conocimiento, puedes visitar este [link](https://lemoncode.net/lemoncode-blog/2018/5/13/server-side-rendering-i-conceptos).

Se utiliza cómo base de datos MySQL, por lo que si lo quieren primero testear localmente, se tiene que usar <br> `xampp/wamp`, se utiliza librerías cómo <i>bootstrap, jquery</i> entre otras, aunque están importadas por CDN que <br> nos ahorra la instalación manual.

Cabe destacar que para poder manejar las vistas, deberán tener conocimiento en el motor de renderizado <br> `ejs`, su documentación la encontrarán aquí: [EJS Documentation](https://ejs.co/#install).

## Notas finales.

* Si desean, pueden añadirle más funcionalidad tanto cómo a los profesores, cómo a <br> los mismos estudiantes.

* Pueden cambiar el enfoque de Server Side Rendering a una SPA como React o Angular.

* Se puede migrar de base de datos por si gusta más MongoDB, pero tendrás que configurarlo <br> también en la aplicación. Encargarse de la conexión y otras cosas.

* Y si te gustó todo nuestro trabajo, por favor calificanos con una estrellita en el repositorio de <br> GitHub. ¡Estaremos agradecidos!