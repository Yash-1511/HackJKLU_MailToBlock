import React from 'react'
import mail from "../images/features/about.gif"
import polygon from "../images/polygon.png"
import ipfs from "../images/ipfs.jpeg"
const About = () => {
    return (
        <>
            <section id="about" className="a1r[100px]">
                <div className="ab">
                    <div className="a9 a1t ac[-16px]">
                        <div className="a8 ae">
                            <div className="
                a1u aA[655px] a1v a2c
                wow
                fadeInUp
              " data-wow-delay=".1s">
                                <span className="
                  a1C a1f aI a2m ah
                ">
                                    Know About Our Project
                                </span>
                                <h2 className="
                  aH a1k a1y
                  sm:a1z
                  md:a1x[45px]
                  a1O
                ">
                                    About Our Project
                                </h2>
                                <p className="
                  a1g aG
                  md:a1C
                  a1D
                  md:a1D
                  aA[570px] a1u
                ">
                                    MailToBlock is a blockchain-based email service Which is built on Polygon and ipfs.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                        <div className="grid gap-12 row-gap-8 lg:grid-cols-2">
                            <div className="flex flex-col justify-center">
                                <div className="max-w-xl mb-6">
                                    <p className="text-base text-gray-700 md:text-lg">
                                    Allows users to e-mail a smart contract that will be generated and accepted peer to peer via e-mail.
                                    </p>
                                </div>
                                <div className="grid gap-8 row-gap-8 sm:grid-cols-2">
                                    <div>
                                        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                                            {/* <svg
                                                className="w-10 h-10 text-deep-purple-accent-400"
                                                stroke="currentColor"
                                                viewBox="0 0 52 52"
                                            >
                                                <polygon
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                                />
                                            </svg> */}
                                            <img src={polygon} alt="polygon image" className='p-2' width={80} height={80}/>
                                        </div>
                                        <h6 className="mb-2 font-semibold leading-5">
                                            Built on Polygon
                                        </h6>
                                        <p className="text-sm text-gray-900">
                                        It performs the job of "validators-as-a-service," adding an extra layer of security to chains. Polygon working on (Proof-of-stack) system.

                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                                            {/* <svg
                                                className="w-10 h-10 text-deep-purple-accent-400"
                                                stroke="currentColor"
                                                viewBox="0 0 52 52"
                                            >
                                                <polygon
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                                />
                                            </svg> */}
                                             <img src={ipfs} alt="polygon image" className='p-2' width={80} height={80}/>
                                        </div>
                                        <h6 className="mb-2 font-semibold leading-5">
                                            Use Filecoin and IPFS
                                        </h6>
                                        <p className="text-sm text-gray-900">
                                        All data stored is accessible on the public IPFS network via a content ID - interoperable with the tools and services building on the decentralized web.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img
                                    className="object-cover w-full h-56 rounded  sm:h-96"
                                    src={mail}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default About