import React, {useState} from 'react'
import logo from '../assets/helo_logo.png'
import {connect} from 'react-redux'
import {getUser} from '../ducks/authReducer'
import axios from 'axios'
import './Auth.css'
import {withRouter} from 'react-router-dom'

const Auth = (props) => {
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const login = () => {        
        axios.post('/api/login', {username: usernameInput, password: passwordInput})
        .then(res => {
            props.getUser(res.data)
            props.history.push('/dashboard')
        }).catch(err => console.log(err))
    }

    const register = () => {
        axios.post('/api/register', {username: usernameInput, password: passwordInput})
        .then(res => {
            console.log(res.data, "USERNAME")
            props.getUser(res.data)
            props.history.push('/dashboard')
        }).catch(err => console.log(err))
    }

    return (
        <div className='auth-master' >
            <div id='auth-header' >
                <img id='main-logo' src={logo} alt='' />
                <p id='brand' > Helo </p>
            </div>
            <div className='auth-inputs' >
                <div id='parent-input' >   
                    <input 
                        id='main-inputs'
                        placeholder='username'
                        value={usernameInput}
                        onChange={(evt) => setUsernameInput(evt.target.value)} />
                    <input 
                        id='main-inputs'
                        placeholder='password'
                        value={passwordInput}
                        type='password'
                        onChange={(evt) => setPasswordInput(evt.target.value)} />
                </div>
            </div>
            <div className='auth-btns' >
                <button id='auth-btns' onClick={register} > Register </button>
                <button id='auth-btns' onClick={login}> Login </button>
            </div>
        </div>
    )
}

export default connect(null, {getUser})(withRouter(Auth))