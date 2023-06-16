import { useEffect, useState } from "react"
import './styleProfile.css'
import PhotoGallery from "./photoGallery"
import ProfilePhoto from "./profilePhoto"
import { Link } from 'react-router-dom';

const EditProfile = ({ }) => {
    const [loggedIn, setFact] = useState(false)
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [desc, setDesc] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [id, setId] = useState(0)

    const fetchUser = async (jwt = localStorage.getItem('JWT')) => {
        try {
            const response = await fetch('http://localhost:4200/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
            })
            const data = await response.json();
            const { id, name, firstName, surname, desc } = data;
            setName(name);
            setFirstName(firstName);
            setSurname(surname);
            setDesc(desc);
            setId(id)
            console.log(data);
            localStorage.setItem("name", name)
            localStorage.setItem("id", id)
            console.log(localStorage);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUser()
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setFact(true)
        }
    }, [])

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleProfile = () => {

    }

    const handleSaveChanges = async () => {
        const jwt = localStorage.getItem('JWT');

        const updatedData = {
            name: name,
            firstName: firstName,
            surname: surname,
            desc: desc,
        };

        try {
            const response = await fetch('http://localhost:4200/api/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                console.log('Zmiany zostały zapisane pomyślnie.');
            } else {
                console.log('Wystąpił błąd podczas zapisywania zmian.');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }

        handleCloseDialog();
    };

    return (

        <>
            {loggedIn ? (
                <>
                    <div className="container">
                        <div className="header">
                            <ProfilePhoto />
                            <b>{name}</b> Imie i nazwisko: <b>{firstName} {surname}</b><br />
                            <button onClick={handleOpenDialog}>Edytuj profil</button> <button><Link to="/newprofilephoto">Nowe profilowe</Link></button>
                            <div className="desc">
                                <b>Opis:</b>
                                {desc}
                            </div>
                        </div>
                    </div>
                    {openDialog && (
                        <div className="dialog">
                            <h2>Edytuj dane profilowe</h2>
                            <form>
                                <label>
                                    Nazwa:
                                    <input type="text" defaultValue={name} onChange={handleNameChange} disabled />
                                </label>
                                <label>
                                    Imię:
                                    <input type="text" defaultValue={firstName} onChange={handleFirstNameChange} />
                                </label>
                                <label>
                                    Nazwisko:
                                    <input type="text" defaultValue={surname} onChange={handleSurnameChange} />
                                </label>
                                <label>
                                    Opis:
                                    <textarea defaultValue={desc} onChange={handleDescChange} />
                                </label>
                            </form>
                            <button onClick={handleSaveChanges}>Zapisz</button>
                            <button onClick={handleCloseDialog}>Anuluj</button>
                        </div>
                    )}
                    <div className="photos">
                        <PhotoGallery />
                    </div>
                </>
            ) : (
                <h1>Nie jestes zalogowany</h1>
            )}
        </>

    )
}

export default EditProfile