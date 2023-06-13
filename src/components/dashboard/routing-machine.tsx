import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

import { api } from "@/utils/api";

const createRoutineMachineLayer = () => {
  const instance = L.Routing.control({
    waypoints: [],
    lineOptions: {
      styles: [{ color: "#FF0000", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  console.log(instance);

  return instance;
};

export const RoutingMachine = createControlComponent(createRoutineMachineLayer);
