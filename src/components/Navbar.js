import React  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import  {logOut}from "../redux/Action"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  let history = useHistory();
   const classes = useStyles();

  
  const onLogOut = () => {
    localStorage.clear()
    props.logOut()
    history.push("/login")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <img src="/pronteff1.jpg" alt="logo " style={{height:"30px"}}/>
          </div>
          <Typography variant="h6" className={classes.title} style={{fontWeight:"bold",marginLeft:"10px"}}>
            Pronteff
          </Typography>
          {props.values ?
            <Button color="inherit" onClick={onLogOut}>LogOut</Button> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
  values:state.auth.token
})

export default connect(mapStateToProps,{logOut})(Navbar)
