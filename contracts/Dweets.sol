pragma solidity ^0.5.1;

contract Dweets {
    struct Dweet {
        uint id;
        string message;
        uint likes;
        address author;
    }

    event newDweetEvent(
        uint id
    );

    event newLikeEvent(
        uint dweetId
    );

    mapping(uint => Dweet) public dweets;
    uint public dweetsCount;

    constructor() public {
        dweetsCount = 0;
    }

    function postDweet(string memory _message) public {
        dweets[dweetsCount] = Dweet(dweetsCount, _message, 0, msg.sender);
        dweetsCount ++;

        emit newDweetEvent(dweetsCount - 1);
    }

    function like(uint _dweetId) public {
        //require a valid dweet id
        require(0 <= _dweetId && _dweetId < dweetsCount, "Dweet with _dweetId does not exist.");
        dweets[_dweetId].likes ++;

        emit newLikeEvent(_dweetId);
    }
}