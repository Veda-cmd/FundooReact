import React,{Component} from 'react';
import Popper from '@material-ui/core/Popper';
import './IconList.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class MenuPopper extends Component{
    render(){
        return(
            <div>
                {this.props.more?
                <Popper className='menuPop' open={this.props.open} anchorEl={this.props.anchorEl}
                placement='top-start'>
                    <List className='listText'>
                        <ListItem button>
                            <span>Add Label</span>
                        </ListItem>
                    </List>
                </Popper>
                :
                <Popper className='menuPop' open={this.props.open} anchorEl={this.props.anchorEl}
                placement='top-start'>
                    <List className='listText'>
                        <ListItem button>
                            <span>Delete Note</span>
                        </ListItem>
                        <ListItem button>
                            <span>Add Label</span>
                        </ListItem>
                    </List>
                </Popper>}
            </div>
        )
    }
}

export default MenuPopper;