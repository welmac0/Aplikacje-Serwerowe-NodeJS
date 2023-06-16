import './login.css'
import iglogo from './iglogo.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setCookies, removeCookies }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('JWT')
        if (token) {
            setLoggedIn(true)
        }
    }, [])

    const handleLogin = () => {
        let emailInput = document.getElementById('mail');
        let passwordInput = document.getElementById('password');
        let email = emailInput.value;
        let password = passwordInput.value;
        fetchLogin(email, password);
    }

    const handleRegister = () => {
        let nameInput = document.getElementById('name')
        let emailInput = document.getElementById('email');
        let passwordInput = document.getElementById('haslo');
        let name = nameInput.value;
        let email = emailInput.value;
        let password = passwordInput.value;
        fetchRegister(name, email, password);
    }

    const fetchRegister = async (nazwa, mail, haslo) => {
        try {
            const response = await fetch('http://localhost:4200/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: nazwa, email: mail, password: haslo })
            })
            console.log(JSON.stringify({ name: nazwa, email: mail, password: haslo }));

            if (response.ok) {
                const data = await response.json()
                alert(data)
                console.log(data);
            } else {
                const errorData = await response.json()
                console.log(errorData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchLogin = async (mail, pass) => {
        console.log(mail);
        console.log(pass);
        try {
            const response = await fetch('http://localhost:4200/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: mail, password: pass }),
            })

            if (response.ok) {
                const data = await response.json();
                if (data.Authorization.length > 20) {
                    setCookies(data)
                    setLoggedIn(true)
                    alert('Zalogowano')
                    navigate('/edycjaprofilu')
                }
            } else {
                const errorData = await response.json();
                console.log(errorData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {

        removeCookies()
        setLoggedIn(false)
    }

    return (
        <>
            <div className='container'>
                <div className='content'>
                    <img src={iglogo} alt="insta logo" className='iglogo' /><b>InstaApp</b>
                    {loggedIn ? ( // Sprawdzenie, czy użytkownik jest zalogowany
                        <div className="logout"> {/* Zmienione pole na wylogowanie */}
                            Wyloguj się<br />
                            <button onClick={handleLogout}>Wyloguj się</button>
                        </div>
                    ) : (
                        <>
                            <div className="login">
                                Zaloguj się<br />
                                <input type="text" name="mail" id="mail" defaultValue="adres mailowy" />
                                <input type="password" name="password" id="password" defaultValue="haslo" />
                                <br />
                                <button onClick={handleLogin}>Zaloguj się</button>
                            </div>
                            lub
                            <div className="register">
                                Zarejestruj się<br />
                                <input type="text" name="name" id="name" defaultValue="nazwa" />
                                <input type="text" name="email" id="email" defaultValue="adres mailowy" />
                                <input type="password" name="haslo" id="haslo" defaultValue="haslo" />
                                <br />
                                <button onClick={handleRegister}>Zarejestruj się</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default LoginPage