import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { showModal } from '../../redux/modal/modalActions';
import FormInput from '../FormInput/FormInput';
import { WhisperIcon } from '../Icons/Icons';
import WhisperCard from '../WhisperCard/WhisperCard';
import axios from 'axios';
import toast from 'react-hot-toast'

const WhisperButton = ({ showModal, username }) => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  var whisperTextFinal = ''
  const setWhisperTextFinal = (text)=> whisperTextFinal=text

  const postWhisper = async ()=>{
    try{
    const req =  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/whisper/${username}`, {message: whisperTextFinal},  { headers:{ 'authorization': token } })
  } catch(err){
    throw new Error(err)
  }  
}

  
  return (
    <WhisperIcon
      style={{ cursor: 'pointer' }}
      onClick={() => 
        showModal(
          {
            options: [
              {
                text: 'Send',
                onClick: (a) => toast.promise(postWhisper()
                , {
                  loading: 'Loading...',
                  success: 'It went through!!',
                  error: 'Error sending it?!?!?',
                }),
              },
            ],
            children: (
              <WhisperCard username={username} setWhisperTextFinal={setWhisperTextFinal}/>
            ),
          },
          'OptionsDialog/OptionsDialog'
        )
      }
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (props, component) => dispatch(showModal(props, component)),
});

export default connect(null, mapDispatchToProps)(WhisperButton);
