import React,{Component} from 'react';
import {Card,TextField, Tooltip} from "@material-ui/core";
import './CreateNote.scss';
import Icon from './IconList';
const Service = require('../services/services');

class Note extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            title:'',
            description:'',
            color:'',
            reminder:''
        }
    }

    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getReminderData(date,time){
        console.log(date,time);
    }

    createNote=()=>
    {
        if(this.state.title !== ''){
            let request = {
                title:this.state.title,
                description:this.state.description,
                color:this.state.color
            }
            Service.createNote(request,(error,response)=>
            {
                if(error)
                {
                    console.log(error);
                    this.setState({
                        title:'',
                        description:'',
                        color:''
                    })
                    return;   
                }
                else
                {
                    this.setState({
                        title:'',
                        description:'',
                        color:''
                    })
                    console.log('created',response);
                    this.props.getAllNotes();
                }
            });
           
            this.props.noteEditor();
        }
        else{
            console.log('err');
            this.setState({
                title:'',
                description:'',
                color:''
            });
            this.props.noteEditor(); 
        }
    }

    getColor=(element)=>{
        let color = element.code;
        this.setState({
            color:color
        });   
    }

    render()
    {
        return(
            <div>
                {this.props.openNoteEditor ? 
                    <Card className='cardOpen' style={{backgroundColor:this.state.color}}>
                        <div className='createTitle'>
                            <div>
                                <TextField id='title'
                                multiline={true}
                                placeholder='Title'
                                name='title'
                                value={this.state.title}
                                onChange={(event)=>this.input(event)}
                                InputProps={{
                                    disableUnderline:true
                                }}/>
                            </div>
                            <div className='pinned'>
                                <Tooltip title='Pin note'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill='none' d="M0 0h24v24H0z"/>
                                        <path d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"/>
                                    </svg>
                                </Tooltip>
                            </div>
                        </div>
                        <div>
                            <TextField id='description' 
                            placeholder='Take a note...'
                            multiline={true}
                            name='description'
                            value={this.state.description}
                            onChange={(event)=>this.input(event)}
                            InputProps={{
                                disableUnderline:true
                            }} />
                        </div>
                        <div id='main'>
                            <div className='icon'>
                                <Icon openNoteEditor={this.props.openNoteEditor} 
                                getColor={this.getColor}
                                getReminder={this.getReminderData} />
                            </div>
                            <div id='button'>
                                <button onClick={this.createNote} className='button'>Close</button>
                            </div>
                        </div> 
                    </Card>
                    :<Card className='card' onClick={this.props.noteEditor}>
                        <div>
                            <TextField
                                placeholder='Take a note...'
                                value={this.state.title}
                                InputProps={{
                                    disableUnderline:true
                                }}
                            />
                        </div>
                    </Card>}
            </div>
        )
    }
}

export default Note;