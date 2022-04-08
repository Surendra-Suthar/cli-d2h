const { expect } = require('chai');
const Account = require("../d2h/account/account");
let accountObj = new Account;

describe('Account', function () {
  describe('#getBalance', function () {
        it('return value', function () {
            expect(accountObj.getBalance()).to.be.contain('');
        });
  });

  describe('#addCash', function () {
        describe('check invalid amount add to balance', function () {
            it('check negative value', function () {
                expect(accountObj.addCash(-0)).to.be.contains('Please enter a valid amount.');
            });

            it('check empty value', function () {
                expect(accountObj.addCash()).to.be.contains('Please enter a valid amount.');
            });

            it('check zero value', function () {
                expect(accountObj.addCash(0)).to.be.contains('Please enter a valid amount.');
            });
            
            it('check string value', function () {
                expect(accountObj.addCash("test")).to.be.contains('Please enter a valid amount');
            });

            it('valid amount', function () {
                expect(accountObj.addCash(10)).to.be.contains('10 amount added successfully, your balance is')
            });

        });
 });
});
