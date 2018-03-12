import React from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component {

    constructor(props) {
        super(props);
        this.detect = '';
        this.detectInput = '';
        this.inputLength = 0;
        this.input = '';
    }

    componentDidMount() {
        this.detect = document.getElementById('detect');
        this.detectInput = document.getElementById('detect-input');
    }

    onInputChange = (event) => {
        this.inputLength = event.target.value.length;
        this.input = event.target.value;
        this.inputOk();
    }

    inputOk = () => {
        if(this.inputLength > 0) {
            this.detect.classList.remove('input-disabled');
            this.detectInput.classList.remove('border-red');
            return true;
        } else {
            this.detect.classList.add('input-disabled');
            this.detectInput.classList.add('border-red');
            return false;
        }
    }

    onButtonSubmit = () => {
        if(this.inputOk()){
            this.props.onButtonSubmit(this.input);
            this.detectInput.value = '';
            this.inputLength = 0;
            this.input = 0;
        } 
    }

    onButtonRandom = () => {
        this.props.onButtonRandom();
    }

    render(){
        return (
            <div>
                <div className='center mt4'>
                    <div className='form center pa3 br3 shadow-5 bg-trans-white'>
                        <input id='detect-input'
                        className='f4 pa2 w-50 center' type="text" placeholder="image url..." onChange={this.onInputChange} />
                        <button 
                            id='detect'
                            className='w-25 f5 link ph3 pv2 dib white bg-blue bg-animate hover-bg-dark-blue b ttu input-disabled'
                            onClick={this.onButtonSubmit}
                            >Detect</button>
                        <button 
                            id='random'
                            className='w-25 f5 link ph3 pv2 dib white bg-red bg-animate hover-bg-dark-red b ttu'
                            onClick={this.onButtonRandom}
                            >Random</button>
                    </div>
                </div>
            </div>
        );
    } 
}

export default ImageLinkForm;