import { useLocation } from "react-router-dom";
import MapComponent from "./Map";

function MapPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultLat = 52.52;
  const defaultLng = 13.405;
  const defaultAddress = "Berlin, Germany";
  const defaultDescription = "Default location";

  const lat = parseFloat(params.get("lat") || defaultLat.toString());
  const lng = parseFloat(params.get("lng") || defaultLng.toString());
  const address = params.get("address") || defaultAddress;
  const description = params.get("description") || defaultDescription;

  return (
    <MapComponent
      latitude={lat}
      longitude={lng}
      address={address}
      description={description}
    />
  );
}

export default MapPage;
