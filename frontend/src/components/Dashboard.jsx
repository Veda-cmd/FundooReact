import React,{Component} from 'react';
import './Dashboard.css';
import {withStyles } from '@material-ui/core/styles';
import Drawer from './Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider, Tooltip } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { InputAdornment } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        'MuiInputBase': {
            'input': {
                height: "2.1875em",
                padding: "10px 12px 9px 0",
            },
            'root':{
                display:'flex',
                marginLeft:'20px',
                cursor:'pointer'
            }
        },
        'MuiDrawer': {
            'paper': {
                top: "66px",
                width: "18%"
            },
            'paperAnchorDockedLeft': {
                borderRight: '0px solid'
            }
        },
        'MuiPaper': {
            'elevation4': {
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)'
            }
        },
        'MuiTypography':{
            'noWrap':{
                overflow:'initial'
            },
            'h6':{
                marginLeft:"10px",
                fontSize:'1.5rem'
            }
        }
    }
})

const useStyles = {
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position:'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'lightgray',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(9),
        width: '700px',
        borderRadius:'7px'
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
};

export default withStyles(useStyles)(
    class Dashboard extends Component{

        constructor(props)
        {
            super(props)
            this.state={
                anchorEl:null,
                open:false,
                openDrawer:false
            }
        }

        handleMenu = event => {
            this.setState({
                anchorEl:event.currentTarget,
                open:true
            })
            
          };
        
        handleClose = () => {
            this.setState({
                anchorEl:null,
                open:false
            })
        };

        handleDrawerOpen=(event)=>{
            this.setState({
                openDrawer:!this.state.openDrawer
            })
            
            
        }

        handleDrawerClose=()=>{
            this.setState({
                openDrawer:false
            })
        }

        handleMenuItem=(event)=>
        {

        }
        
        render()
        {
            const {classes} = this.props;
            return(
                <div className={classes.grow}>
                    <MuiThemeProvider theme={theme}>
                        <AppBar position='fixed' color='inherit' style={{border:'1px light'}}>
                            <Toolbar>
                                <IconButton
                                edge='start'
                                onClick={(event=>this.handleDrawerOpen(event))}
                                color='inherit'
                                className={classes.menuButton}
                                aria-label='open drawer'>
                                    <MenuIcon />
                                </IconButton>
                                <img src='https://ssl.gstatic.com/keep/keep.ico' alt='Logo'/>
                                <Typography className='header' variant='h6' noWrap>Fundoo</Typography>
                                <div className={classes.search}>
                                    <InputBase
                                    startAdornment={(
                                        <InputAdornment position='start' >
                                            <Tooltip title='search'>
                                                <SearchIcon />
                                            </Tooltip>   
                                        </InputAdornment> 
                                    )}
                                    placeholder='Search' 
                                    inputProps={{'aria-label':'search'}}/>
                                </div>
                                <div className={classes.grow}></div>
                                <div>
                                    <Tooltip title='Refresh'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <path d="M9 13.5c-2.49 0-4.5-2.01-4.5-4.5S6.51 4.5 9 4.5c1.24 0 2.36.52 3.17 1.33L10 8h5V3l-1.76 1.76C12.15 3.68 10.66 3 9 3 5.69 3 3.01 5.69 3.01 9S5.69 15 9 15c2.97 0 5.43-2.16 5.9-5h-1.52c-.46 2-2.24 3.5-4.38 3.5z"/></svg>
                                    </Tooltip>							
                                </div>
                                <div>
                                    <Tooltip title='Settings'>
                                    <img src='https://www.gstatic.com/images/icons/material/system_gm/svg/settings_24px.svg' alt='Settings'/>
                                    </Tooltip>  
                                </div>
                                <div>
                                    <Tooltip title='List View'>
                                    <img src='https://www.gstatic.com/keep/list_view_24px.svg' alt='List'/>
                                    </Tooltip>  
                                </div>
                                <div>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={(event)=>{this.handleMenu(event)}}
                                    >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                    }}
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Sign Out</MenuItem>
                                </Menu>
                                </div>
                            </Toolbar>
                        </AppBar>
                        <div>
                            <Drawer getValue={this.state.openDrawer}></Drawer>
                        </div>
                    </MuiThemeProvider> 
                </div>
            )
        }
    
    }
)

    
    

