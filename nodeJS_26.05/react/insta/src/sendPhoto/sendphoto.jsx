import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SendPhoto = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [loggedIn, setFact] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
            setFact(true)
        }
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleTags = (event) => {

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('album', name);

        try {
            const response = await fetch('http://localhost:4200/api/photos', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Zdjęcie zostało przesłane pomyślnie.');
                alert('Zdjecie zostalo przeslane')
                navigate('/edycjaprofilu')
            } else {
                console.log('Wystąpił błąd podczas przesyłania zdjęcia.');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };

    return (
        <div>
            {loggedIn ? ( 
            <>
            <h1>Wyslij zdjecie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file">Wybierz plik:</label>
                    <input type="file" id="file" accept="image/jpeg" onChange={handleFileChange} /> <br />
                </div>
                <button type="submit">Prześlij zdjęcie</button>
            </form>
            </>
            ) : (
                <h1>Nie jestes zalogowany</h1>
            )}
        </div>
    );
};

export default SendPhoto;