export type Rarity = "common" | "rare" | "legendary";

export type Scene = {
  id: string;
  headline: string;
  icon: string;
  iconSrc?: string;
  sprite?: { src: string; index: number };
  rarity: Rarity;
  alt: string;
};

export const scenes: readonly Scene[] = [
  { id: "mate-stop", headline: "Tu repartidor paró a cebarse unos mates", icon: "🧉", iconSrc: "/icons/carpincho-delivery.png", rarity: "common", alt: "Carpincho en moto tomando mate" },
  { id: "purple-light", headline: "Tu repartidor espera que el semáforo se ponga violeta", icon: "🚦", sprite: { src: "/icons/sprite-common-a.png", index: 0 }, rarity: "common", alt: "Semáforo con luz violeta" },
  { id: "side-quest", headline: "Tu repartidor aceptó una misión secundaria", icon: "⚔️", sprite: { src: "/icons/sprite-common-a.png", index: 1 }, rarity: "common", alt: "Espada sobre una caja de delivery" },
  { id: "endless-roundabout", headline: "Tu repartidor quedó atrapado en una rotonda infinita", icon: "🔄", sprite: { src: "/icons/sprite-common-a.png", index: 2 }, rarity: "common", alt: "Moto girando en una rotonda infinita" },
  { id: "pigeon-shortcut", headline: "Tu repartidor sigue a una paloma que conoce un atajo", icon: "🐦", sprite: { src: "/icons/sprite-common-a.png", index: 3 }, rarity: "common", alt: "Paloma indicando un camino" },
  { id: "wrong-castle", headline: "Tu repartidor confundió tu edificio con un castillo", icon: "🏰", sprite: { src: "/icons/sprite-common-a.png", index: 4 }, rarity: "common", alt: "Castillo pequeño en el mapa" },
  { id: "endless-street", headline: "Tu repartidor está cruzando una calle que no termina", icon: "♾️", sprite: { src: "/icons/sprite-common-a.png", index: 5 }, rarity: "common", alt: "Ruta con forma de infinito" },
  { id: "ghost-sube", headline: "Tu repartidor ayuda a un fantasma que se quedó sin SUBE", icon: "👻", sprite: { src: "/icons/sprite-common-a.png", index: 6 }, rarity: "common", alt: "Fantasma sosteniendo una tarjeta" },
  { id: "troll-toll", headline: "Tu repartidor está negociando el peaje con un troll", icon: "🧌", sprite: { src: "/icons/sprite-common-b.png", index: 0 }, rarity: "common", alt: "Troll cobrando un peaje" },
  { id: "painted-tunnel", headline: "Tu repartidor entró a un túnel dibujado en la pared", icon: "🕳️", sprite: { src: "/icons/sprite-common-b.png", index: 1 }, rarity: "common", alt: "Túnel pintado sobre una pared" },
  { id: "dragon-bridge", headline: "Tu repartidor espera que pase el dragón del puente", icon: "🐉", sprite: { src: "/icons/sprite-common-b.png", index: 2 }, rarity: "common", alt: "Dragón cruzando un puente" },
  { id: "retiree-race", headline: "Tu repartidor fue desafiado a una carrera por un jubilado", icon: "🏁", sprite: { src: "/icons/sprite-common-b.png", index: 3 }, rarity: "common", alt: "Bandera de carrera junto a una moto" },
  { id: "wild-carts", headline: "Tu repartidor está esquivando carritos salvajes", icon: "🛒", sprite: { src: "/icons/sprite-common-b.png", index: 4 }, rarity: "common", alt: "Carrito de supermercado en movimiento" },
  { id: "century-detour", headline: "Tu repartidor tomó un atajo por el siglo XV", icon: "⏳", sprite: { src: "/icons/sprite-common-b.png", index: 5 }, rarity: "common", alt: "Reloj de arena sobre el camino" },
  { id: "ufo-parking", headline: "Tu repartidor estacionó atrás de un ovni", icon: "🅿️", sprite: { src: "/icons/sprite-common-b.png", index: 6 }, rarity: "common", alt: "Ovni estacionado" },
  { id: "gps-argument", headline: "Tu repartidor está discutiendo con el GPS", icon: "💢", sprite: { src: "/icons/sprite-mixed.png", index: 0 }, rarity: "common", alt: "GPS enojado" },
  { id: "penguin-protest", headline: "Tu repartidor encontró un piquete de pingüinos", icon: "🐧", sprite: { src: "/icons/sprite-mixed.png", index: 1 }, rarity: "common", alt: "Pingüino detrás de una barricada" },
  { id: "robot-parade", headline: "Tu repartidor espera que pase la procesión de robots", icon: "🤖", sprite: { src: "/icons/sprite-mixed.png", index: 2 }, rarity: "common", alt: "Robot caminando por la calle" },
  { id: "wedding-godfather", headline: "Tu repartidor fue nombrado padrino de un casamiento", icon: "💍", sprite: { src: "/icons/sprite-mixed.png", index: 3 }, rarity: "common", alt: "Anillo junto a una caja de delivery" },
  { id: "wrong-dimension", headline: "Tu repartidor busca tu dirección en otra dimensión", icon: "🌀", sprite: { src: "/icons/sprite-mixed.png", index: 4 }, rarity: "common", alt: "Portal pequeño en el mapa" },
  { id: "alien-competition", headline: "Tu repartidor fue abducido por la competencia", icon: "🛸", iconSrc: "/icons/ufo-delivery.png", rarity: "rare", alt: "Ovni llevándose un pedido" },
  { id: "general-paz-nation", headline: "Tu repartidor declaró independiente la General Paz", icon: "🛣️", sprite: { src: "/icons/sprite-mixed.png", index: 5 }, rarity: "rare", alt: "Autopista con una bandera" },
  { id: "dragon-tip", headline: "Tu repartidor discute la propina con un dragón", icon: "🐲", sprite: { src: "/icons/sprite-mixed.png", index: 6 }, rarity: "rare", alt: "Dragón sosteniendo una factura" },
  { id: "alien-inspection", headline: "Tu repartidor fue demorado por inspectores alienígenas", icon: "👽", iconSrc: "/icons/alien-inspector.png", rarity: "rare", alt: "Alienígena con una planilla" },
  { id: "delivery-clones", headline: "Tu repartidor se clonó y ninguno sabe cuál es el original", icon: "👥", iconSrc: "/icons/delivery-clones.png", rarity: "rare", alt: "Dos repartidores idénticos" },
  { id: "time-machine", headline: "Tu repartidor está recalculando la línea temporal", icon: "🕰️", iconSrc: "/icons/time-machine.png", rarity: "rare", alt: "Máquina del tiempo compacta" },
  { id: "giant-capybara", headline: "Tu repartidor fue adoptado por un carpincho gigante", icon: "🦫", iconSrc: "/icons/capybara-hug.png", rarity: "rare", alt: "Carpincho gigante junto a una moto" },
  { id: "plaza-mayor", headline: "Tu repartidor fue elegido intendente de una plaza", icon: "🎖️", iconSrc: "/icons/mayor.png", rarity: "rare", alt: "Repartidor con banda de intendente" },
  { id: "may-revolution", headline: "Tu repartidor llegó, pero a la Argentina de 1810", icon: "☀️", iconSrc: "/icons/argentina-1810.png", rarity: "legendary", alt: "Moto frente a un cabildo antiguo" },
  { id: "multiverse-delivery", headline: "Tu repartidor ahora entrega en todos los universos a la vez", icon: "🌌", iconSrc: "/icons/multiverse.png", rarity: "legendary", alt: "Moto atravesando varios universos" },
] as const;

export const scenesByRarity = {
  common: scenes.filter((scene) => scene.rarity === "common"),
  rare: scenes.filter((scene) => scene.rarity === "rare"),
  legendary: scenes.filter((scene) => scene.rarity === "legendary"),
} as const;
