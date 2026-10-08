SOPLA NUCAS O MUERDE ALMOHADAS — v2
====================================

Incluye:
- Portada gráfica original integrada.
- 3 en raya con tablero visual 3D.
- Tableros 3x3, 4x4 y 5x5.
- 3 jugadores en partidas locales de 4x4 y 5x5.
- Él sopla nucas = cabeza de tortuga.
- El muerde almohadas = almeja abierta.
- CPU = cabeza de robot.
- Música de suspenso generada con Web Audio.
- Grito de miedo cuando pierde Muerde almohadas.
- Risa malévola cuando gana Sopla nucas.
- Sonido de robot descomponiéndose cuando pierde la CPU.
- Interfaz responsive para computadora, tableta y móvil.
- Modo online mediante WebSocket y salas con código.
- No requiere archivos de audio ni librerías en el navegador.

JUEGO LOCAL
------------
Puedes abrir index.html directamente para jugar contra la CPU o en local.

JUEGO EN LÍNEA
--------------
El modo online necesita ejecutar el servidor Node.js incluido.

1. Instala Node.js 18 o superior.
2. Abre una terminal dentro de esta carpeta.
3. Ejecuta: npm install
4. Ejecuta: npm start
5. Abre http://localhost:3000
6. En una computadora crea una sala y comparte el código de 6 caracteres.
7. El segundo jugador abre la misma dirección y usa "Jugar en línea" > "Unirse".

PARA PUBLICARLO EN INTERNET
---------------------------
Sube esta carpeta a un servicio que soporte Node.js y WebSocket. El servidor usa
la variable de entorno PORT si el proveedor la define.

NOTA SOBRE LAS REGLAS
---------------------
3x3: gana con 3 consecutivas.
4x4 y 5x5: se mantiene la regla de 3 consecutivas. En local pueden jugar 3 personas.
En modo online la versión incluida conecta 2 jugadores.

CONTROLES
---------
Ratón o toque en pantalla. La música se activa después de una interacción del usuario
por las restricciones de reproducción automática de los navegadores.
