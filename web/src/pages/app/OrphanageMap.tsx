import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight} from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from 'leaflet';

import mapMarkerImg from '../../images/map-marker.svg';

import '../../styles/pages/app/orphanages-map.css';
import api from '../../services/api';

const mapIcon = leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58, 68],
    iconAnchor: [28, 68],
    popupAnchor: [170, 2]
})

interface Orpahange {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orpahange[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, [])

    return (
        <div id="page-map">
            <aside>    
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita</p>
                </header>

                <footer>
                    <strong>Salvador</strong>
                    <span>Bahia</span>
                </footer>
            </aside>

            <Map
                center={[-12.9498213,-38.3706727]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
            <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

                {orphanages.map(orphanages => {
                    return(
                        <Marker 
                            position={[orphanages.latitude,orphanages.longitude]}
                            icon={mapIcon}
                            key={orphanages.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanages.name}
                                <Link to={`/orphanages/${orphanages.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>

            <Link to="orphanages/create" className='create-orphaneges'>
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;