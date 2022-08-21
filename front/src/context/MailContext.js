import { createContext, useEffect, useState } from "react";
import MailToBlock from "../Utils/contracts/MailToBlock.sol/MailToBlock.json";
import {ContractAddress,} from "../Utils/key";
import { main } from '../components/StorageApi';
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
const { ethereum } = window;
const axios = require('axios');


export const MailContext = createContext();
const message = "Welcome to Mail To Block!Click to sign in and accept the Mail To Block Terms of Service ";
let contractAddress = ContractAddress;


// for getting contract
const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    MailToBlock.abi,
    signer
  )

  return contract;
}



export function MailProvider({ children }) {
  let navigate = useNavigate()
  const [appStatus, setAppStatus] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [AllMails, setAllMails] = useState([]);
  const [SentEmails, setSentEmails] = useState([]);
  const [SpamMails, setSpamMails] = useState([]);
  const [network, setNetwork] = useState(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [loading,setLoading] = useState(false);
  const [fileloading,setFileloading] = useState(false);
  const [balance,setBalance] = useState()
  useEffect(() => {
    checkIfWalletIsConnected();
    getInboxdata();
    GetSentItems();
    getNetwork();
  }, []);

  /**
   * Check if wallet is connected or not
   * @returns 
   */
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        fetchBalance(addressArray[0]);
        setAppStatus("connected");
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

      } else {
        navigate("/");
        setAppStatus("notConnected");
      }
    } catch (err) {
      navigate('/')
      setAppStatus("error");
      console.log(err);
    }
  }


  /**
   * connect wallet function
   * @returns 
   */
  const connectWallet = async () => {
    if (!ethereum) return setAppStatus("noMetaMask");
    try {
      setAppStatus("loading");

      const addressArray = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (addressArray.length > 0) {
        // for Signmessaging Coder.
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const signature = await signer.signMessage(message);
          setCurrentAccount(addressArray[0]);
          fetchBalance(addressArray[0]);
          setAppStatus("connected");
          navigate('/dashboard')
          getNetwork();
          getInboxdata();
          GetSentItems();
        } catch (err) {
          console.log(err)
        }
      } else {
        setAppStatus("notConnected");
      }
    } catch (err) {
      setAppStatus("error");
      console.log(err);
    }
  }

  /**
* Get Network.
*/
  const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache",
    80001: "Polygon Testnet Mumbai"
  };

  /**
   * getting current network
   * @returns 
   */
  const getNetwork = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");

    try {
      let chainId = await ethereum.request({ method: "eth_chainId" });
      const number = parseInt(chainId, 16);
      setNetwork(NETWORKS[number]);
      if (NETWORKS[number] !== "Polygon Testnet Mumbai") setWrongNetwork(true);
      console.log("Connected to chain " + wrongNetwork);
    } catch (err) {
      setAppStatus("error");
      console.log(err);
    }
  };


  /**
 * switch network.
 */
   const addnetwork = {
    polygonTE: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Polygon Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
    },
  };
   const switchNetwork = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...addnetwork["polygonTE"]
          }
        ]
      });
    } catch (err) {
     console.log("Error to change to network.")
    }
  };


  // for send mail 
  const ComposeMailMain = async (receiverAddress, subject, body, file, Filename) => {
    try {
      setFileloading(true);
      setLoading(true);
      const ipfsHash = await main(file);
      setFileloading(false);
      const TransactionHash = await getContract().sendEmail(
        receiverAddress,
        subject,
        body,
        Date.now().valueOf(),
        ipfsHash,
        Filename
      );
      await TransactionHash.wait();
      await console.log("DONE")
      setLoading(false)

    } catch (e) {
      console.log(e);
    }
  };
  //  for get all inbox mails
  const getInboxdata = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const inboxMails = await getContract().getInboxEmails();

      let data = inboxMails.map((e) => ({
        sender: e.sender,
        receiver: currentAccount,
        subject: e.subject,
        body: e.body,
        timestamp: e.timestamp,
        ipfsHash: e.ipfsHash,
        Filename: e.Filename
      }));
      var tempData = [];
      var spamData = [];
      let finaloutput = 0;
      for (let index = 0; index < data.length; index++) {
        const element = data[index].body;
        let response = await axios.post("https://spamemails.herokuapp.com/predict",{
            message:element
          })
        finaloutput = response.data.prediction;
        if(finaloutput === 0){
          tempData.push(data[index]);
        }
        else{
          spamData.push(data[index]);
        }
      }
      data = tempData
      setSpamMails(spamData)
      setAllMails(data);

    } catch (err) {
      console.log(err)
    }
  };


  // for get all sent mail
  const GetSentItems = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const sentEmails = await getContract().getSentEmails();

      const data = sentEmails.map((e) => ({
        sender: e.sender,
        receiver: e.receiver,
        subject: e.subject,
        body: e.body,
        timestamp: e.timestamp,
        ipfsHash: e.ipfsHash,
        Filename: e.Filename
      }));


      setSentEmails(data);
    } catch (err) {
      console.log(err)
    }

  }

  /**
   * For Display wallet balance.
   */
   const fetchBalance = async (balance) => {
    if (!ethereum) return setAppStatus("noMetaMask");

  
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.getBalance(balance).then((balance) => {
        const bal = ethers.utils.formatEther(balance);
       setBalance(Number.parseFloat(bal).toFixed(3));
      });
    } catch (err) {
      setAppStatus("error");
      console.log(err);
    }
  };

  const signout = () => {
    setAppStatus("notConnected")
    console.log("app status is=", appStatus);
    navigate("/")
    setCurrentAccount("")
  }
  return (
    <MailContext.Provider
      value={{
        connectWallet,
        appStatus,
        currentAccount,
        signout,
        getInboxdata,
        checkIfWalletIsConnected,
        ComposeMailMain,
        AllMails,
        SentEmails,
        GetSentItems,
        network,
        wrongNetwork,
        switchNetwork,
        SpamMails,
        loading,
        fileloading,
        balance
      }}
    >
      {children}
    </MailContext.Provider>
  );
}
