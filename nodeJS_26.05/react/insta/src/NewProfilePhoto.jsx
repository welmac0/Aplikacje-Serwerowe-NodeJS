import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewProfilePhoto = () => {
    const [file, setFile] = useState(null);
    const [album, setName] = useState('');
    const [jwt, setJWT] = useState('')
    const [profilePhotoId, setProf] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const storedAlbum = localStorage.getItem('name')
        const storedProfilePhotoId = localStorage.getItem('profilePhotoId')
        const storedJWT = localStorage.getItem('JWT')
        if (storedAlbum) {
            setName(storedAlbum)
        }
        if (storedProfilePhotoId) {
            setProf(storedProfilePhotoId)
        }
        if (storedJWT) {
            setJWT(storedJWT)
        }
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('file', file)
        formData.append('album', album)

        try {
            const response = await fetch('http://localhost:4200/api/profile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                body: formData
            })

            if (response.ok) {
                console.log('Zdjecie zostalo pomyslnie przeslane')

                await fetch(`http://localhost:4200/api/photos/${profilePhotoId}`, {
                    method: 'DELETE'
                })

                console.log(profilePhotoId)

                console.log('Stare zdjecie zostalo usuniete')
                alert('Zdjecie zostalo przeslane')
                navigate('/edycjaprofilu')
            } else {
                console.log('Blad podczas wysylania');
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h1>Wyslij zdjecie profilowe</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file">Wybierz plik:</label>
                    <input type="file" id="file" accept="image/jpeg" onChange={handleFileChange} />
                </div>
                Zdjecie profilowe
                <button type="submit">Prześlij zdjęcie</button>
            </form>
        </div>
    )

}

export default NewProfilePhoto