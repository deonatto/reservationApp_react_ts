import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Reserve.css';

interface ReserveProps{
    hotelId: string,
    showModalHandler: () => void
}

const Reserve: React.FC<ReserveProps> = ({hotelId, showModalHandler}) => {
  return (
    <div className='reserve-container'>
        <div className='reserve-wrapper'>
            <FontAwesomeIcon icon={faCircleXmark} className="reserve-icon" onClick={showModalHandler}/>
        </div>
    </div>
  )
}

export default Reserve