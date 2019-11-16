import React,{Component} from 'react';
const Service = require('../services/services');

class Verification extends Component{

    load=()=>
    {
        let request= this.props.match.params.url;
        console.log(request);
        
        Service.verify(request,(error,response)=>
        {
            if(error)
            {
                console.log('Error-->',error);
            }
            else
            {   
               console.log(response);
            }
        })
    }

    render()
    {
        return(
            <div onLoad={this.load()}>Email verified successfully</div>
        )
    }
}

export default Verification;