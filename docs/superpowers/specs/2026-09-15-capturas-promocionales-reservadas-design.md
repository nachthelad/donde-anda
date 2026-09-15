# Capturas promocionales reservadas

## Objetivo

Crear cuatro imágenes verticales para promocionar `donde-anda.vercel.app` en X:

- tres capturas falsas de resultados raros nuevos;
- un teaser de un resultado secreto del 1%.

Las escenas nuevas se guardarán como material reservado para una posible incorporación futura como easter eggs, pero no formarán parte del sorteo diario ni modificarán sus probabilidades actuales.

## Formato visual

- Usar el recorte aprobado **A: captura creíble**.
- Mantener suficiente mapa para dar contexto, seguido por el ícono y la tarjeta completa del resultado.
- Reproducir la interfaz actual del sitio, incluida la barra de progreso, la moto, la clave y la etiqueta violeta de rareza.
- Generar piezas verticales aptas para adjuntar a publicaciones en X.
- No añadir marco publicitario, logo extra ni texto promocional externo a la interfaz.

## Escenas promocionales

### Presidente de mesa

Texto:

> Tu repartidor quedó de presidente de mesa en una votación

Visual del ícono: repartidor en una mesa electoral con urna, padrón, fiscales y el pedido apoyado al costado.

Mapa especial: entorno urbano con patio escolar y una institución ficticia llamada **Escuela República del Delivery**. El pin debe aparecer junto a la entrada.

### Marcha

Texto:

> Tu repartidor está marchando por el derecho a cruzar la calle

Visual del ícono: repartidor al frente de una manifestación pequeña, todavía cargando el pedido.

Mapa especial: versión ilustrada y simplificada de la zona del **Congreso Nacional** y Plaza del Congreso, con la escena ubicada sobre una avenida cercana. No se busca reproducir cartografía exacta.

### Control en Chascomús

Texto:

> Tu repartidor fue demorado en un control vehicular en Chascomús

Visual del ícono: control de ruta revisando la moto y el pedido, con señalización de Chascomús.

Mapa especial: borde reconocible de la **Laguna de Chascomús**, acceso de ruta, trama de calles más abierta y punto de control junto al ícono.

## Teaser secreto

- Usar el mismo recorte y estructura visual que las capturas raras.
- No revelar el titular, el ícono ni cuál de los resultados legendarios existe.
- Mostrar como único remate legible:

> ✦ Encontraste un secreto · Solo el 1% llega tan lejos

- El resto de la escena debe sugerir que hay contenido oculto sin inventar una cuarta escena revelada.

## Archivos reservados

- Guardar los tres mapas y tres íconos con nombres estables dentro de una carpeta promocional separada de los assets activos.
- Guardar un pequeño manifiesto con ID, texto, rareza propuesta y rutas de assets.
- Marcar cada entrada como `promo-reserved`.
- No importar el manifiesto desde `data/scenes.ts` ni alterar el algoritmo `84% / 15% / 1%`.

## Exportación

Entregar cuatro PNG finales:

1. presidente de mesa;
2. marcha frente al Congreso;
3. control vehicular en Chascomús;
4. teaser secreto del 1%.

Además, conservar los assets fuente separados para que puedan reutilizarse si las escenas se incorporan al juego.

## Validación

- Comparar cada pieza con la interfaz publicada para conservar tipografía, espaciado y jerarquía.
- Verificar que los textos completos sean legibles en una vista móvil del feed.
- Confirmar que los mapas especiales no tengan labels superpuestos con sus íconos.
- Confirmar que ningún asset reservado sea servido o seleccionado por la experiencia pública.
- Revisar que el teaser no revele textos ni ilustraciones de los dos resultados legendarios existentes.
