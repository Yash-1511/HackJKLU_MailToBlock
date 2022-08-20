// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract MailToBlock {
    // Event for send email function
    event Send(address sender,address reciever,string subject,string body,uint256 timestamp, string ipfsHash,string Filename
    );


    // Structure of an email
    struct Email{
        address sender; // Address of the current user's wallet
        address receiver; // Address of receiver's walley
        string subject; // Subject of the email
        string body; // Body of the email
        uint256 timestamp; // current block timestamp as seconds since unix epoch
        string ipfsHash; // CID (Content Identifier) of Attached files
        string Filename;
    }

    Email[] emails;

    mapping(address => Email[]) public inbox;
    mapping(address => Email[]) public sent;

    
    // Send Email function
    function sendEmail(address _reciever, string memory subject, string memory body, uint256 timestamp, string memory ipfsHash, string memory Filename) public {
        require(msg.sender.balance > 0 , "You may not have enough funds.");
        require(msg.sender != _reciever, "Sender and reciever address cannot be same.");

        inbox[_reciever].push(Email(msg.sender, _reciever, subject, body, timestamp, ipfsHash,Filename));
        sent[msg.sender].push(Email(msg.sender, _reciever, subject, body, timestamp, ipfsHash,Filename));

        emit Send(msg.sender, _reciever, subject, body, timestamp, ipfsHash,Filename);
    }

    // Fetch All Emails of the current user who is connected with the smart contract
   function getInboxEmails() public view returns(Email[] memory) {
       return inbox[msg.sender];
   }

    // Fetch Sent Emails of the current user who is connected with the smart contract
   function getSentEmails() public view returns(Email[] memory) {
       return sent[msg.sender];
   }

}
