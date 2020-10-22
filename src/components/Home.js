import Axios from 'axios';
import React, { useEffect, useState } from 'react'
 import Loader from 'react-loader-spinner'
import SubNav from './SubNav';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
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
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

import { toast } from 'react-toastify';
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
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

toast.configure()
const Home = (props) => {
    const classes = useStyles();
    const [loadign, setloadign] = useState(true)
  const [modal, setModal] = useState(false);
  const [edit, setedit] = useState(false)
  const [editId,seteditId]=useState(null)
  const [empId, setempId] = useState("")
  const [empName, setempName] = useState("")
  const [designation, setdesignation] = useState("")
  const [officeEmail, setofficeEmail] = useState("")
  const [personnelEmail, setpersonnelEmail] = useState("")
  const [empPhoneNum, setempPhoneNum] = useState("")
  const [password, setpassword] = useState("")
  const [photo, setphoto] = useState("")
  const [department, setdepartment] = useState("")
  const [dateOfJoin, setdateOfJoin] = useState("")
  const [DOB, setDOB] = useState("")



const [Delete, setDelete] = useState(false)




  const toggle = () => setModal(!modal);
       const [data, setdata] = useState([])
       
            
    useEffect(() => {
       getAllUsers()
    }, [])
    const getAllUsers = () => {
        Axios.get("http://172.16.224.250:5000/user/getallUsers", {
            headers: {
                contentType: "application/json",
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.data);
          setdata(res.data.data)
          setempId("")
          setdesignation("")
          setempName("")
          setempPhoneNum("")
          setofficeEmail("")
          setpersonnelEmail("")
          setphoto("")
          setpassword("")
          setdepartment("")
          setdateOfJoin("")
          setDOB("")
         
          setloadign(false)
        }).catch(err=>{
        console.log(err);
       })
  }

  const getUserById = (id) => {
        Axios.get(`http://172.16.224.250:5000/user/getUserById/${id}` ,{
            headers: {
                contentType: "application/json",
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.data);
          setedit(true);
          toggle();
          seteditId(id);
           setempId(res.data.data.empId)
          setdesignation(res.data.data.designation)
          setempName(res.data.data.empName)
          setempPhoneNum(res.data.data.empPhoneNum)
          setofficeEmail(res.data.data.officeEmail)
          setpersonnelEmail(res.data.data.personnelEmail)
          setdepartment(res.data.data.department)
          setdateOfJoin(res.data.data.dateOfJoin)
          setDOB(res.data.data.DOB)
          setphoto("")
          setpassword(res.data.data.password)
         setloadign(false)
        }).catch(err=>{
        console.log(err);
       })
  }

  const editEmployee = () => {
   
    Axios.put(`http://172.16.224.250:5000/user/editUser/${editId}`, { empId, empName, empPhoneNum, designation, officeEmail, personnelEmail, empPhoneNum, password,DOB,dateOfJoin,department }, {
      headers: {
        contentType: "application/json",
         Authorization:"Bearer "+localStorage.getItem("token")
      }
    })
      .then(res => {
      
      if (res.data.status == 400) {
          toast.error(res.data.msg)
        } else {
          toast.success(res.data.msg)
          toggle()
          getAllUsers();
        } 
        setloadign(false)
      }).catch(err => toast.error(err))
  }
  
  const addEmployee = () => {
   const formData = new FormData();
    // formData.append('photo', photo);
    formData.append("empId",empId )
    formData.append("empName",empName )
    formData.append("empPhoneNum",empPhoneNum )
    formData.append("designation",designation )
    formData.append("officeEmail",officeEmail )
    formData.append("personnelEmail",personnelEmail )
    formData.append("password", password)
    formData.append("department", department)
    formData.append("dateOfJoin", dateOfJoin)
    formData.append("DOB",DOB)

    Axios.post("http://172.16.224.250:5000/user/signup", formData)
      .then(res => {
        console.log(res.data);
        if (res.data.status == 400) {
          toast.error(res.data.msg)
        } else {
          toast.success(res.data.msg)
          toggle()
          getAllUsers();
          setloadign(false)
        } 
      }).catch(err=>toast.error(err))
  }
  

  const deleteEmployee = (id) => {
    Axios.delete(`http://172.16.224.250:5000/user/deleteUser/${id}`, {
      headers: {
          contentType: "application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      }
    }).then((res) => {
      getAllUsers();
      toast.info(res.data.msg)
      setloadign(false)
    }).catch(err=>toast.error(err))
  }
  
const  handleAdding = () => {
  toggle()
  setedit(false)
    getAllUsers()
  }
    return (
        <div>
            {loadign ?
                <div style={{position:"absolute",top:"50%" ,left:"50%",transform: "translate(-50%, -50%)" }}>
                <Loader
                    type="Bars"
                    color="#007bff"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
 
                    />
              </div>
                 :
            <div className="container">
                    <div className="d-lg-flex justify-content-lg-between d-sm-block justify-content-sm-center">
                    <h1>All Employee List</h1>
                    <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleAdding}
      >
       Add Employee
      </Button>
      </div>
            <SubNav/>
        <MaterialTable
        title="All Employee List"
        icons={tableIcons}
       columns={[
        { title: 'Image', field: 'photo', render: rowData => <img src={rowData.photo} style={{width: 40, borderRadius: '50%'}}/> },
        { title: 'Id', field: 'empId' },
        { title: 'Name', field: 'empName' },
        {title:"Department" ,field:"department"},
         { title: 'Designation', field: 'designation' },
         { title: 'Date Of Join', field: 'dateOfJoin' },
         { title: 'Phone Number', field: 'empPhoneNum' },
         { title: 'Office Email', field: 'officeEmail' },
         { title: 'Personal Email', field: 'personnelEmail' },
         { title: 'Date Of Birth', field: 'DOB' },      
      ]}
       data={data}  
       actions={[
        {
          icon: tableIcons.Edit,
          tooltip: 'Edit User',
           onClick: (event, rowData) =>  getUserById(rowData._id)
        },
        {
          icon: tableIcons.Delete,
          tooltip: 'Delete User',
          onClick: (event, rowData) => deleteEmployee(rowData._id)
        }
         ]}  
       options={{
           actionsColumnIndex: -1,
           exportButton: true
      }}                  
        />
           
         <Modal isOpen={modal} toggle={toggle} >
             <ModalHeader toggle={toggle}>Add Employee</ModalHeader>
              <ModalBody>
                <div>
                  <TextField label="employee Id" className="w-100 py-2"  value={empId} onChange={e=>setempId(e.target.value)}/>
                </div>
                <div>
                  <TextField className="w-100 py-2" label="employee Name" value={empName} onChange={e=>setempName(e.target.value)}/>
                </div>
                <div>
                  <TextField label="designation"className="w-100 py-2" value={designation} onChange={e=>setdesignation(e.target.value)}/>
                </div>
                <div>
                  <TextField label="officeEmail"className="w-100 py-2" value={officeEmail} onChange={e=>setofficeEmail(e.target.value)}/>
                </div>
                <div>
                  <TextField label="personnelEmail"className="w-100 py-2" value={personnelEmail} onChange={e=>setpersonnelEmail(e.target.value)}/>
                </div>
                <div>
                  <TextField label="Employee phone num"className="w-100 py-2" value={empPhoneNum} onChange={e=>setempPhoneNum(e.target.value)}/>
                </div>
                <div>
                  <TextField label="Employee Department"className="w-100 py-2" value={department} onChange={e=>setdepartment(e.target.value)}/>
                </div>
                <div>
                  <TextField label="Employee Date Of Join"className="w-100 py-2" value={dateOfJoin} onChange={e=>setdateOfJoin(e.target.value)}/>
                </div>
                <div>
                  <TextField label="Employee Date Of Birth"className="w-100 py-2" value={DOB} onChange={e=>setDOB(e.target.value)}/>
                </div>
                <div>
                  <TextField label="Password"className="w-100 py-2" value={password} disabled={edit?true:false} onChange={e=>setpassword(e.target.value)}/>
                </div>
            </ModalBody>
              <ModalFooter>
                {edit ? <Button variant="contained" color="primary" onClick={editEmployee}>Edit Employee</Button> 
              :
          <Button variant="contained" color="primary" onClick={addEmployee}>Add Employee</Button>
    }
        </ModalFooter>
     </Modal>
              </div>  
            }
        </div>
    )
}

export default Home
