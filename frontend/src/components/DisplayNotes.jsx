import React,{Component} from 'react';
import { Card, Tooltip} from '@material-ui/core';
import Icon from './IconList';
import './DisplayNotes.scss';

class DisplayNote extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            color:''
        }
    }
   
    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    setColor=(index)=>{
        this.setState({
            color:index.code
        })
    }

    render(){
        return(
            <div>
                <Card className={this.props.list?'double':'single'} 
                style={{backgroundColor:this.state.color===''?this.props.note.color:this.state.color}}>
                    <div className='title'>
                        <div className='label1'>
                            <label>{this.props.note.title}</label>
                        </div>
                        <div className='pin'>
                            <Tooltip title='Pin note'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"/>
                            </svg>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='label1'>
                        <label>{this.props.note.description}</label>
                    </div>
                    <div id='icons'>
                        <Icon getColor={this.setColor} /> 
                    </div>
                    
                </Card>
            </div>
        )
     
    }
}

export default DisplayNote;