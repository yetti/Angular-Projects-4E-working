export interface Coordinates {
  lat: number;
  lng: number;
}

/** Parses a `"latitude, longitude"` string, as returned by the addTicket tool. */
export function parseCoordinates(location: string): Coordinates {
  const [lat, lng] = location.split(',');

  return { lat: Number(lat), lng: Number(lng) };
}
