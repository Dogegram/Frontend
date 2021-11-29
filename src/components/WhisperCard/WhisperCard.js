import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { showModal } from '../../redux/modal/modalActions';
import { WhisperIcon } from '../Icons/Icons';
import { Shake } from 'reshake'


const WhisperCard = (props) => {
  const history = useHistory();
  const [whisperText, setWhisperText] = useState('');
  const [whisperRemaining, setWhisperRemaining] = useState(200);
  const [shake, setShake] = useState(false);

  const syncText = async (text) => {
          await props.setWhisperTextFinal(text)
  }
 
 const setText = async (text) => {
    const maxCharecters = 200;
    const remaining = maxCharecters - whisperText.length;
    if( maxCharecters - text.length > 0  || remaining > 0) {
      setShake(false);
      setWhisperText(text); 
      setWhisperRemaining(remaining);
      await syncText(text)
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
    }
  }

  return (
    <Shake 
    h={16}
    v={19}
    r={0}
    dur={1000}
    int={0.5}
    max={20}
    fixed={false}
    fixedStop={false}
    freez={false}
    active={shake}
>
      <div style={{margin: "30px"}}>
    <h2 className="text-center h2 bold" style={{marginBottom: "10px"}}>Whisper to @{props.username}</h2>
    <textarea className="form-group__whisperinput" placeholder="Whisper Text" value={whisperText}  onChange={(event) =>{setText(event.target.value)}}  />
    <p className="text-center" style={{marginTop: "10px"}}>{whisperRemaining} characters remaining</p>
    <h5>PLEASE NOTE THAT ONCE SENT CANNOT BE DELETED. This is not a encrypted 
      chat but can be only accessed by @{props.username} (by design) tho it still shound't 
    be used to share nuclear codes. Please don't share personal information.</h5>
    {/*console.log(whisperTextLength, 'l46')*/}
  </div>
  </Shake>
  );
};



export default WhisperCard;
