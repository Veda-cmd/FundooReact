/**
 * @description:
 * @file:Dashboard.jsx
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React,{Component} from 'react';
import './Dashboard.scss';
import Appbar from './AppBar';
import Note from './CreateNote';
import Drawer from './Drawer';
import DisplayNote from './DisplayNotes';
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core";
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
        },
        'MuiListItem': {
            'button': {
                '&:hover':{'borderRadius':'0 25px 25px 0'}
            },
        },
        'MuiChip':{
            'root':{
                marginLeft:'10px'
            }
        }
    }
});

class Dashboard extends Component{

    constructor(props)
    {
        /** 
         * @description super(props) would pass props to the parent constructor.
         * Initial state is set for anchorEl,open,openDrawer and src.
        */ 

        super(props);
        this.state={
            openDrawer:false,
            openNoteEditor:false,
            list:false,
            notes:[],
            labels:[]
        }
    }

    
    /**
     * @description handleDrawerOpen is used to handle drawer navigation on dashboard.
     * if true, the drawer is displayed else it is closed.
    */

    handleDrawerOpen=(event)=>{
        this.setState({
            openDrawer:!this.state.openDrawer,
            openNoteEditor:false
        });
    }

    /**
     * @description handleNoteEditor is used for managing open/close state of note editor.
    */

    handleNoteEditor=()=>
    {
        this.setState({
            openNoteEditor:!this.state.openNoteEditor
        })
    }

    handleList=(event)=>
    {
        this.setState({
            list:!this.state.list
        })
    }

    getAllNotes=()=>
    {

        Service.getNotes((err,response)=>
        {
            if(err)
            {
                console.log('Error',err);
            }
            else
            {
                let data = response.data.reverse();   
                this.setState({
                    notes:data,
                });
            }
        })
    }

    getAllLabels=()=>{
        Service.getAllLabels((err,response)=>{
            if(err)
            {
                console.log('Error',err);
            }
            else
            {
                this.setState({
                    labels:response.data,
                });
            }
        })
    }

    UNSAFE_componentWillMount(){
        this.getAllNotes();
        this.getAllLabels();
    }

    render()
    {
        console.log(this.state.notes);
        
        return(
            <div>
                <MuiThemeProvider theme={theme}>
                    <div>
                    <Appbar 
                        handleDrawer={this.handleDrawerOpen}
                        getNotes={this.getAllNotes}
                        list={this.handleList}
                        tagChange={this.state.list}
                        props={this.props} />
                    </div>
                    <div>
                        <Drawer getValue={this.state.openDrawer}
                                labels={this.state.labels}
                                props={this.props}
                        ></Drawer>
                    </div>
                    <div className={this.state.openDrawer?'shift':'cardAnimate'}>
                        <Note openNoteEditor={this.state.openNoteEditor}
                            noteEditor={this.handleNoteEditor} 
                            getAllNotes={this.getAllNotes} />
                        <div className='displayCards'>
                            {this.state.notes.map((item,index)=>
                                <div key={index} >
                                <DisplayNote 
                                note={item} getNotes={this.getAllNotes}
                                list={this.state.list} />
                                </div>
                            )}
                        </div>
                    </div>
                </MuiThemeProvider> 
            </div>
        )
    }

}

export default Dashboard;

    
    

