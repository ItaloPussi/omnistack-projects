import React from "react";

import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/components/sideBar.css'

function SideBar(){
	return (
		<aside className="sidebar">
	        <img src={mapMarkerImg} alt="Happy" />

	        <footer>
	          <Link to="/app">
	            <FiArrowLeft size={24} color="#FFF" />
	          </Link>
	        </footer>
      </aside>

	)
}
export default SideBar