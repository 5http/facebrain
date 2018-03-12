import React from 'react';
import SimpleReactValidator from 'simple-react-validator';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.validator = new SimpleReactValidator();
    }

    onNameChange = (event) => {
        this.setState({name:event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email:event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password:event.target.value});
    }

    onSubmitRegister = () => {
        if(this.validator.allValid()){
            fetch('https://warm-basin-53907.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render(){
        return (
            <article className="bg-trans-white br3 ba b--black-10 mv4 w-100 mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" 
                            onChange={this.onNameChange} />
                            {this.validator.message('name', this.state.name, 'required|min:3')}
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
                            onChange={this.onEmailChange} />
                            {this.validator.message('email', this.state.email, 'required|email')}
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
                            onChange={this.onPasswordChange} />
                            {this.validator.message('password', this.state.password, 'required|min:3')}
                        </div>
                        </fieldset>
                        <div>
                        <input
                            onClick={this.onSubmitRegister} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent dim pointer f5 dib pointer" type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>   
        );
    }  
}

export default Register;