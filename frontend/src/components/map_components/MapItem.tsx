'use client'

import { Feature, Overlay } from "ol";
import Map from 'ol/Map';
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import React, { useEffect } from "react";
import * as olProj from 'ol/proj'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MapItem({id, map, coordinates, title, type}
  : 
  {id: number, map: Map, coordinates: number[], title: string, type: string}) {
    const router = useRouter()
    useEffect(() => {
      const shelterPoint = new Style({
        image: new Icon({
            scale: 0.1,
            anchor: [0.1, 0.1], // Anchor point for the icon (offset from center)
            src: "https://cdn-icons-png.flaticon.com/128/14035/14035769.png" // Path to your custom marker image (optional)
        })
      });

      const problemPoint = new Style({
        image: new Icon({
            scale: 0.1,
            anchor: [0.1, 0.1], // Anchor point for the icon (offset from center)
            src: 'https://cdn-icons-png.flaticon.com/128/14035/14035711.png' // Path to your custom marker image (optional)
        })
      });

      const collectPoint = new Style({
        image: new Icon({
            scale: 0.1,
            anchor: [0.1, 0.1], // Anchor point for the icon (offset from center)
            src: 'https://cdn-icons-png.flaticon.com/128/6162/6162025.png' // Path to your custom marker image (optional)
        })
      });

      const createPointFeature = (coordinates: Coordinate, style: Style) => {
        const pointGeometry = new Point(coordinates);
        const pointFeature = new Feature({ geometry: pointGeometry, name: title });
        pointFeature.setStyle(style);
      
        return pointFeature;
      };

      const addPointToMap = ({map, pointFeature} : {map : Map, pointFeature: Feature}) => {
          const vectorSource = new VectorSource({ features: [pointFeature] });
          const vectorLayer = new VectorLayer({ source: vectorSource });
        
          map.addLayer(vectorLayer);
      };

      const pointStyle = type === "shelter" ? shelterPoint : type === "collect" ? collectPoint : problemPoint;
        const pointFeature = createPointFeature(olProj.fromLonLat(coordinates), pointStyle);
        addPointToMap({map, pointFeature: pointFeature});

          const overlayContent = `
            Título: ${title} (${id}) <br>
            ${type === "shelter" ? "Ponto de Abrigo" : type === "collect" ? "Ponto de Coleta" : "Ponto de Problema"}
          `;
          const overlayClass = type === "shelter" ? "rgba(0, 255, 0, 0.8)" : type === "collect" ? "rgba(, 0, 255, 0.8)" : "rgba(255, 0, 0, 0.8)";

          const overlayContainer = document.createElement("div");
          overlayContainer.classList.add("popupOverlay");
          overlayContainer.innerHTML = overlayContent;
          overlayContainer.classList.add(overlayClass);

          const overlay = new Overlay({
            element: overlayContainer,
            offset: [8, -45],
            positioning: 'center-center',
            autoPan: true,
            stopEvent: true,
          });

          const spanIP = document.getElementById(`${id}`);
          if (spanIP) {
            const itemIPClass = type === "shelter" ? "interestShelter" : type === "collect" ? "interestCollect" : "interestProblem";
            spanIP.classList.remove("interestCollect", "interestShelter", "interestProblem");
            spanIP.classList.add(itemIPClass);
          }

          map.addOverlay(overlay);
    }, []);

    function mapItemFocus() {
      const view = map.getView()
      view.setZoom(18)
      view.setCenter(olProj.fromLonLat(coordinates))
  }
  
    return(
      <span onClick={mapItemFocus} className='flex flex-col font-bold listItem' style={{background: "rgba(131, 131, 131, 0.3)", borderRadius: "15px", padding:"10px", cursor: "pointer"}}>
          <p>Título: {title}</p>
          <p id={id.toString()} className={`itemIP`} >Tipo: </p>
      </span>
)
}