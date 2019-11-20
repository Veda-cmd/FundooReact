import React,{Component} from 'react';
import { Card} from '@material-ui/core';
import Icon from './IconList';
import './DisplayNotes.scss';

class DisplayNote extends Component{
    
    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        return(
            <div>
                <Card className='single'>
                    <div className='label1'>
                        <label>{this.props.note.title}</label>
                    </div>
                    <div className='label1'>
                        <label>{this.props.note.description}</label>
                    </div>

                    <div className='icons'>
                        <Icon />
                    </div>
                    
                </Card>
            </div>
        )
     
    }
}

export default DisplayNote;