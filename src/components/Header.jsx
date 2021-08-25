import React from 'react'
import logo from '../resources/logo.png'


export const Header = () => {
    return <header className = "header">
        <nav>
                <img src={logo}  alt = "todoist" className = "logo"/>
        </nav>
    </header>
}
