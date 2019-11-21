import React,{Component} from 'react';
import RemindIcon from './RemindIcon';
import ColorIcon from './Color';
import ArchiveIcon from './ArchiveIcon';
import MoreIcon from './MoreIcon';
import ColorPopper from './ColorPopper';
import MenuPopper from './MenuPopper';
import './IconList.scss'

class Icon extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            changeColor:false,
            menuOpen:false,
            anchorEl:null
        }
    }

    loadColor=(element)=>{
        this.props.getColor(element);
    }

    changeColour=(event)=>
    {
        this.setState({
            changeColor:!this.state.changeColor,
            anchorEl:event.currentTarget  
        })
    }

    menuOpen=(event)=>{
        this.setState({
            menuOpen:!this.state.menuOpen,
            anchorEl:event.currentTarget
        })
    }

    closeColour=()=>
    {
        this.setState({
            changeColor:!this.state.changeColor,
            anchorEl:null  
        })
    }

    closeMenu=()=>
    {
        this.setState({
            menuOpen:!this.state.menuOpen,
            anchorEl:null  
        })
    }

    render(){
        return(
            <div className='options'>
               
                <RemindIcon />
                <ColorIcon setColor={this.changeColour}/>
                <ArchiveIcon />
                <MoreIcon openMenu={this.menuOpen}/>

                <div>
                    <ColorPopper changeColor={this.state.changeColor}
                        anchorEl={this.state.anchorEl}
                        colorClose={this.closeColour}
                        props={this.loadColor}
                    />
                </div>
                <div>
                    <MenuPopper more={this.props.openNoteEditor} 
                    open={this.state.menuOpen} anchorEl={this.state.anchorEl} />
                </div>
            </div>
        )
    }
}

export default Icon;