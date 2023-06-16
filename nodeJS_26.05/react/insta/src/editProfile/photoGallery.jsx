import React, { useState, useEffect } from 'react';
import './photoGallery.css';
import { useNavigate } from 'react-router-dom';

const PhotoGallery = () => {
    const [name, setName] = useState('');
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`http://localhost:4200/api/photos/user/${name}`);
                if (response.ok) {
                    const photoIds = await response.json();
                    const fetchPromises = photoIds.map(fetchPhoto);
                    var fetchedPhotos = await Promise.all(fetchPromises);
                    fetchedPhotos = fetchedPhotos.reverse()
                    setPhotos(fetchedPhotos);
                } else {
                    console.log('Wystąpił błąd podczas pobierania listy zdjęć.');
                }
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        };

        if (name) {
            fetchPhotos();
        }
    }, [name]);

    const fetchPhoto = async (photoId) => {
        try {
            const response = await fetch(`http://localhost:4200/api/getfile/${photoId}`);
            if (response.ok) {
                const photoBlob = await response.blob();
                const imageUrl = URL.createObjectURL(photoBlob);
                const tagsResponse = await fetch(`http://localhost:4200/api/photos/tags/${photoId}`);
                if (tagsResponse.ok) {
                    const tagsData = await tagsResponse.json();
                    const tags = tagsData.tags;
                    return { id: photoId, url: imageUrl, tags }; // Zwracamy obiekt zawierający id, url i tags zdjęcia
                } else {
                    console.log(`Wystąpił błąd podczas pobierania tagów dla zdjęcia o ID ${photoId}.`);
                }
            } else {
                console.log(`Wystąpił błąd podczas pobierania zdjęcia o ID ${photoId}.`);
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };

    const handleClick = (id) => {
        localStorage.setItem('wybrane', id)
        navigate('/updatetags')
    }

    return (
        <div className='galeria'>
            {photos.map((photo, index) => (
                <div className='photoGallery'>
                    <img onClick={() => handleClick(photo.id)}
                        key={index}
                        src={photo.url}
                        alt={`Zdjęcie ${photo.id}`}
                        title={photo.tags} // Ustawiamy tags jako title obrazka
                    /> <br />
                    <div className='podpis'>
                        tags: <code>{photo.tags}</code>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default PhotoGallery;
