import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';

function Header() {
    const cookies = new Cookies();

    const [isSessionValid, setIsSessionValid] = React.useState(true);
    //if(isSessionValid === false) window.location.href = window.origin
    const userData = React.useMemo(()=> loadUserData())

    

    async function handleIsSessionValid(){
        const sessionKey = cookies.get("sessionKey")
        if(!sessionKey) return setIsSessionValid(false)
        try {
            const data = {
                sessionKey: sessionKey,
                expectedUserTypes: [1]
            }
            const isValid = (await axios.post('http://localhost:3001/isSessionValid', data)).data
            return setIsSessionValid(isValid.valid)
        } catch (error) {
            return setIsSessionValid(false)
        }
    }

    React.useEffect(()=>{
        handleIsSessionValid()
        reloadUserData()
    })
    async function reloadUserData(){
        if(!cookies.get("sessionKey") || !isSessionValid) return;
        const data = {
            sessionKey:  cookies.get("sessionKey")
        }
        const userData = (await axios.post('http://localhost:3001/getselfuserdata', data)).data
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        return gottenUserData
    }

    return (
        <div className="Header">
        <header className="App-header">
            <p>
            Edit <code>src/App.js</code> and save to reload. {isSessionValid ? "false" : "true"}
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        </div>
    );
}

export default Header;
