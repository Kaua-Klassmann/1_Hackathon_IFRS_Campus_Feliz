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
import { toast } from "react-toastify";

export default function MapItem({id, map, coordinates, title, type, multiplier}
  : 
  {id: number, map: Map, coordinates: number[], title: string, type: number, multiplier?: number}) {

    useEffect(() => {
      const shelterPoint = new Style({
        image: new Icon({
            scale: 0.1,
            anchor: [0.1, 0.1],
            src: "https://cdn-icons-png.flaticon.com/128/14035/14035769.png"
        })
      });

      const collectPoint = new Style({
        image: new Icon({
            scale: 0.1,
            anchor: [0.1, 0.1],
            src: 'https://cdn-icons-png.flaticon.com/128/6162/6162025.png'
        })
      });

      const controlPoint = new Style({
        image: new Icon({
            scale: 0.1,
            anchor: [0.1, 0.1],
            src: 'https://cdn-icons-png.flaticon.com/128/16396/16396073.png'
        })
      });

      const criticalPoint = new Style({
        image: new Icon({
            scale: multiplier ? multiplier*0.1 : 0.1,
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: 'https://cdn-icons-png.flaticon.com/128/14035/14035711.png'
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

      const pointStyle = type === 2 ? shelterPoint : type === 3 ? controlPoint : type === 1 ? collectPoint : criticalPoint;
        const pointFeature = createPointFeature(olProj.fromLonLat(coordinates), pointStyle);
        addPointToMap({map, pointFeature: pointFeature});

          const overlayContent = `
            Título: ${title} (${id}) <br>
            ${type === 2 ? "Ponto de Abrigo" : type === 3 ? "Ponto de Controle" : type === 1 ? "Ponto de Coleta" : "Ponto Critico"}
          `;
          const overlayClass = type === 2 ? "bg-[rgba(0,255,0,0.8)]" : type === 3 ? "bg-[rgba(255,255,0,1)]" : type === 1 ? "bg-[rgba(0,0,255,0.8)]" : "bg-[rgba(255,0,0,0.8)]";

          const overlayContainer = document.createElement("div");
          overlayContainer.classList.add("popupOverlay");
          type === 3 ? overlayContainer.classList.add("text-black") : null;
          overlayContainer.innerHTML = overlayContent;
          overlayContainer.classList.add(overlayClass);

          const overlay = new Overlay({
            element: overlayContainer,
            offset: [8, -45],
            positioning: 'center-center',
            autoPan: true,
            stopEvent: true,
          });

          const spanType = document.getElementById(`${id}`);
          if (spanType) {
            const itemTypeClass = type === 2 ? "interestShelter" : type === 3 ? "interestControl" : type === 1 ? "interestCollect" : "interestCritical";
            spanType.classList.remove("interestCollect", "interestShelter", "interestControl", "interestCritical");
            spanType.classList.add(itemTypeClass);
          }

          map.on('pointermove', (evt) => {
            const hoveredFeature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
          
            if (hoveredFeature === pointFeature) {
              overlay.setPosition(olProj.fromLonLat(coordinates))
            } else {
              overlay.setPosition(undefined)
            }
          });

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
          <p id={id.toString()} className={`interestPoint`} >Tipo: {type == 2 ? "Ponto de Abrigo" : type == 3 ? "Ponto de Controle" : type == 1 ? "Ponto de Coleta" : "Evento Critico"}</p>
      </span>
)
}