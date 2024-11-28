#Pre requisitos
1.Se necesita tener una cuenta creada en www.presenteprofe.cl para poder iniciar en la app

#Pasos para Ejecutar la Aplicación
1. Una vez descargado o clonado el repositorio, instalar las dependencias de npm con npm install -g @angular/cli
2. Una vez las dependencias estén instaladas, ejecutas el programa con ionic serve
3. El programa empezará a ejecutarse y te pedirá unos permisos por node js, aceptalos y se ejecutará la aplicación

#Como Funciona la Aplicación(alumno)
1. Aparecerás en la página para iniciar sesión, ahí debes ingresar tus datos, en caso de no estar registrado, no podras iniciar la aplicación.
2. En caso de que se le haya olvidado la contraseña, también podrá recuperarla en el apartado "Recuperar Contraseña" donde podra solicitar un correo con una nueva clave a su correo.
3. En el caso de registrase como alumno, será llevado a la página principal donde se le dará la bienvenida y podrá escanear un código QR.
3.1 al seleccionar scanear codigo qr solicitara permisos de camara y permitira scanear para marcar asistencia a la asignatura.
   
#Logeado como profesor
1 En el caso de registrarse como profesor, será llevado a la página de profesor donde tendra una barra de navegacion que le permite ir al home, ir a sus clases, ir a crear una nueva clase y finalmente un cerrar sesión.
2 Ir a sus clases mostrara un listado de todas las clases de la base de datos acompañado con su nombre, asignatura y imagen respectiva.
2.1 al seleccionar ir a clases mostrara una vista que te permite ver que dia se han impartido clases y puedes crear una nueva clase de esa materia generando un qr para que alumnos marquen asistencia.
3 Crear una nueva clase te lleva a un formulario donde deberas ingresar los datos de la nueva clase como: nombre, sigla, asignatura, sede, descripcion, al ingresar se almacenara en la base de datos.
4 Al seleccionar el Boton cerrar sesion, volvera nuevamente al iniciar sesion, cerrando credenciales.

