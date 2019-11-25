import React,{Component} from 'react';
import Popper from '@material-ui/core/Popper';
import './IconList.scss';
import { Checkbox, Divider } from '@material-ui/core';
const Service=require('../services/services');

class LabelPoppper extends Component{
    constructor(props){
        super(props);
        this.state={
            labels:[],
            currentLabel:''
        }
    }

    UNSAFE_componentWillMount(){
        this.getAllLabels();
    }

    getAllLabels=()=>{
        Service.getAllLabels((err,res)=>{
            if(err){
                console.log(err);
            }
            else{
                this.setState({
                    labels:res.data
                })
            }
        });
    }

    loadLabel=(event,item)=>{
        let request={
            note_id:this.props.note.id,
            label_name:item.label_name
        }

        Service.addLabelToNote(request)
        .then(response=>{
            console.log(response);
            this.props.getNotes();
        })
        .catch(err=>{
            console.log(err);
            
        })
    }
  

    render(){
        return(
            <div>
                <Popper className='labelPop' open={this.props.open} anchorEl={this.props.anchorEl}
                placement='top-start'>
                    <div id='label'>
                        <span>Label</span>
                    </div>
                    <div className='divide'>
                        <Divider />
                    </div>
                    <div>
                        {this.state.labels.map((item,index)=>
                         <div key={index} >
                            <Checkbox value={this.state.checked}
                            onChange={(event)=>this.loadLabel(event,item)} />
                            <span>{item.label_name}</span>
                         </div>
                        )} 
                    </div>
                </Popper>
            </div>
        )
    }
}

export default LabelPoppper;