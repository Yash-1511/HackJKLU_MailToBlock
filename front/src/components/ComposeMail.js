import React, { useState, useContext } from 'react';
import { MailContext } from '../context/MailContext';
import ReactTooltip from 'react-tooltip';
import { Link, useNavigate } from 'react-router-dom';
function ComposeMail() {
  const { wrongNetwork } = useContext(MailContext);
  const [tooltip, showTooltip] = useState(true);
  let navigate = useNavigate();
  return (
    <>
      <div className="fixed bottom-0 right-0 md:bottom-8 md:right-12 z-10 cursor-pointer">
        <button type="button" data-tip={!wrongNetwork ? "Send Mail" : "Please switch network"} className={wrongNetwork ? 'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed' : "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"} onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false);
            setTimeout(() => showTooltip(true), 50);
          }} onClick={()=>{
            navigate('/dashboard/compose')
          }}>
          COMPOSE
        </button>
        {tooltip && <ReactTooltip effect="solid" />}
      </div>
    </>
  );
}
export default ComposeMail;