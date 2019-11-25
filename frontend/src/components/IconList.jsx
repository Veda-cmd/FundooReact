import React, { Component } from 'react';
import RemindIcon from './RemindIcon';
import ColorIcon from './Color';
import ArchiveIcon from './ArchiveIcon';
import MoreIcon from './MoreIcon';
import RemindPopper from './RemindPopper';
import ColorPopper from './ColorPopper';
import MenuPopper from './MenuPopper';
import './IconList.scss'

class Icon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changeColor: false,
            menuOpen: false,
            remind: false,
            anchorEl: null
        }
    }

    loadColor = (element) => {
        this.props.getColor(element);
    }

    loadReminder = (event) => {
        this.setState({
            remind: !this.state.remind,
            anchorEl: event.currentTarget
        })
    }

    closeReminder = () => {
        this.setState({
            remind: !this.state.remind
        })
    }

    getData = (date, time) => {
        this.props.getReminder(date, time);
    }

    changeColour = (event) => {
        this.setState({
            changeColor: !this.state.changeColor,
            anchorEl: event.currentTarget
        })
    }

    menuOpen = (event) => {
        this.setState({
            menuOpen: !this.state.menuOpen,
            anchorEl: event.currentTarget
        })
    }

    closeColour = () => {
        this.setState({
            changeColor: !this.state.changeColor,
            anchorEl: null
        })
    }

    closeMenu = () => {
        this.setState({
            menuOpen: !this.state.menuOpen,
        })
    }

    delete=()=>{
        this.props.delete();
        this.closeMenu();
    }

    render() {
        return (
            <div className='options'>

                <RemindIcon openRemind={this.loadReminder} />
                <ColorIcon setColor={this.changeColour} />
                <ArchiveIcon setArchive={this.props.setArchive} />
                <MoreIcon openMenu={this.menuOpen} />

               
                <ColorPopper changeColor={this.state.changeColor}
                    anchorEl={this.state.anchorEl}
                    colorClose={this.closeColour}
                    props={this.loadColor}
                />
                
                <MenuPopper  getNotes={this.props.getNotes}
                    note={this.props.note} 
                    more={this.props.openNoteEditor}
                    delete={this.delete}
                    open={this.state.menuOpen}
                    closeMenu={this.closeMenu}
                    anchorEl={this.state.anchorEl} 
                />
               
                <RemindPopper getReminder={this.getData} close={this.closeReminder}
                open={this.state.remind} anchorEl={this.state.anchorEl} />
               
            </div>
        )
    }
}

export default Icon;