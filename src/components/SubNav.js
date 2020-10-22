import React from 'react'
import {NavLink} from "react-router-dom"

const SubNav = () => {
    return (
      
             <div className="homenav">
                    <nav className="nav d-flex justify-content-around">
                        <NavLink  to="/user">Employee Details</NavLink>
                        <NavLink  to="/logintime">Employee Login Time</NavLink>
                        <NavLink  to="/logouttime">Employee LogOut Time</NavLink>
                    </nav>
                    </div>
     
    )
}

export default SubNav
