'use client'
import Map  from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import React, { useEffect } from 'react';
import * as olProj from 'ol/proj'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapItem from '../MapItem';
export default function MapPage() {
  type interestType = {
    title: string,
    type: string,
    id: number,
    latitude: string,
    longitude: string,
  }
  var isRendered = false
  const router = useRouter()
  const [interestPoints, setInterestPoints] = React.useState<interestType[]>([])
  const [map, setMap] = React.useState<Map | null>(null)

  useEffect(() => {
    /**
     * Fetches data from the server and initializes the map
     * If the data fetch is successful, sets the monitors state and creates the map
     * If the data fetch fails, navigates back and logs the error
     */
    const fetchDataAndInitMap = async () => {
      if (!isRendered) {
        isRendered = true
        try {
            let latitude = 0
            let longitude = 0

            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude
                
                const osmMap = new TileLayer({
                    preload: Infinity,
                    source: new OSM(),
                });
                const view = new View({
                    center: olProj.fromLonLat([longitude, latitude]),
                    zoom: 15,
                });
            
                // Create the map with the layers and view
                const newMap = new Map({
                    target: "map",
                    layers: [osmMap],
                    view: view,
                });
            
                // Set the map state with the newly created map
                setMap(newMap);
            })
        } catch (error) {
          // Log any errors that occur during the data fetch or map initialization
          console.error('Failed to fetch monitors:', error);
        }
      }
    };

    if (map==null) {
      fetchDataAndInitMap();
    }
  }, [map]);

  
  const [searchText, setSearchText] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentFilter = event.currentTarget.innerText.toLowerCase();
    const buttons : NodeListOf<HTMLButtonElement> = document.querySelectorAll(".clicked");
    buttons.forEach((button) => {
      if (button.innerText.toLowerCase() === currentFilter) {
        button.classList.add("clicked");
      } else {
        button.classList.remove("clicked");
      }
    });
    setFilterStatus(filterStatus === currentFilter ? "" : currentFilter);
  };

  useEffect(() => {
    const listItems = document.querySelectorAll(".listItem");
    listItems.forEach((listItem) => {
      const text = listItem.textContent?.toLowerCase() || "";
      const isActive = listItem.children[1].classList.contains("interestShelter");
      const isInactive = listItem.children[1].classList.contains("interestProblem");
      const isMaintance = listItem.children[1].classList.contains("interestCollect");
      const isMatchSearch = text.includes(searchText);
      const isMatchFilter =
        (filterStatus === "") ||
        (filterStatus === "Abrigo".toLowerCase() && isActive) ||
        (filterStatus === "Problema".toLowerCase() && isInactive) ||
        (filterStatus === "Coleta".toLowerCase() && isMaintance);
      if (isMatchSearch && isMatchFilter) {
        listItem.classList.remove("hiddenItem");
        listItem.classList.add("flex");
      } else {
        listItem.classList.remove("flex");
        listItem.classList.add("hiddenItem");
      }
    });
  }, [searchText, filterStatus]);

  return (
      <section id='mapSection'>
        <div id='map' className={`w-screen h-screen ${!map ? "flex justify-center items-center" : null}`}>
          {
            !map ? 
              <p className='colorChange'></p>
            : 
            null
          }
        </div>

        

        <div id='interestList'>
          <h3 className='text-2xl'>{}</h3>
          <div className='searchDiv'>
            <input onChange={handleSearch} type="search" id="search-input" placeholder={"Inserir nome"} />
            <div id='filterBtns'>
              <button type='button' style={{background: "#00ba00"}} onClick={handleFilterClick}>Abrigo</button>
              <button type='button' style={{background: "red"}} onClick={handleFilterClick}>Problema</button>
              <button type='button' style={{background: "blue"}} onClick={handleFilterClick}>Coleta</button>
            </div>
          </div>
          <div className={`listItems ${!map ? "overflow-x-hidden p-10" : null}`}>
            {
            map != null && interestPoints.length>0 ?
              interestPoints.map((interestPoint, key) => {
                const latitude = interestPoint.latitude
                const longitude = interestPoint.longitude
                if (latitude!=null && longitude!=null) {
                  return(
                    <MapItem id={key} map={map} coordinates={[Number(longitude), Number(latitude)]} title={interestPoint.title} type={interestPoint.type}/>                
                )
                }
              })
            :
            <p className='colorChange' style={{fontSize: "1rem", width:"290px"}}>{}</p>

          }
          </div>
        </div>
        <ToastContainer />
      </section>
  )
}