import React, { useContext, useState } from 'react'
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import { MailContext } from '../../context/MailContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Inbox } from './Inbox/Inbox';
import { SentMail } from './Sentmail/Sentmail';
import  Message  from './Message/Message';
import Settings from './Settings';
import ComposeMail from '../../components/ComposeMail';
import { Spammail } from './Spammail/Spammail';
import Compose from './Compose';
const Dashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { appStatus } = useContext(MailContext);
    let navigate = useNavigate();
    let location= useLocation();
    var a = window.location.href;
    const slug= a.substring(a.indexOf('?') + 1);
    return (
        <>
         {
                appStatus === "notConnected" && (
                    navigate('/')         
                )
            }
            {
                appStatus === "connected" && (<div className="flex h-screen overflow-hidden">

                    {/* Sidebar */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    {/* Content area */}
                    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                        {/*  Site header */}
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                        <main>
                            <div className="w-full max-w-9xl mx-auto">

                                {/* banner */}
                                {location.pathname==='/dashboard' && (<WelcomeBanner/>) }
                                {location.pathname==='/dashboard/inbox' && (<Inbox/>) }
                                {location.pathname==='/dashboard/sentMail' && (<SentMail/>) }
                                {location.pathname==='/dashboard/spamMail' && (<Spammail/>) }
                                {location.pathname==='/dashboard/settings' && (<Settings/>) }
                                {location.pathname==='/dashboard/message/inboxMessage' && (<Message />) }
                                {location.pathname==='/dashboard/message/sentMessage' && (<Message />) }
                                {location.pathname==='/dashboard/message/spamMessage' && (<Message />) }
                                {location.pathname==='/dashboard/compose' && (<Compose />) }

                                {/* Dashboard actions */}
                                <div className="sm:flex sm:justify-between sm:items-center mb-8">

                                </div>

                                {/* Cards */}
                               
                            </div>
                        </main>
                        <ComposeMail/>
                    </div>
                    {/* if user is not connected  */}
                </div>)
            }
           

        </>
    )
}

export default Dashboard