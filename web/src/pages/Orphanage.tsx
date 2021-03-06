import React, {useState, useEffect} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Api from '../services/api'
import {useParams} from 'react-router-dom'
import SideBar from "../components/SideBar"

import MapIcon from '../utils/mapIcon'
import '../styles/pages/orphanage.css';

interface Orphanage{
  id:number,
  latitude: number,
  longitude:number,
  name:string,
  about:string,
  instructions:string,
  opening_hours:string,
  open_on_weekends:boolean,
  whatsapp:number,
  images:Array<{
    id:number,
    url:string
  }>
}

interface OrphanageParams{
  id: string
}
export default function Orphanage() {
  const params = useParams<OrphanageParams>()
  const {id} = params
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  useEffect(()=>{
    Api.get(`/orphanages/${parseInt(id)}`).then(response=>{
      setOrphanage(response.data)
      console.log(response.data)
    })
  },[id])

  if(!orphanage){
    return <div id="page-orphanage">Carregando...</div>

  }
  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image:any,index:number)=>{
              return (
                <button className={index===activeImageIndex ? "active" : ''} type="button" key={index} data-index={index} onClick={()=>setActiveImageIndex(index)}>
                  <img src={`${image.url}`} alt={orphanage.name} />
                </button>
              ) 
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[!orphanage ? -27.2092052 : orphanage.latitude,!orphanage ? -49.6401092: orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker interactive={false} icon={MapIcon} position={[!orphanage ? -27.2092052 : orphanage.latitude,!orphanage ? -49.6401092: orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude}, ${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions} </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {(orphanage.open_on_weekends) ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
               ):(
                   <div className="open-on-weekends dont-open">
                      <FiInfo size={32} color="#FF6690" />
                      Não Atendemos <br />
                      fim de semana
                  </div>
               )}
            </div>

              <a target="_blank" rel="noopener noreferrer" className="contact-button" href={`https://api.whatsapp.com/send?phone=55${orphanage.whatsapp}`}>
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </a>
          </div>
        </div>
      </main>
    </div>
  );
}