
export const convertTodate=(timestamp)=>{
    return  new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit'}).format(timestamp);
     
  }
  export const convertTotime=(timestamp)=>{
     return   new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(timestamp);
  
   }