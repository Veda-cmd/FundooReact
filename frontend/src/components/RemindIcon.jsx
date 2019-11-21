import React,{Component} from 'react';
import {Tooltip} from "@material-ui/core";
import './IconList.scss';

class Remind extends Component{
    render(){
        return(
            <div id='remind'>
                <Tooltip title='Remind me'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"/>
                        <path d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/>
                    </svg>
                </Tooltip>
            </div>
        )}
}

export default Remind;