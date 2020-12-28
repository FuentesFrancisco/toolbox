Backend deploy en heroku: https://toolbox-challenge.herokuapp.com/ \
Frontend deploy en firebase: https://toolbox-challenge.web.app/ \

Pasos para correr con docker: \
1-clonar el repositorio  \
2-parados en la raiz del proyecto ejecutar docker-compose up \
3-ejecutar el proyecto. en http://localhost/ se encuentra el front end y en localhost:3001 se encuentra el backend corriendo \

Pasos para correr el frontend y el backend por separado: \

1-clonar el repositorio \
2-parados desde el root del proyecto, cd client \
3-npm install \
4-npm start, abrira el proyecto en localhost:8080 \
4-parados desde el root del proyecto, cd api \
5-npm install \
6-npm start, abrira el proyecto con nodemon en localhost:3001 \

Otros comandos:  \

Dentro de la carpeta api, ejecutando npm test, comprobara standard js y ejecutara los test de mocha. \
Dentro de la carpeta client, ejecutando npm test, ejecutara los test de jest. Tambien puede ejecutar npm run build y en la carpeta dist se encontrara la version de produccion de la app de react \

Extra: \
Dentro de la carpeta client, en el archivo axios.js se encuentra la baseurl de las peticiones asyncronas al backend. Modificando dicha ruta en este archivo, se modificaran todas las peticiones al back end
