
import React,{Component} from 'react';
import classes from'./Person.css';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component{
    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }
    static contextType = AuthContext;
    componentDidMount(){
      //this.inputElement.focus();
      this.inputElementRef.current.focus();
      console.log(this.context.authenticated);
    }
    render(){
        console.log('[Person.js] rendering....');
        return (
            <Auxiliary>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p>
                
                /* <AuthContext>
                 {(context) => 
                 context.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p>}
                </AuthContext> */}
              
              <p key = "i1" onClick={this.props.click}>My name is {this.props.name} and my age is {this.props.age}</p>
              <p key ="i2" >{this.props.children} </p>
              <input key="i3"  
              //ref={(inputEle) => {this.inputElement = inputEle}}
              ref= {this.inputElementRef}
              type="text" 
              onChange={this.props.changed} 
              value={this.props.name}/>
              </Auxiliary>
         ) ;
    }
 
};

Person.PropTypes={
click: PropTypes.func,
name : PropTypes.string,
age: PropTypes.number,
changed: PropTypes.func

}

export default withClass(Person, classes.Person);