import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type MapComponentProps = {
  latitude: number;
  longitude: number;
  address?: string;
  description?: string;
};

export default function MapComponent({
  latitude,
  longitude,
  address = "Unknown Address",
  description = "No Description",
}: MapComponentProps) {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const lat = parseFloat(params.get("lat") || latitude.toString());
  const lng = parseFloat(params.get("lng") || longitude.toString());
  const mapAddress = params.get("address") || address;
  const mapDescription = params.get("description") || description;

  return (
    <div className="map-container" style={{ height: "90vh", width: "100%" }}>
      <MapContainer
        center={[lat, lng] as L.LatLngExpression}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng] as L.LatLngExpression}>
          <Popup>
            <div>
              <h3>{mapDescription}</h3>
              <p>{mapAddress}</p>
              <p>Latitude: {lat.toFixed(4)}</p>
              <p>Longitude: {lng.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
