import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { TextField, Tooltip } from '@material-ui/core';
import Icon from './IconList';
import './DialogBox.scss';
const Service = require('../services/services');

class DialogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
            title: this.props.item.title,
            description: this.props.item.description
        }
    }

    input = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClose = (event) => {

        let request = {
            note_id: this.props.item._id,
            title: this.state.title,
            description: this.state.description,
            color: this.state.color
        }

        Service.updateNote(request).then(response => {
            console.log(response);
            this.props.getNotes();
            this.props.handleBox();
        }).catch((err) => {
            console.log(err);
        })
    }

    componentWillReceiveProps() {
        this.setState({ color: this.props.item.color })
    }

    updateColor = (element) => {
        let color = element.code;
        this.setState({
            color: color
        });

    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open}
                    PaperProps={{
                        style: {
                            backgroundColor: this.state.color
                        }
                    }}>
                    <div className='mainHead' >
                        <div>
                            <TextField id='dialogTitle'
                                multiline={true}
                                placeholder='Title'
                                name='title'
                                value={this.state.title}
                                onChange={(event) => this.input(event)}
                                InputProps={{
                                    disableUnderline: true
                                }} />
                        </div>
                        <div className='pinHead'>
                            <Tooltip title='Pin note'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill='none' d="M0 0h24v24H0z" />
                                    <path d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z" />
                                </svg>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <TextField id='dialogDesc'
                            placeholder='Take a note...'
                            multiline={true}
                            name='description'
                            value={this.state.description}
                            onChange={(event) => this.input(event)}
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                    <div className='iconHead'>
                        <div id='iconList'>
                            <Icon getColor={this.updateColor} />
                        </div>
                        <div id='buttonHead'>
                            <button className='buttonHead' onClick={(event) => this.handleClose(event)}>Close</button>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default DialogBox;