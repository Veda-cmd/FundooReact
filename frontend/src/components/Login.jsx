import React, { Component } from 'react';
import './Login.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
const Service = require('../services/services')

class Login extends Component
{
    constructor(props){
        super(props);
        this.state={
          email:'',
          password:''
        }
    }

    input=(event)=>
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit(event)
    {
        let request =
        {
            email:this.state.email,
            password:this.state.password
        }

        Service.login(request,(error,response)=>
        {
            if(error)
            {
                console.log('Error-->',error);
            }
            else
            {   
                sessionStorage.setItem('token',response.data.session);
                this.props.history.push('/dashboard');
            }
        })
    }

    render()
    {
        return(
            <div>
                <h2>Login Page</h2>
                    <MuiThemeProvider>
                    <Card className='card'>
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
                                       name='password'
                                       type='password'
                                       margin='normal' 
                                       variant='outlined'
                                       value={this.state.password}
                                       onChange={(event)=>this.input(event)}>
                            </TextField>
                        </div>
                        <div className='button'>
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

export default Login;