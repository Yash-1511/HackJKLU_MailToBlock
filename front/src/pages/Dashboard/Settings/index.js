import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MailContext } from '../../../context/MailContext';
import heroimage from "../../../images/profile-bg.jpg";
import userimage from "../../../images/user.png"
import { shortenAddress } from '../../../Utils/shortenaddress';
import { DuplicateIcon,GlobeAltIcon } from '@heroicons/react/outline'
import copy from '../../../Utils/copyaddress';
import { Toaster } from "react-hot-toast";

const Settings = () => {
    const { currentAccount, appStatus,network,wrongNetwork,switchNetwork,balance } = useContext(MailContext);
    let navigate = useNavigate();
    return (
        <>
            {
                appStatus === "notConnected" && (
                    navigate('/')
                )
            }
            {
                appStatus === "connected" && (
                    <div>
                    <Toaster position="bottom-center" reverseOrder={false} />
                        <div className="h-56">
                            <img className="w-full h-full object-cover" src={heroimage} width="2560" height="440" alt="Company background" loading='lazy' />
                        </div>
                        <header className="text-center pb-6 border-b border-slate-200">
                            <div className="w-full lg:px-8">
                                <div className="mx-auto">

                                    {/* <!-- Avatar --> */}
                                    <div className="mt-[-3rem] mb-2">
                                        <div className="inline-flex ml-[-0.25rem] mt-[-0.25rem]">
                                            <img className="rounded-full" src={userimage} width="100" height="100" alt="Avatar" />
                                        </div>
                                    </div>

                                    {/* <!-- Company name and info --> */}
                                    <div className="">
                                        <h2 className="text-2xl text-slate-800 font-bold mb-2">
                                            {shortenAddress(currentAccount)}
                                        </h2>
                                        <p className="text-md">{balance}  {!wrongNetwork ? "MATIC🚀" : "ETH"}</p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="px-4 sm:px-6 lg:px-8 py-4">
                            <div className="mt-5 md:mt-0 md:col-span-2">
                               
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        Account Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        defaultValue={currentAccount} readOnly
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3 sm:mt-6 ">
                                                    <button
                                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={()=>{
                                                            copy(currentAccount)
                                                        }}
                                                    >
                                                        Copy <DuplicateIcon className='h-6 w-6 mx-1' />
                                                    </button>
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                        Connected Chain
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${wrongNetwork && 'border-red-700'}`} defaultValue={network} readOnly
                                                    />
                                                </div>
                                                {wrongNetwork && ( <div className="col-span-6 sm:col-span-3 sm:mt-6 ">
                                                    <button
                                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={()=>{switchNetwork()}}
                                                    >
                                                        Switch Network <GlobeAltIcon className='h-6 w-6 mx-1' />
                                                    </button>
                                                </div>
)}
                                               
                                                <div className="col-span-6">
                                                    <label htmlFor="account-balance" className="block text-sm font-medium text-gray-700">
                                                        Account Balance
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="street-address"
                                                        id="street-address"
                                                        autoComplete="street-address"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-2/4 shadow-sm sm:text-sm border-gray-300 rounded-md" value={balance + `${!wrongNetwork ? " MATIC" : " ETH"}`} readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                    </div>

                )
            }

        </>
    )
}

export default Settings