import React, { useContext } from 'react';
import { MailContext } from "../../context/MailContext"
import { shortenAddress } from '../../Utils/shortenaddress';
import polygon from "../../images/polygon.png"
import error from "../../images/error.png"

function WelcomeBanner() {
  const { currentAccount,AllMails,SentEmails,network,wrongNetwork,switchNetwork,SpamMails,balance } = useContext(MailContext);
  // For welcome message 
  const hour = new Date().getHours();
  const welcomeTypes = ['Good morning', 'Good afternoon', 'Good evening'];
  let welcomeText = '';
  if (hour < 12) welcomeText = welcomeTypes[0];
  else if (hour < 18) welcomeText = welcomeTypes[1];
  else welcomeText = welcomeTypes[2];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">

        {/* Background illustration */}
        <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
          <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
              <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
              <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
              <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                <stop stopColor="#A5B4FC" offset="0%" />
                <stop stopColor="#818CF8" offset="100%" />
              </linearGradient>
              <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                <stop stopColor="#4338CA" offset="0%" />
                <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <g transform="rotate(64 36.592 105.604)">
                <mask id="welcome-d" fill="#fff">
                  <use xlinkHref="#welcome-a" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
              </g>
              <g transform="rotate(-51 91.324 -105.372)">
                <mask id="welcome-f" fill="#fff">
                  <use xlinkHref="#welcome-e" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
              </g>
              <g transform="rotate(44 61.546 392.623)">
                <mask id="welcome-h" fill="#fff">
                  <use xlinkHref="#welcome-g" />
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
              </g>
            </g>
          </svg>
        </div>

        {/* Content */}
        <div className="relative">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">{welcomeText} {shortenAddress(currentAccount)} 👋</h1>
          <p>Here is what’s happening with your projects today:</p>
        </div>

      </div>
      <div
        className={`flex items-center justify-between p-4 mb-8 text-md text-slate-800 bg-indigo-200 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple ${wrongNetwork && 'bg-red-200'}`}
      >
        <div className="flex items-center">
            <img src={wrongNetwork ? error : polygon} alt="polygonimage" width={50} height={70} />
          <span className='px-4'>You are currently on {network}</span>
        </div>
       {wrongNetwork &&( <span className='cursor-pointer bg-red-500 p-3 rounded text-white hover:bg-red-600' onClick={()=>{
        switchNetwork()
       }}>Switch Network</span>)}
      </div>

      {/* dashboard cards starts here  */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {/* <!-- Card --> */}
              <div
                className="flex items-center p-4 bg-white rounded-lg shadow-xs"
              >
                <div
                  className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    className="mb-2 text-sm font-medium text-gray-600"
                  >
                    Account balance
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-700"
                  >
                    {balance} {!wrongNetwork ? "MATIC" : "ETH"}
                  </p>
                </div>
              </div>
              {/* <!-- Card --> */}
              <div
                className="flex items-center p-4 bg-white rounded-lg shadow-xs"
              >
                <div
                  className="p-3 mr-4 text-green-500 bg-green-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    className="mb-2 text-sm font-medium text-gray-600"
                  >
                    Inbox Messages
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-700"
                  >
                    {AllMails.length}
                  </p>
                </div>
              </div>
              {/* <!-- Card --> */}
              <div
                className="flex items-center p-4 bg-white rounded-lg shadow-xs"
              >
                <div
                  className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    className="mb-2 text-sm font-medium text-gray-600"
                  >
                    Sent Messages
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-700"
                  >
                   {SentEmails.length}
                  </p>
                </div>
              </div>
              {/* <!-- Card --> */}
              <div
                className="flex items-center p-4 bg-white rounded-lg shadow-xs"
              >
                <div
                  className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    className="mb-2 text-sm font-medium text-gray-600"
                  >
                    Spam Messages
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-700"
                  >
                    {SpamMails.length}
                  </p>
                </div>
              </div>
            </div>

    </div>
  );
}

export default WelcomeBanner;
