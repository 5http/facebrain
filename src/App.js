import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Images from './assets/Images';
import './App.css';


const app = new Clarifai.App({
  apiKey: 'e1d7e8aea2fa49b39bc8b2bd24386c1b'
 }); 

const images = Images;

class App extends Component {

  constructor() {
    super();
    this.state = {
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
    this.vars = {
      input: '',
      imageUrl: this.getRandomImage(),
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  } 

  getRandomImage = () => {
    return images[Math.floor(Math.random()*images.length)];
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs["0"].data.regions["0"].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const top = clarifaiFace.top_row * height;
    const right = width - (clarifaiFace.right_col * width);
    const bottom = height - (clarifaiFace.bottom_row * height);
    const left = clarifaiFace.left_col * width;
    const faceWidth = width - (left + right);
    const faceHeight = height - (top + bottom);
    const xPos = left + faceWidth / 2;
    const yPos = top + faceHeight / 2;

    return {
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      faceWidth: faceWidth,
      xPos: xPos,
      yPos: yPos
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(this.vars.imageUrl);
  }

  onInputChange = (event) => {
    this.vars.input = event.target.value;
  }

  onButtonSubmit = () => {
    this.vars.imageUrl = this.vars.input;
    this.callClarifaiApi(true);
  }

  onButtonRandom = () => {
    this.vars.imageUrl = this.getRandomImage();
    this.callClarifaiApi(false);
  }

  callClarifaiApi = (count) => {
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.vars.imageUrl)
    .then(response => {
      if(response && count){
        fetch('http://localhost:3000/image', {
          method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        });
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
      this.callClarifaiApi(false);
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, route, box} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
        ? <div>
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} 
            onButtonRandom={this.onButtonRandom}
          />
          <FaceRecognition box={box} imageUrl={this.vars.imageUrl} />
          </div>
        : (
          route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
        }
      </div>
    );
  }
}

export default App;
