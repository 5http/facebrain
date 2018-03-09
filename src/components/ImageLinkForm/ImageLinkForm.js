import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onButtonRandom}) => {

    return (
        <div>
            <div className='center mt4'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-50 center' type="text" onChange={onInputChange} />
                    <button 
                        className='w-25 f5 link ph3 pv2 dib white bg-blue bg-animate hover-bg-dark-blue b ttu'
                        onClick={onButtonSubmit}
                        >Detect</button>
                    <button 
                        className='w-25 f5 link ph3 pv2 dib white bg-red bg-animate hover-bg-dark-red b ttu'
                        onClick={onButtonRandom}
                        >Random</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;