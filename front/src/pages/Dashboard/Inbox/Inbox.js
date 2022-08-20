import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MailContext } from '../../../context/MailContext';
import { convertTodate } from '../../../Utils/converttime';
import { shortenAddress } from '../../../Utils/shortenaddress';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export const Inbox = () => {
  const { appStatus, AllMails } = useContext(MailContext);
  let navigate = useNavigate();
  const handleClick = (idx) => {
    navigate(`/dashboard/message/inboxMessage?${idx}`)
  }
  return (
    <>
   
      {
        appStatus === "notConnected" && (
          navigate('/')
        )
      }
      {
        appStatus === "connected" && (
          <>
          <div className="px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl teu text-slate-800 font-bold">Inbox ✨</h1>
              {AllMails.length > 0 ? 
             (<div className="w-full mb-8 py-4 overflow-hidden rounded-lg shadow-xs">

                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr
                        className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50"
                      >
                        <th className="px-4 py-3">Sender</th>
                        <th className="px-4 py-3">Message</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody
                      className="bg-white divide-y"
                    >
      
                      {
                        [...AllMails].reverse().map((data, idx) => {
                          return  (<tr className="text-gray-700 cursor-pointer" onClick={()=>{
                            handleClick(idx)
                          }} key={idx}>
                              <td className="px-4 py-3">
                               <div className="flex items-center text-sm">
                               {/* <!-- Avatar with inset shadow --> */}
                              <div
                                 className="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                               >
                                 <img
                                   className="object-cover w-full h-full rounded-full"
                                   src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                   alt="userimage"
                                   loading="lazy"
                                 />
                                 <div
                                   className="absolute inset-0 rounded-full shadow-inner"
                                   aria-hidden="true"
                                 ></div>
                               </div>
                               <div>
                                 <p className="font-semibold">{shortenAddress(data.sender)}</p>
                               </div>
                             </div> 
                              </td>
                              <td className="px-4 py-3 text-sm">
                              <span className='font-bold text-gray-700'>{data.subject} - </span>
                              <span className='font-semibold text-gray-500'>
                                {`${data.body.slice(0,40) + '...'}`}
                              </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {convertTodate(data.timestamp)}
                              </td>
                            </tr>)
                        })}
                    </tbody>
                  </table>
                </div>
              </div>) : (<div>There are no message in the Inbox.</div>)}
            </div>
          </>)
      }
    </>
  )
}
