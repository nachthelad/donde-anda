# Etiquetas de rareza

## Objetivo

Hacer reconocibles los resultados especiales sin revelar el sistema antes del sorteo ni recargar la interfaz inspirada en el seguimiento de delivery.

## Comportamiento aprobado

- Los resultados comunes no muestran ninguna etiqueta.
- Los resultados raros muestran, debajo del titular: `✦ Solo el 15% de los deliveries termina en algo así`.
- Los resultados legendarios muestran, debajo del titular: `✦ Encontraste un secreto · Solo el 1% llega tan lejos`.
- El porcentaje describe la probabilidad de la categoría completa, no la probabilidad individual de esa escena.

## Presentación

- La etiqueta ocupa una sola línea cuando el ancho lo permite y puede envolver en pantallas angostas.
- Los raros usan un tratamiento violeta suave; los legendarios, un tratamiento dorado suave.
- La etiqueta se ubica entre el titular y la barra de progreso.
- El texto principal, los botones y la tarjeta no cambian de estructura.

## Implementación y pruebas

- Una función pura asigna texto y variante visual según la rareza.
- El componente sólo renderiza la etiqueta cuando esa función devuelve contenido.
- Las pruebas cubren `common`, `rare` y `legendary` y verifican los porcentajes aprobados.
- Se ejecutan test, lint, build y una revisión visual mobile antes del deploy.
