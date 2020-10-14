import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FiPlus, FiArrowRight, FiSearch} from 'react-icons/fi'
import {Map, Marker, TileLayer, Popup} from 'react-leaflet'
import Api from '../services/api'

import Logo from '../images/logo.svg'
import "../styles/pages/orphanagesMap.css"
import MapIcon from '../utils/mapIcon'

interface Orphanage{
	id:number,
	latitude: number,
	longitude:number,
	name:string
}
function OrphanagesMap(){
	const [orphanages, setOrphanages] = useState<Orphanage[]>([])
	useEffect(()=>{
		Api.get("/orphanages").then(response=>{
			setOrphanages(response.data)
		})
	},[])
	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={Logo} alt="Happy" />

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita</p>

					<div className="search-orphanages">
						<input type="text" placeholder="Name of orphanage"/>
						<FiSearch size={24} />
					</div>
				</header>

				<footer>
					<strong>São Paulo</strong>
					<span>SP</span>
				</footer>
			</aside>

			<div className="map-container">
				<Map 
					center={[-23.5505, -46.6333]}
					zoom={15}
					style={{width: "100%", height:"100%"}}
				>
					<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					
					{orphanages.map((orphanage)=>{
						return (
							<Marker 
								position ={[orphanage.latitude, orphanage.longitude]}
								icon={MapIcon}
								key={orphanage.id}
							>
								<Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
									{orphanage.name}
									<Link to={`/orphanages/${orphanage.id}`}  className="popup-link" >
										<FiArrowRight size={26} color="rgba(0,0,0,0.5)"/>
									</Link>
								</Popup>
							</Marker>)
					})}
				</Map>
			</div>

			<Link to="create" className="create-orphanage">
				<FiPlus size={22} color="#FFF"/>
			</Link>
		</div>
	)
}

export default OrphanagesMap