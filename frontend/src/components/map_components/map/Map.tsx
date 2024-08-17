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
import { MapBrowserEvent } from 'ol';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
export default function MapPage({isAdmin}: {isAdmin: boolean}) {
  type interestType = {
    title: string,
    type: string,
    id: number,
    latitude: string,
    longitude: string,
  }
  type criticInterestType = {
    nome: string,
    tipoEventoCritico: {
      rangeEvents: number,
      tipo: string
    },
    latitude: number,
    longitude: number
  }
  var isRendered = false
  const [interestPoints, setInterestPoints] = React.useState<interestType[]>([])
  const [criticInterestPoints, setCriticInterestPoints] = React.useState<criticInterestType[]>([])
  const [map, setMap] = React.useState<Map | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [newInterestCoordinates, setNewInterestCoordinates] = React.useState([0,0])
  const [isCriticalEvent, setIsCriticalEvent] = React.useState<boolean | undefined>(undefined)

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

            fetch("http://localhost:4000/criticsEvents/RS", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM4ODg0MDUsImV4cCI6MTcyMzk3NDgwNX0.OwkZ4NJ99ktt_z9rTJ-hIvb2cB2d4-Bv6sCLuYpomns`
                },
            }).then((response) => response.json()).then((data) => {
                setCriticInterestPoints([...data])
            })

            

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
          console.error(error);
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

    const filteredListItems = Array.from(listItems).filter((item) => {
      const itemText = item.textContent?.toLowerCase() || "";
      const searchCondition = itemText.includes(searchText);
      const filterCondition = filterStatus === "" || itemText.includes(filterStatus);
      

      return filterCondition && searchCondition;
    });

    filteredListItems.forEach((item) => {
      item.classList.remove("hidden");
    });

    const hiddenListItems = Array.from(listItems).filter((item) => !filteredListItems.includes(item));

    hiddenListItems.forEach((item) => {
      item.classList.add("hidden");
    });
  }, [filterStatus, searchText]);


  const getClickCoordinate = (event: MapBrowserEvent<MouseEvent>) => {
    event.preventDefault();
    const coordinate = event.coordinate;
    const lonlat = olProj.transform(coordinate, "EPSG:3857", "EPSG:4326");
    const lon = lonlat[0];
    const lat = lonlat[1];
    console.log(`Coordinate: ${lon}, ${lat}`);
    setNewInterestCoordinates([lon, lat]);
    setIsOpen(true)
  };

  async function handleAddInterest() {
    const interestTitle = document.getElementById("interestTitle") as HTMLInputElement;
    const interestType = document.getElementById("interestType") as HTMLSpanElement;
    const interestLatitude = document.getElementById("interestLatitude") as HTMLInputElement;
    const interestLongitude = document.getElementById("interestLongitude") as HTMLInputElement;
    const interestCriticalEvent = document.getElementById("interestCriticalEvent") as HTMLInputElement;
    let type= 0
    switch (interestType.innerText) {
      case "Controle":
        type = 3;
        break;
      case "Abrigo":
        type = 2;
        break;
      case "Coleta":
        type = 1;
        break;
      case "Evento Crítico":
        type = 0;
        break;
    }

    const newInterest = {
      nome: interestTitle.value,
      idTipoPontoEvento: type,
      latitude: interestLatitude.value,
      longitude: interestLongitude.value,
      id: 1
    }

    

    fetch("http://localhost:4000/pointEvent", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM4ODg0MDUsImV4cCI6MTcyMzk3NDgwNX0.OwkZ4NJ99ktt_z9rTJ-hIvb2cB2d4-Bv6sCLuYpomns`
      },
      body: JSON.stringify(newInterest)
    }).then((response) => response.json()).then((data) => {
        setCriticInterestPoints([...data])
    })

    setInterestPoints([...interestPoints, newInterest]);
    setIsOpen(false);
  }

  isAdmin ? map?.on("singleclick", getClickCoordinate) : null;


  return (
      <section id='mapSection'>
        <div id='map' className={`w-[70vw] h-[70vh] ${!map ? "flex justify-center items-center" : null}`}>
          {
            !map ? 
              <p className='colorChange'>Carregando Mapa</p>
            : 
            null
          }
        </div>

        

        <div id='interestList'>
          <h3 className='text-2xl'>Lista de Interesses</h3>
          <div className='searchDiv'>
            <Input onChange={handleSearch} type="search" id="search-input" placeholder={"Inserir nome"} />
            <div id='filterBtns'>
              <button type='button' style={{background: "#00ba00"}} onClick={handleFilterClick}>Abrigo</button>
              <button type='button' style={{background: "rgba(255,255,0,0.8)"}} onClick={handleFilterClick}>Controle</button>
              <button type='button' style={{background: "blue"}} onClick={handleFilterClick}>Coleta</button>
              <button type='button' style={{background: "red"}} onClick={handleFilterClick}>Evento Critico</button>
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
                    <MapItem id={key} map={map} coordinates={[Number(longitude), Number(latitude)]} title={interestPoint.title} type={interestPoint.type} />                
                )
                }
              })
            :
            null
          }
          {
            map != null && criticInterestPoints.length>0 ?
              criticInterestPoints.map((criticInterestPoint, key) => {
                const latitude = criticInterestPoint.latitude
                const longitude = criticInterestPoint.longitude
                if (latitude!=null && longitude!=null) {
                  return(
                    <MapItem id={key} map={map} coordinates={[Number(longitude), Number(latitude)]} title={criticInterestPoint.nome} type={"critical event"} multiplier={criticInterestPoint.tipoEventoCritico.rangeEvents} />                
                )
                }
              })
            :
            <p className='colorChange' style={{fontSize: "1rem", width:"290px"}}>Carregando Pontos</p>
          }
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30" />
          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 max-w-md rounded-lg bg-white p-10 shadow-lg">
            <DialogClose asChild>
              <Button className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-900">
                <XIcon className="h-5 w-5" />
              </Button>
            </DialogClose>
            <DialogTitle className="text-2xl font-bold text-black">Adicione um ponto de interesse</DialogTitle>
            <Label className="block mt-4">
              <span className="block text-sm font-medium text-gray-700">Título</span>
              <Input id='interestTitle' type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </Label>
            <Label className="block mt-4">
              <span className="block text-sm font-medium text-gray-700">Latitude</span>
              <Input id='interestLatitude' type="number" defaultValue={newInterestCoordinates[1]} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </Label>
            <Label className="block mt-4">
              <span className="block text-sm font-medium text-gray-700">Longitude</span>
              <Input type="number" id='interestLongitude' defaultValue={newInterestCoordinates[0]} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </Label>
            <Label className="block mt-4">
              <span className="block text-sm font-medium text-gray-700">Tipo</span>
              <Select>
                <SelectTrigger>
                  <SelectValue id='interestType' placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Selecione">Selecione</SelectItem>
                  <SelectItem value="Abrigo">Abrigo</SelectItem>
                  <SelectItem value="Coleta">Coleta</SelectItem>
                  <SelectItem value="Controle">Controle</SelectItem>
                  <SelectItem value="Evento Critico">Evento Crítico</SelectItem>
                </SelectContent>
              </Select>
            </Label>
            <Label className="block mt-4">
              <span className="block text-sm font-medium text-gray-700">Evento Crítico Relacionado</span>
              <Select>
                <SelectTrigger>
                  <SelectValue id='interestCriticalEvent' placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Selecione">Selecione</SelectItem>
                  {
                    criticInterestPoints.map((criticalEvent, key) => {
                      return(
                        <SelectItem key={key} value={criticalEvent.nome}>{criticalEvent.nome}</SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </Label>
            <Button type="submit" onClick={handleAddInterest} className="mt-4 w-full bg-indigo-600 px-4 py-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Adicionar</Button>
        </DialogContent>
        </Dialog>

        <ToastContainer />
      </section>
  )
}