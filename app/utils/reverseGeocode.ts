async function reverseGeocode(lat: number, lng: number) {
    const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
    const data = await res.json();
    return data;
}

export default reverseGeocode;