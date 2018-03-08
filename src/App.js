import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'e1d7e8aea2fa49b39bc8b2bd24386c1b'
 }); 

 const images = [
   'https://cdn.wccftech.com/wp-content/uploads/2018/01/Trump.jpg',
   'https://lobelog.com/wp-content/uploads/0620trumppolicies01-1.jpg',
   'http://static5.uk.businessinsider.com/image/588f61fcdd089527278b4a6f-480/donald-trump.jpg',
   'https://news-images.vice.com/images/articles/meta/2016/05/05/trump-emergency-mexico-reacts-to-the-real-possibility-of-a-trump-presidency-1462478545.jpg',
   'https://www.theglobepost.com/wp-content/uploads/2017/04/Trump1.jpg',
   'https://media.nu.nl/m/rfdx2eda9uvt_wd1280.jpg',
   'https://images1.persgroep.net/rcs/S0ctHhiNdjiLN6EAJoaZtl2pC_k/diocontent/119936421/_fitwidth/763?appId=2dc96dd3f167e919913d808324cbfeb2&quality=0.8',
   'https://media4.s-nbcnews.com/j/newscms/2017_46/2227061/171115-kim-tractor-mc-1139_ecc9e0f4fa88ae6821c6dd820befe719.nbcnews-ux-2880-1000.jpg',
   'https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2018/01/15/16/kim-jong-un.jpg',
   'https://images1.persgroep.net/rcs/3fL3_IHnK6nYXgGzCP4MuzYEHuI/diocontent/116982128/_fitwidth/763?appId=2dc96dd3f167e919913d808324cbfeb2&quality=0.8',
   'https://secure.i.telegraph.co.uk/multimedia/archive/02701/kim_2701423b.jpg',
 ];

class App extends Component {

  constructor() {
    super();
    this.state = {
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
    this.vars = {
      input: '',
      imageUrl: this.getRandomImage(),
    }
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
    this.callClarifaiApi();
  }

  onButtonRandom = () => {
    this.vars.imageUrl = this.getRandomImage();
    this.callClarifaiApi();
  }

  callClarifaiApi = () => {
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.vars.imageUrl)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
      this.callClarifaiApi();
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
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} 
            onButtonRandom={this.onButtonRandom}
          />
          <FaceRecognition box={box} imageUrl={this.vars.imageUrl} />
          </div>
        : (
          route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
        )
        }
      </div>
    );
  }
}

export default App;
