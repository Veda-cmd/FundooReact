import React,{Component} from 'react';
import {Card,TextField} from "@material-ui/core";
import './CreateNote.scss';
import Icon from './IconList';
const Service = require('../services/services');

class Note extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            title:'',
            description:''
        }
    }

    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createNote=()=>
    {
        if(this.state.title !== '' && this.state.description!== ''){
            let request = {
                title:this.state.title,
                description:this.state.description
            }
            Service.createNote(request,(error,response)=>
            {
                if(error)
                {
                    console.log(error);
                    return;   
                }
                else
                    console.log('created',response);
                
            });

            this.props.noteEditor();
        }
        else{
            console.log('err'); 
        }
    }

    render()
    {
        return(
            <div>
                {this.props.openNoteEditor ? 
                    <Card className='cardOpen'>
                        <div>
                            <TextField
                            placeholder='Title'
                            name='title'
                            value={this.state.title}
                            onChange={(event)=>this.input(event)}
                            InputProps={{
                                disableUnderline:true
                            }}/>
                        </div>
                        <div>
                            <TextField placeholder='Take a note...'
                            name='description'
                            value={this.state.description}
                            onChange={(event)=>this.input(event)}
                            InputProps={{
                                disableUnderline:true
                            }} />
                        </div>
                        <div id='main'>
                            <Icon/>
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