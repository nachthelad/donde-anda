# Compartir desde la palabra clave

## Objetivo

Convertir el bloque `MATE` y su icono en un segundo acceso para compartir el resultado sin alterar su aspecto ni reemplazar el botón exclusivo de X.

## Interacción

- En navegadores compatibles, al pulsar `MATE` se usa Web Share API para abrir el selector nativo del sistema con el resultado en primera persona y la URL del sitio.
- Si Web Share API no está disponible o falla por una razón distinta de la cancelación del usuario, se copia el mismo texto y enlace al portapapeles.
- Después de copiar, el texto del control cambia temporalmente a `¡Copiado!` y luego vuelve a `MATE`.
- Cancelar el selector nativo no se considera error y no activa el portapapeles.
- El botón grande mantiene su comportamiento actual: compartir directamente en X.

## Métricas

El endpoint existente acepta un origen validado:

- `x`: botón grande.
- `native`: palabra clave con share nativo o fallback de portapapeles.

Cada intento válido conserva los contadores existentes y además incrementa `donde-anda:shares:by-source`. No se almacenan texto libre, IP ni datos personales.

## Accesibilidad y diseño

- El control será un `button` real con nombre accesible.
- Mantendrá la forma, color y tamaño visual de la etiqueta actual.
- Tendrá estados de foco y pulsado coherentes con el resto de la interfaz.
- Durante la carga del resultado permanecerá deshabilitado.

## Manejo de errores

- La apertura del selector o la copia no dependen de que la métrica termine de escribirse.
- Un fallo de red o Redis no bloquea compartir.
- Si tampoco existe acceso al portapapeles, el control vuelve a `MATE` sin romper la pantalla.

## Verificación

- Pruebas unitarias para el texto compartido y la validación del origen en la API.
- Prueba del share nativo simulado y del fallback de portapapeles.
- `test`, `lint` y `build` completos.
- Prueba de producción del endpoint y comprobación del deploy de Vercel.
