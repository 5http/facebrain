import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {

    const randomDeg = Math.floor(Math.random() * 360) + 0;

    return (
        <div className='center ma'>
            <div className='relative mt5'>
                <img id='inputimage' alt='' src={imageUrl} width='750'/>
                <div className='bounding-box' style={{ top:box.top, right:box.right, bottom:box.bottom, left:box.left }}></div>
                <div className='troll' style={{
                    transform:`translate(-50%, -50%) scale(1.75) rotate(${randomDeg}deg)`, 
                    top:box.yPos, left:box.xPos, width:box.faceWidth, height: box.faceWidth}}></div>
            </div>
        </div>
    );

}

export default FaceRecognition;