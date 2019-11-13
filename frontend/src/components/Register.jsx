import React, { Component } from 'react';
import './Register.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
const Service = require('../services/services')

class Register extends Component
{
    constructor(props){
        super(props);
        this.state={
          first_name:'',
          last_name:'',
          email:'',
          password:'',
          confirm_password:''
        }
    }
    
    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit=(event)=>
    {
        if(this.state.password !== this.state.confirm_password)
        {
            this.setState({
                password:'',
                confirm_password:''
            });
            console.log('Passwords do not match');
            return;
        }

        let value =
        {
            firstName:this.state.first_name,
            lastName:this.state.last_name,
            email:this.state.email,
            password:this.state.password
        }

    
        Service.register(value,(error,response)=>
        {
            if(error)
            {
                console.log('Error-->',error);
            }
            else
            {   
                this.props.history.push('/login');
            }
        })
        
    }
    render()
    {
        return(
            <div>
                <h2>Register Page</h2>
                    <MuiThemeProvider>
                    <Card className='registerCard'>
                        <div>
                            <TextField className='registerTextField' 
                                       label='First Name' 
                                       name='first_name'
                                       margin='normal' 
                                       variant='outlined'
                                       value={this.state.first_name}
                                       onChange={(event)=>this.input(event)}>
                            </TextField>
                        </div>
                        <div>
                            <TextField className='registerTextField'
                                       label='Last Name' 
                                       name='last_name'
                                       margin='normal' 
                                       variant='outlined'
                                       value={this.state.last_name}
                                       onChange={(event)=>this.input(event)}>
                            </TextField>
                        </div>
                        <div>
                            <TextField className='textField' 
                                       label='Email'
                                       name='email'
                                       margin='normal' 
                                       variant='outlined'
                                       value={this.state.email}
                                       onChange={(event)=>this.input(event)}>
                            </TextField>
                        </div>
                        <div>
                            <TextField className='textField' 
                                        label='Password'
                                        type='password'
                                        name='password' 
                                        margin='normal' 
                                        variant='outlined'
                                        value={this.state.password}
                                        onChange={(event)=>this.input(event)}>
                            </TextField>
                        </div>
                        <div>
                            <TextField className='textField' 
                                        label='Confirm Password'
                                        name='confirm_password'
                                        type='password' 
                                        margin='normal' 
                                        variant='outlined'
                                        value={this.state.confirm_password}
                                        onChange={(event)=>this.input(event)}>
                            </TextField>
                        </div>
                        <div className='registerbutton'>
                            <Button color='primary'
                                    margin='normal'
                                    variant='contained'
                                    onClick={(event)=>this.submit(event)}>Submit</Button>
                        </div>
                    </Card>
                        
                    </MuiThemeProvider>
            </div>
        )
    }
}

export default Register;