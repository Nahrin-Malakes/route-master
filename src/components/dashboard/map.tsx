import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { type Address } from "@prisma/client";
import { RoutingMachine } from "./routing-machine";

interface MapProps {
  addresses: Address[];
}

const getCustomIcon = (number: number) =>
  L.divIcon({
    className: "custom-icon",
    html: `<div class="custom-icon-inner">${number}</div>`,
  });

export default function Map({ addresses }: MapProps) {
  return (
    <MapContainer
      center={{ lat: 32.0676, lng: 34.78227 }}
      zoom={10}
      style={{ height: "80vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {addresses.map((address) => (
        <Marker
          key={address.id}
          position={{
            lat: Number(address.coords.split(",")[0]),
            lng: Number(address.coords.split(",")[1]),
          }}
          icon={getCustomIcon(1)}
        >
          <Popup>
            {address.street}, {address.city}
          </Popup>
        </Marker>
      ))}
      <RoutingMachine />
    </MapContainer>
  );
}
