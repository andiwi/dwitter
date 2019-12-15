const Dweets = artifacts.require("./Dweets.sol");
const BN = require("bn.js");

contract("Dweets", accounts => {
  it("posts a dweet", async () => {
    const dweetsInstance = await Dweets.deployed();
    const receipt = await dweetsInstance.postDweet("first dweet", {
      from: accounts[0]
    });

    const dweetsCount = await dweetsInstance.dweetsCount();
    const dweet = await dweetsInstance.dweets(0);
    assert.equal(dweetsCount, 1, "increments the dweets count");
    assert(dweet[0].eq(new BN(0)), "dweet id is 0");
    assert.equal(dweet[1], "first dweet", "correct dweet message");
    assert(dweet[2].eq(new BN(0)), "has zero likes");
    assert.equal(dweet[3], accounts[0], "correct author address");

    //check emitted event
    assert.equal(receipt.logs.length, 1, "an event was triggered");
    assert.equal(
      receipt.logs[0].event,
      "newDweetEvent",
      "the event type is correct"
    );
    assert.equal(
      receipt.logs[0].args.id.toNumber(),
      0,
      "the dweet id is correct"
    );
  });

  it("likes a dweet", async () => {
    const dweetsInstance = await Dweets.deployed();
    //post a dweet
    const receipt = await dweetsInstance.postDweet("first dweet", {
      from: accounts[0]
    });

    //like the dweet
    const receipt2 = await dweetsInstance.like(0, { from: accounts[1] });
    const dweet = await dweetsInstance.dweets(0);
    assert(dweet[0].eq(new BN(0)), "dweet id is 0");
    assert.equal(dweet[1], "first dweet", "correct dweet message");
    assert(dweet[2].eq(new BN(1)), "has one like");
    assert.equal(dweet[3], accounts[0], "correct author address");

    //check emitted event
    assert.equal(receipt2.logs.length, 1, "an event was triggered");
    assert.equal(
      receipt2.logs[0].event,
      "newLikeEvent",
      "the event type is correct"
    );
    assert.equal(
      receipt2.logs[0].args.dweetId.toNumber(),
      0,
      "the dweet id is correct"
    );
  });
});
