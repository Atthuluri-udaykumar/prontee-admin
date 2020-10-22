import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Home from "./Home"
import Login from './Login';
import {logIn} from "../redux/Action"
import LogOutTime from './LogOutTime';
import LoignTime from './LoignTime';


const Routers = (props) => {
  const history = useHistory()

  useEffect(() => {
    let user = localStorage.getItem("token")
    if (user) {
      props.logIn(user)
      history.push("/")
    } else {
      history.push("/login")
   }
  },[])

    return (
      <Switch>
        {props.values ?
          <>
          <Route exact path="/" component={Home} />
                    <Route path="/user" component={Home} />
                    <Route path="/logintime" component={LoignTime}/>
                    <Route path="/logouttime" component={LogOutTime}/>
         </>
          :
          <Route path="/login" component={Login} />}
       </Switch>
    )
}

const mapStateToProps = state=>({
    values:state.auth.token
})

export default connect(mapStateToProps,{logIn})(Routers)
