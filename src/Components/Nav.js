import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../ducks/authReducer'
import homeIcon from '../assets/home_logo.png'
import logoutIcon from '../assets/shut_down.png'
import composeIcon from '../assets/new_logo.png'
import './Nav.css'

const Nav = (props) => {
    return (
        <div className='nav-master' >
            <div id='nav-parent' >
            {/* <h1>{props.user.username}</h1>
            <img src={props.user.profile} alt={props.user.username}/> */}
            <Link to='/dashboard'>
                <img className='nav-icons' src={homeIcon} alt='' />
            </Link>
            <Link to='/compose'>
                <img className='nav-icons' src={composeIcon}  alt='' />
            </Link>
            <Link to='/'>
                <img className='nav-icons' src={logoutIcon} alt='' />
            </Link>
            </div>
        </div>
    )
}

export default connect(null, {getUser})(Nav)