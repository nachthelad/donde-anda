export function toShareHeadline(headline: string): string {
  return headline
    .replace(/^Tu delivery/, "Mi delivery")
    .replace(/^Tu repartidor/, "Mi repartidor");
}
