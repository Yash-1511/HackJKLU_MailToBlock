import React, { useState, useContext } from 'react';
import { ethers } from "ethers";
import { MailContext } from '../../../context/MailContext';
import SuccessModal from '../../../components/SuccessModal';

const Compose = () => {
    const { currentAccount, ComposeMailMain } = useContext(MailContext);
    const [error, setErrormsg] = useState("")
    const [show, setShow] = useState(false);
    const [iserror, setIserror] = useState(false)
    const [formData, setFormData] = useState(
        {
            receiver: "",
            body: "",
            subject: "",
        }
    );
    const checkAddress = () => {
        let result = ethers.utils.isAddress(formData.receiver);
        let check = formData.receiver.toLowerCase() === currentAccount;
        let nullcheck = formData.receiver === "";
        if (check) {
            setErrormsg("sender and reciever address are same")
            setIserror(true)
            return false
        }
        if (nullcheck) {
            setErrormsg("please enter reciever address")
            setIserror(true)
            return false
        }
        if (result) {
            setIserror(false)
            setErrormsg("")
            return true;
        }
        else {
            setIserror(true)
            setErrormsg("Receiver address is not valid")
            return false;
        }
    }
    // for the fetch the file from the form.
    const [file, setFile] = useState();
    const handleForms = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        try {
            e.preventDefault();
            let output = checkAddress();
            console.log("output is: " + output)
            if (output) {
                console.log("submitted")
                setIserror(false)
                setShow(true);
                await ComposeMailMain(formData.receiver, formData.subject, formData.body, file, file[0].name);

                await setFormData({ receiver: "", body: "", subject: "" });
                await setFile("")
                console.log("Email sent successfully")
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
       <>
        {show && <SuccessModal/>}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl teu text-slate-800 font-bold">New Message ✨</h1>

            <form onSubmit={submit}>

                {/* sender address  */}
                <div className="relative z-0 mb-6 mt-10 w-full group">
                    <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" defaultValue={`${currentAccount}`} readOnly />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">From</label>
                </div>

                {/* reciever address  */}
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="receiver" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" value={formData.receiver}
                        onChange={handleForms} />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">To</label>

                    {error && (<div className="text-md mt-1 text-red-700">{error}</div>)}
                </div>

                {/* dmail subject  */}
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="subject" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.subject} onChange={handleForms} required="" />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Subject</label>
                </div>

                {/* message box */}
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Type here..." name="body" value={formData.body} onChange={handleForms}></textarea>

                {/* For file uploading  */}
                <div className="form-group mt-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload file</label>
                    <input className="block mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 cursor-pointer focus:outline-none" id="default_size" type="file" name="file" onChange={e => setFile(e.target.files)} required />
                    <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mt-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
            </form>

        </div>
        </>
    )
}

export default Compose