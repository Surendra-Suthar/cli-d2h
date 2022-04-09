const { expect } = require('chai');
const Account = require("../d2h/account/account");
let accountObj = new Account;

describe('Account', function () {
  describe('#getBalance', function () {
        it('balance greater than zero', function () {
            expect(accountObj.getBalance()).to.be.greaterThan(0);
        });

        it('balance is zero', function () {
            expect(accountObj.getBalance()).to.be.lessThanOrEqual(0);
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
                expect(accountObj.addCash(50)).to.be.contains('50 amount added successfully, your balance is')
            });

        });
 });
});
