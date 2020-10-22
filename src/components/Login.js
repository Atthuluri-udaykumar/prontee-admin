import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import {TextField,Button} from '@material-ui/core'
import axios from "axios"
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import {connect} from "react-redux"
import {logIn} from  "../redux/Action"

toast.configure()
  
const Login = (props) => {
    
    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
     let history = useHistory();

    const handleSubmit = () => {
   
        axios.post("http://172.16.224.250:5000/admin/signin", { userName, password })
            .then(res => {
                
                if (res.data.status === 200) {
                    toast.success(res.data.msg)
                    props.logIn(res.data.token)
                    localStorage.setItem("token", res.data.token)
                    history.push("/")
                } else {
                    toast.error(res.data.msg)
                }
             })
             .catch(err=>console.log(err))
    }
    return (
        <div >
        <div className="row ">
                <Card className="col-md-4" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="text-center">
                        <img src="/pronteff.png" alt="pronteff logo" style={{ height: "100px", width: "100px" }} />  
                    </div>    
                    <div className="text-center">
                        <div>
                            <TextField
                                label="User Name"
                                className="w-75"
                                name="userName"
                                value={userName}
                                onChange={e=>setuserName(e.target.value)}
                            />
                        </div>
                        <div className="py-3">
                            <TextField
                                label="Password"
                                className="w-75"
                                name="password"
                                value={password}
                                onChange={e=>setpassword(e.target.value)}
                            />             
                        </div>
                        
                        <div className="py-3">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                                  Sig IN
                            </Button>
                            </div>
                    </div>
            </Card>
            </div>
    </div>
    )
}

const mapStateToProps = state=>({
    values:state.auth
})

export default connect(mapStateToProps,{logIn})(Login)
