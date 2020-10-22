import React, { useEffect, useState } from 'react'
import SubNav from './SubNav'
 import Loader from 'react-loader-spinner'
import MaterialTable from 'material-table'
import { toast } from 'react-toastify';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Axios from 'axios';

import {TextField,Button} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  toast.configure()
const LoignTime = () => {
    const [loading, setloading] = useState(true)
    const [data, setdata] = useState([])
    const [users, setusers] = useState([])
    const [value, setvalue] = useState("")
    const [newValue, setnewValue] = useState(value[0])
const [inputValue, setInputValue] = React.useState('');

   
    useEffect(() => {
        
        getLoginTime()
        allUsers()
    
    },[])
    

   useEffect(() => {  
       const empIds = users.map(item => item._id)
       setvalue(empIds)
   }, [users])
    
   
    const getLoginTime = () => {
        Axios.get("http://172.16.224.250:5000/login/getallAttendance", {
            headers: {
                 contentType: "application/json",
                 Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            setdata(res.data.data)
            setloading(false)
        }).catch(err=>{console.log(err)})
    }

    const deleteData = (value) => {
        let newData = value.map(item => item._id)
        Axios.post("http://172.16.224.250:5000/login/deleteData", { data: newData }, {
            headers: {
                 contentType: "application/json",
                 Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            toast.info(res.data.msg)
            getLoginTime()
            setloading(false)
        }).catch(err=>console.log(err))
    }

    const allUsers = () => {
         Axios.get("http://172.16.224.250:5000/user/getallUsers", {
            headers: {
                contentType: "application/json",
                Authorization:"Bearer "+localStorage.getItem("token")
            }
         }).then(res => {
             setusers(res.data.data)
             setloading(false)
        }).catch(err=>console.log(err))
    }

    const hadledata = () => {
         Axios.get(`http://172.16.224.250:5000/login/getByEmpId/${newValue}`, {
            headers: {
                contentType: "application/json",
                Authorization:"Bearer "+localStorage.getItem("token")
            }
         }).then(res => {
             setdata(res.data.user)
             setloading(false)
         }).catch(err => console.log(err))
       
 }
    return (
        <div>
            { loading ?
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <Loader
                        type="Bars"
                        color="#007bff"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
 
                    />
                </div> :
                <div className="container">
                    <h1 className="pt-2">Employee Login Time</h1>
                   <Autocomplete
                            name="origin_station_selected"
                        id="combo-box-demo"
                        placeholder="Serch Employee By Employee Id"
                            options={users}
                            getOptionLabel={(option) => option.empId}
                        value={value}
                        onChange={(event, newValue) => {
                            if (newValue) {
                            setnewValue(newValue._id);
                          }
                           }}
                         inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                            }}
                             renderInput={(params) => (
                                <TextField
                                    placeholder="Serch Employee By Employee Id"
                                style={{ borderWidth: 1, borderColor: "red" }}
                                {...params}
                              />
                            )}
                    />
                    <div style={{display:"flex" ,justifyContent:"flex-end" ,padding:"10px" }} >
                        <Button color="primary" variant="contained" onClick={hadledata} >Filter Employee By Id</Button>
                        </div>
                    <SubNav />
            <MaterialTable
                        title="Employee Login Time"
                        icons={tableIcons}
      columns={[
        { title: 'EmpId', field: 'empId',render:rowData =>rowData.userId.empId },
        { title: 'Name', field: 'empName',render:rowData =>rowData.userId.empName },
        { title: 'Login Date', field: 'loginDate', type: 'numeric' },
          { title: "Login Time", field: "loginTime" },
        {title:"Latitude",field:"latitude",type:"numeric"},
        {title:"Longitude",field:"longitude" ,type:"numeric"}, 
        
      ]}
      data={data}        
      options={{
          selection: true,
          exportButton: true
      }}
      actions={[
        {
          tooltip: 'Remove All Selected Users',
          icon: tableIcons.Delete,
          onClick: (evt, data) => deleteData(data)
        }
                        ]}
    
    />

                </div>
            }
            </div>
    )
}

export default LoignTime
