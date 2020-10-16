import React, {useState, FormEvent, ChangeEvent} from "react";
import { Map, Marker, TileLayer} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet'
import {useHistory} from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import Api from '../services/api'
import SideBar from "../components/SideBar"
import MapIcon from '../utils/mapIcon'
import '../styles/pages/create-orphanage.css';



export default function CreateOrphanage() {
  const history = useHistory()
  const [coords, setCoords] = useState({latitude:0, longitude:0})

  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [instructions, setInstructions] = useState("")
  const [opening_hours, setOpening_hours] = useState("")
  const [open_on_weekends, setOpen_on_weekends] = useState(true)
  const [whatsapp, setWhatsapp] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleMapClick(e:LeafletMouseEvent){
    const {lat, lng} = e.latlng

    setCoords({
      latitude: lat,
      longitude: lng
    })

  }

  function handleSelectedImages(e:ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return 

     const selectedImages = Array.from(e.target.files)

     setImages(selectedImages)

     const selectedImagesPreview = selectedImages.map(image=>{
       return URL.createObjectURL(image)
     })

     setPreviewImages(selectedImagesPreview)
  }

  async function handleSubmit(e:FormEvent){
    e.preventDefault()
    const {latitude, longitude} = coords

    const data = new FormData()

    data.append("name", name)
    data.append("about", about)
    data.append("instructions", instructions)
    data.append("opening_hours", opening_hours)
    data.append("open_on_weekends", String(open_on_weekends))
    data.append("latitude", String(latitude))
    data.append("longitude", String(longitude))
    data.append("whatsapp", String(whatsapp))
    images.forEach(image=>{
      data.append("images", image)
    })
     
    await Api.post("orphanages", data)
    history.push("/app")

    alert("Cadastro realizado com sucesso!")
  }
  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-23.5505, -46.6333]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />


              {coords.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                    icon={MapIcon} 
                    position={[coords.latitude,coords.longitude]} 
                />
               )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e=> setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="number" id="whatsapp" value={whatsapp} onChange={e=> setWhatsapp(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e=> setAbout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map((image)=>{
                     return (
                         <img src={image} alt={name} key={image}/>
                      )
                  })
                }
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input multiple onChange={handleSelectedImages} type="file" id="image[]" />
              </div>

              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e=> setInstructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e=> setOpening_hours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? "open" : ''} onClick={e=>setOpen_on_weekends(true)}>Sim</button>
                <button type="button" className={!open_on_weekends ? "close" : ''} onClick={e=>setOpen_on_weekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

