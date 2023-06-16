import React, { useEffect, useState } from 'react';
import './homestyle.css'
import { Link } from 'react-router-dom';


const Home = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await fetch('http://localhost:4200/api/photos');
            if (response.ok) {
                var data = await response.json();
                data = data.reverse()
                setPhotos(data);
            } else {
                console.log('Błąd podczas pobierania zdjęć.');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };

    const handleAlbumClick = (album) => {
        localStorage.setItem('shownUser', album);
    };

    const renderPhotos = () => {
        return photos.map((photo) => {
            if (photo) {
                const imageUrl = `http://localhost:4200/api/getfile/${photo.id}`;
                return (
                    <div className='photo'>
                        <Link to="/otherprofile" onClick={() => handleAlbumClick(photo.album)}><b>{photo.album}</b></Link>
                        <img
                            key={photo.id}
                            src={imageUrl}
                            alt={`Zdjęcie ${photo.id}`}
                        />
                        <i><a href={imageUrl}>Pokaz zdjecie oryginalne</a></i><br />
                        tagi:<code>{photo.tags}</code>
                    </div>
                );
            } else {
                return null;
            }
        });
    };

    return (
        <div className='gallery'>
            {renderPhotos()}
        </div>
    );
};

export default Home;
