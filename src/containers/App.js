import React, { Component } from 'react';
//import Radium ,{StyleRoot}from 'radium';
//import styled from 'styled-components';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
//import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import Cockpit from  '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }
 
  state = {
   persons:[
     {id:'asdd',name:'Rahul' ,age:22},
      {id:'fhhhf',name:'Ranjan' ,age:28},
       {id:'rwrwr',name:'Shreya' ,age:22}
   ],
   otherState: 'some other value',
   showPersons:false,
   showCockpit:true,
   changeCounter:0,
   authenticated : false
  }

     static getDerivedStateFromProps(props,state){
      console.log('[App.js] getDerivedStateFromProps',props);
      return state;
     }

     componentDidMount(){
       console.log('[App.js],componentDidMount');
     }
     shouldComponentUpdate(nextProps,nextState){
      console.log('[App.js],shouldComponentUpdate');
      return true;
     }
     componentDidUpdate(){
      console.log('[App.js],componentDidUpdate ');
     }

  switchNameHandler=(newName)=>{
   // console.log('Was Clicked');
  // Don't do tis: this.state.pershons[0].name='Rahul Ranjan';
  this.setState({
    persons:[
     {name:'Rahul Ranjan',age:22},
      {name:'Ranjan' ,age:28},
       {name:'Shreya' ,age:2}
   ]

  })
  }

  nameChangeHandler=(event,id) =>{
    const personIndex= this.state.persons.findIndex( p =>{
      return p.id === id;
    });

    const person= {
      ...this.state.persons[personIndex]
    };
    //Alternative approach
    //const person= Object.assign({},this.state.persons[personIndex]);

    person.name=event.target.value;
    const persons= [...this.state.persons];
    persons[personIndex]=person;

  this.setState( (prevState,props) => {
    return {
      persons: persons,
      changeCounter: prevState.changeCounter +1
    };
    });
};
  

  togglePesonsHandler=()=>{
   const doesShow= this.state.showPersons;
   this.setState({showPersons: !doesShow});

  }

  deletePersonHandler=(personIndex) =>{
   //const person = this.state.persons.slice();
   const person= [...this.state.persons];  //ES 6  spread approach which is better approach
   person.splice(personIndex,1);
   this.setState({persons:person})

  }
  loginHandler=() => {
this.setState({authenticated:true});

  };

  render() {
    //let btnClass=[classes.Button];
    console.log('[App.js], render');
    
    let persons=null;
      if(this.state.showPersons){
       persons= <Persons 
    persons={this.state.persons}
    clicked={this.deletePersonHandler}
    changed={this.nameChangeHandler}
    isAuthenticated ={this.state.authenticated}/>;

         // style.backgroundColor='red';
         // style[':hover']={
         // backgroundColor:'salmon', 
         // color: 'black'
         // };
         
      }


    return (
      
      <Auxiliary>
        <button onClick={() => {this.setState({showCockpit:false});
      }}>Remove Cockpit
      </button>
      <AuthContext.Provider value={{authenticated: this.state.authenticated ,
         login: this.loginHandler}}>
        {this.state.showCockpit ? ( <Cockpit 
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        clicked={this.togglePesonsHandler}
        //login={this.loginHandler}
        />) : null}
        {persons}
        </AuthContext.Provider>
        </Auxiliary>
     
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

//export default Radium(App);
export default withClass(App, classes.App);
