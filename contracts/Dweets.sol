pragma solidity ^0.5.1;

contract Dweets {
    struct Dweet {
        uint id;
        string message;
        address author;
    }

    mapping(uint => Dweet) public dweets;
    uint public dweetsCount;

    constructor() public {
        dweetsCount = 0;
    }

    function postDweet(string memory _message) public {
        dweets[dweetsCount] = Dweet(dweetsCount, _message, msg.sender);
        dweetsCount ++;
    }
}