import React from 'react';
//we import react dom here
import ReactDOM from 'react-dom';

const Modal = (props) => {
  //content JSX and where to attach in the DOM
  return ReactDOM.createPortal(
    //click outside modal redirects if we need
    <div onClick={props.onDismiss} className='ui dimmer modals visible active'>
      {/* stop propagation, event doesn't bubble up if I click on the content window  (doesn't close the modal) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className='ui standard modal visible active'
      >
        <div className='header'>{props.title}</div>
        <div className='content'>{props.content}</div>
        <div className='actions'>{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
