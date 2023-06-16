import React, { useState, useEffect } from 'react';
import '../editProfile/photoGallery.css';

const OtherProfile = () => {
    const [name, setName] = useState('');
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const storedName = localStorage.getItem('shownUser');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`http://localhost:4200/api/photos/user/${name}`);
                console.log(response);
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

    return (
        <div className='galeria'>
            <h1>Zdjęcia użytkownika <b>{name}</b></h1>
            {photos.map((photo, index) => (
                <div className='photoGallery'>
                    <img
                        key={index}
                        src={photo.url}
                        alt={`Zdjęcie ${index}`}
                        title={photo.tags} // Ustawiamy tags jako title obrazka
                    />
                    <div className='podpis'>
                        tags: <code>{photo.tags}</code>
                    </div>

                </div>

            ))}
        </div>
    );
};

export default OtherProfile;
