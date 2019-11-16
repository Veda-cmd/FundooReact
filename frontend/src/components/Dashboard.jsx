import React,{Component} from 'react';
import './Dashboard.css';
import {withStyles} from '@material-ui/core/styles';
import Drawer from './Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider, Tooltip, Avatar} from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@material-ui/core';
const Service = require('../services/services');

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
                width: "250px"
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
      backgroundColor: 'lightgrey',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(9),
        width: '700px',
        borderRadius:'10px'
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
                openDrawer:false,
                openReminder:false,
                src:sessionStorage.getItem('img')
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

        handleSignOut=()=>
        {
            this.props.history.push('/');
        }

        handleReload=()=>
        {
            window.location.reload();
        }

        handleDrawerOpen=(event)=>{
            this.setState({
                openDrawer:!this.state.openDrawer
            });
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
                                <div className='refresh' onClick={this.handleReload}>
                                    <Tooltip title='Refresh'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18">
                                    <path d="M9 13.5c-2.49 0-4.5-2.01-4.5-4.5S6.51 4.5 9 4.5c1.24 0 2.36.52 3.17 1.33L10 8h5V3l-1.76 1.76C12.15 3.68 10.66 3 9 3 5.69 3 3.01 5.69 3.01 9S5.69 15 9 15c2.97 0 5.43-2.16 5.9-5h-1.52c-.46 2-2.24 3.5-4.38 3.5z"/></svg>
                                    </Tooltip>							
                                </div>
                                <div className='settings'>
                                    <Tooltip title='List View'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                        <path d="M20,9 L4,9 L4,5 L20,5 L20,9 Z M20,19 L4,19 L4,15 L20,15 L20,19 Z M3,3 C2.45,3 2,3.45 2,4 L2,10 C2,10.55 2.45,11 3,11 L21,11 C21.55,11 22,10.55 22,10 L22,4 C22,3.45 21.55,3 21,3 L3,3 Z M3,13 C2.45,13 2,13.45 2,14 L2,20 C2,20.55 2.45,21 3,21 L21,21 C21.55,21 22,20.55 22,20 L22,14 C22,13.45 21.55,13 21,13 L3,13 Z" />
                                    </svg>
                                    </Tooltip>
                                </div>
                                <div className='settings'>
                                    <Tooltip title='Settings'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"/>
                                        <circle cx="12" cy="12" r="3.5"/>
                                    </svg>
                                    </Tooltip>  
                                </div>
                                <div className='profile'>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={(event)=>{this.handleMenu(event)}}
                                    >
                                    <Avatar src={this.state.src} />
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
                                    <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
                                </Menu>
                                </div>
                            </Toolbar>
                        </AppBar>
                        <div>
                            <Drawer getValue={this.state.openDrawer}
                                    props={this.props}
                            ></Drawer>
                        </div>
                    </MuiThemeProvider> 
                </div>
            )
        }
    
    }
)

    
    

