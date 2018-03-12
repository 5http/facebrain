import React from 'react';
import SimpleReactValidator from 'simple-react-validator';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
        this.validator = new SimpleReactValidator();
    }

    onEmailChange = (event) => {
        this.setState({signInEmail:event.target.value});    
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword:event.target.value});
    }

    onSubmitSignIn = () => {
        if(this.validator.allValid()){
            fetch('https://warm-basin-53907.herokuapp.com/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
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

    render() {
        return (
            <article className="bg-trans-white br3 ba b--black-10 mv4 w-100 mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
                            onChange={this.onEmailChange} />
                            {this.validator.message('email', this.state.signInEmail, 'required|email')}
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
                            onChange={this.onPasswordChange} />
                            {this.validator.message('password', this.state.signInPassword, 'required')}
                        </div>
                        </fieldset>
                        <div>
                        <input
                            onClick={this.onSubmitSignIn} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent dim pointer f5 dib pointer" type="submit" value="Sign in" />
                        </div>
                    </div>
                </main>
            </article>   
        );
    }
}

export default SignIn;