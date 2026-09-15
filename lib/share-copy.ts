export function toShareHeadline(headline: string): string {
  return headline
    .replace(/^Tu delivery/, "Mi delivery")
    .replace(/^Tu repartidor/, "Mi repartidor");
}

export function buildShareText(headline: string): string {
  return `${toShareHeadline(headline)}. ¿Dónde anda el tuyo?`;
}
