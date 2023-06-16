import React, { useState, useEffect } from 'react';

const ProfilePhoto = () => {
    const [name, setName] = useState('');
    const [photoIds, setPhotoIds] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    useEffect(() => {
        const fetchPhotoIds = async () => {
            try {
                const response = await fetch(`http://localhost:4200/api/photos/user/${name}`);
                if (response.ok) {
                    const data = await response.json();
                    setPhotoIds(data);
                } else {
                    console.log('Błąd podczas pobierania identyfikatorów zdjęć.');
                }
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        };

        if (name) {
            fetchPhotoIds();
        }
    }, [name]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const fetchPromises = photoIds.map((photoId) =>
                    fetch(`http://localhost:4200/api/photos/${photoId}`)
                );
                const responses = await Promise.all(fetchPromises);

                const fetchedPhotos = await Promise.all(
                    responses.map((response) => response.json())
                );

                const photoUrls = await Promise.all(
                    fetchedPhotos.map(async (photo) => {
                        if (
                            photo.originalName === 'profile_photo.jpg' &&
                            photo.album === localStorage.getItem('name')
                        ) {
                            try {
                                const response = await fetch(`http://localhost:4200/api/getfile/${photo.id}`);
                                if (response.ok) {
                                    localStorage.setItem('profilePhotoId', photo.id);
                                    const photoBlob = await response.blob();
                                    const imageUrl = URL.createObjectURL(photoBlob);
                                    return imageUrl;
                                } else {
                                    console.log(`Wystąpił błąd podczas pobierania zdjęcia o ID ${photo.id}.`);
                                    return null;
                                }
                            } catch (error) {
                                console.error(error);
                                return null;
                            }
                        } else {
                            return null;
                        }
                    })
                );

                setPhotoUrls(photoUrls);
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        };

        if (photoIds.length > 0) {
            fetchPhotos();
        }
    }, [photoIds]);

    return (
        <div>
            {photoUrls.map((imageUrl, index) => (
                imageUrl && (
                    <div key={index}>
                        <img src={imageUrl} alt={`Photo ${index}`} />
                    </div>
                )
            ))}
        </div>
    );
};

export default ProfilePhoto;
