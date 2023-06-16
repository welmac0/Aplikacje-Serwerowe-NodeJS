import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './updatetags.css'

const UpdateTags = () => {
    const [tagsInput, setTagsInput] = useState('');
    const navigate = useNavigate();

    const handleTagsInputChange = (event) => {
        setTagsInput(event.target.value);
    };

    const handleAddTags = async () => {
        const photoId = localStorage.getItem('wybrane');

        // tagi

        if (photoId) {
            const tagsArray = tagsInput.split(',').map((tag) => `#${tag.trim()}`);
            console.log(tagsArray);
            const requestBody = { tags: tagsArray };

            try {
                const response = await fetch(`http://localhost:4200/api/photos/tags/${photoId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    console.log('Tagi zostały dodane.');
                    navigate('/edycjaprofilu')
                    setTagsInput('');
                } else {
                    console.log('Wystąpił błąd podczas dodawania tagów.');
                }
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        }
    };

    // filtry

    const [formData, setFormData] = useState({
        id: 1,
        method: 'reformat',
        rotate: 0,
        width: 100,
        height: 100,
        left: 0,
        right: 0,
        newFormat: 'png',
        r: 0,
        g: 0,
        b: 0
    });

    const handleSelect = (e) => {
        setFormData({ ...formData, method: e.target.value });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:4200/api/filters', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Wyslano filtry');
                console.log(data);
            })
            .catch(error => {
                // Obsługa błędów
                console.error(error);
            });
    };

    return (
        <>
            <div>
                <h2>Wybrane zdjecie {localStorage.getItem('wybrane')}</h2>
                <h3>tagi</h3>
                <input type="text" value={tagsInput} onChange={handleTagsInputChange} placeholder="Wpisz tagi oddzielone przecinkami" />
                <button onClick={handleAddTags}>Dodaj tagi</button>
            </div>
            <div>
                <h3>Filtry</h3>
                <form onSubmit={handleSubmit}>
                    <select name="" id="" onChange={handleSelect}>
                        <option value="rotate">rotate</option>
                        <option value="resize">resize</option>
                        <option value="reformat">reformat</option>
                        <option value="crop">crop</option>
                        <option value="grayscale">grayscale</option>
                        <option value="flip">flip</option>
                        <option value="flop">flop</option>
                        <option value="negate">negate</option>
                        <option value="tint">tint</option>
                    </select><br />
                    rotate: <input type="range" name="rotate" id="" min="0" max="180" onChange={handleChange} /> <br />
                    width: <input type="number" name="width" id="" onChange={handleChange} /><br />
                    height: <input type="number" name="height" id="" onChange={handleChange} /><br />
                    left: <input type="number" name="left" id="" onChange={handleChange} /> <br />
                    right: <input type="number" name="right" id="" onChange={handleChange} /> <br />
                    newFormat: <input type="text" name="newFormat" id="" placeholder='Wpisz np: png' onChange={handleChange} />
                    r: <input type="number" name="r" id="" onChange={handleChange} /> <br />
                    g: <input type="number" name="g" id="" onChange={handleChange} /> <br />
                    b: <input type="number" name="b" id="" onChange={handleChange} />
                    <br />
                    <button type="submit">Wyślij</button>
                </form>
                tabela co jest potrzebne gdzie;
                <table>
                    <tr>
                        <td>rotate</td>
                        <td>resize</td>
                        <td>reformat</td>
                        <td>crop</td>
                        <td>grayscale</td>
                        <td>flip</td>
                        <td>flop</td>
                        <td>negate</td>
                        <td>tint</td>
                    </tr>
                    <tr>
                        <td>rotate</td>
                        <td>width, height</td>
                        <td>newFormat</td>
                        <td>height, width, left, right</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>r, g, b</td>
                    </tr>
                </table>
            </div>
        </>

    );
};

export default UpdateTags;
