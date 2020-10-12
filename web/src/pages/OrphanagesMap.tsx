import React from 'react'
import {Link} from 'react-router-dom'
import {FiPlus} from 'react-icons/fi'
import {Map, TileLayer} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import Logo from '../images/logo.svg'
import "../styles/pages/orphanagesMap.css"

function OrphanagesMap(){
	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={Logo} alt="Happy" />

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita</p>
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
				</Map>
			</div>

			<Link to="" className="create-orphanage">
				<FiPlus size={22} color="#FFF"/>
			</Link>
		</div>
	)
}

export default OrphanagesMap