const Marranito = artifacts.require('Marranito');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

contract('Marranito', accounts => {
  const [
    owner,
    unauthorized,
    userA,
  ] = accounts;
  describe('Deployment', () => {
    it('should deploy the contract without problems', () => {
      return Marranito.deployed().then(instance => {
        marranito = instance;
        expect(marranito).not.to.be.empty;
      });
    });
    it('should get a valid instance of the contract', () => {
      return expect(marranito).is.not.null;
    });
    it('should be registered to the expected owner', () => {
      return marranito.isOwner().then(response => {
        expect(response).to.be.true;
      });
    });
  });
  describe('Operations', () => {
    it('should get transferOwnerships from other accounts implicitly', () => {
      return web3.eth.sendTransaction({
        from: unauthorized,
        value: web3.utils.toWei('1'),
        to: marranito.address,
      })
        .then(response => {
          expect(response.transactionHash).to.match(/0x[a-f0-9]{64}/);
        });
    });
    it('should get transferOwnerships from other accounts explicitly', () => {
      return marranito.feedMe({from: userA, value: web3.utils.toWei('1')})
        .then(response => {
          expect(response.tx).to.match(/0x[a-f0-9]{64}/);
        });
    });
    it('should belong to owner', () => {
      return marranito.isOwner({from: owner}).then(response => {
        expect(response).to.be.true;
      });
    });
    it('should allow the owner to transferOwnership the ownership to a new owner', () => {
      return marranito.transferOwnership(userA, {from: owner})
        .then(response => {
          expect(response.tx).to.match(/0x[a-f0-9]{64}/);
        });
    });
    it('should belong to userA', () => {
      return marranito.isOwner({from: userA}).then(response => {
        expect(response).to.be.true;
      });
    });
    it('should not belong to owner', () => {
      return marranito.isOwner({from: owner}).then(response => {
        expect(response).to.be.false;
      });
    });
    it('should not allow not owner to seize the contract', () => {
      return expect(marranito.transferOwnership(owner, {from: owner}))
        .to.be.eventually.rejected;
    });
  });
});
