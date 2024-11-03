export function useGoogleMapsLink() {
  function getLink(lat: number, lng: number) {
    return `https://www.google.com/maps/place/@${lat},${lng}`
  }
  return { getLink }
}
