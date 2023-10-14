export function concactBaseUrl(baseUrl: string, url: string): string {
  return baseUrl.concat(url);
}

export function objectToString(o: Object): string {
  return Object.values(o).toString();
}
