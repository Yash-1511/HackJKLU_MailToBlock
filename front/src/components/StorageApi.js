
import {Web3Storage} from "web3.storage"
import ncodeRFC5987ValueChars from "../Utils/Utils/URLencoding/Encoder"


export async function main (file) {
 
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgzOThCODQ2YTQzMjk0OTYxQzQzZjc2MGQ2RjI1YTQ3MDMzRjk1ZjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk4NTc1NjA5MjMsIm5hbWUiOiJNYWlsVG9CbG9jayJ9.ZXgt1baWFWkujzL8OHfARz6BWjMe54TeMsvBNuvEVo4";
  
    if (!token) {
      return console.error('A token is needed. You can create one on https://web3.storage')
    }
  
    if (!file) {
      return console.error('Please supply the path to a file or directory')
    }

    const storage = new Web3Storage({ token })
   
    console.log(`Uploading file of path :${file}`)
    const cid = await storage.put(file)
    console.log('Content added with CID:', cid)
    
    return cid; 
  }
