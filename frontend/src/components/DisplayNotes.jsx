import React,{Component} from 'react';
import { Card, Tooltip} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Icon from './IconList';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './DisplayNotes.scss';
import DialogBox from './DialogBox';
const Service=require('../services/services');

class DisplayNote extends Component{
    constructor(props){
        super(props);
        this.state={
            color:'',
            reminder:null,
            open:false,
            snack:false
        }
    }

    componentDidMount(){
        this.filterReminder();
    }

    filterReminder=async()=>{
        if(this.props.note.reminder!==null){

        
        let date = new Date(this.props.note.reminder).toDateString(),
        time=this.props.note.reminder;
        let dateFront=date.slice(4,10);
        var hours = new Date(time).getHours() ; // gives the value in 24 hours format
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes =  new Date(time).getMinutes(); 
        minutes=minutes<10?'0'+minutes:minutes;
        var finalTime = hours + ":" + minutes + " " + AmOrPm; 
        let remindFront=dateFront+', '+finalTime;
        await this.setState({
            reminder:remindFront
        })
    }
  
    }
   
    handleDialogBox=()=>{
        this.setState({
            open:!this.state.open
        })
    }

    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    setColor = async (index)=>{
        await this.setState({
            color:index.code
        })

        let request={
            note_id:this.props.note._id,
            color:this.state.color
        }

        Service.updateNote(request,(err,response)=>{
            if(err){
                console.log(err);  
            }
            else{
                // console.log(response);
                this.props.getNotes();
            }
        });
    }

    deleteNote=()=>{

        this.setState({
            snack:!this.state.snack
        })

        let request={
            note_id:this.props.note._id
        }

        Service.deleteNote(request)
        .then(response=>{
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err);
        
        })
    }

    handleClose=()=>{
        this.setState({
            snack:!this.state.snack
        })
    }

    render(){
        
        return(
            <div>
                <Card className={this.props.list?'double':'single'}
                style={{backgroundColor:this.state.color === ''?this.props.note.color:this.state.color}}>
                    <div className='title' onClick={this.handleDialogBox}>
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
                    <div className='label2'>
                        <label>{this.props.note.description}</label>
                    </div>
                    {this.state.reminder===null?null:
                    <Chip label={this.state.reminder}></Chip>}
                    <div id='icons'>
                        <Icon getColor={this.setColor}
                        delete={this.deleteNote} /> 
                    </div>  
                </Card>
                <div>
                    <DialogBox open={this.state.open}
                    getNotes={this.props.getNotes} 
                    handleBox={this.handleDialogBox} 
                    item={this.props.note} />
                </div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.snack}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Note deleted</span>}
                    action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                        UNDO
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                    ]}
                />
            </div>
        )
     
    }
}

export default DisplayNote;