import React from 'react'
import './Sidebar.css'
import { SidebarData } from './sidebarData'
import { Link } from 'react-router-dom'
const SideBar = () => {
    return (
        <div>
      
            <nav className="nav__menu">
                <ul className="nav__menu__items">
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default SideBar
