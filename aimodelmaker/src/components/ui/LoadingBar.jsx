import React from 'react'
import { ProgressBar } from 'react-bootstrap';



/**
 * LoadingBar component
 * @param {number} progress - Progress of the loading bar. Value between 0 and 1.
 */
export default function LoadingBar({progress}) {

    if (progress < 0 || progress > 1) {
        throw new Error('Progress must be between 0 and 1');
    }

  return (
    <div>
        
        <ProgressBar now={progress * 100} label={`${Math.floor(progress * 100)}%`} />
      
    </div>
  )
}
