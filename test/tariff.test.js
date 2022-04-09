const { expect } = require('chai');
const conf = new (require('conf'))()
const Tariff = require("../d2h/tariff/tariff");
let tariffObj = new Tariff;

describe('Tariff', function () {

  describe('#getPackage', function () {
        it('return value', function () {
            expect(tariffObj.getPackage()).to.be.an('array');
        });
  });

  describe('#showCategory', function () {
    it('return value', function () {
        expect(tariffObj.showCategory()).to.be.contain('');
    });
  });

  describe('#showChannelsByCategories', function () {
        it('check undefined value', function () {
            expect(tariffObj.showChannelsByCategories('Entertainment')).to.be.undefined;
        });
        it('check value', function () {
            expect(tariffObj.showChannelsByCategories(1)).to.be.an('array');
        });
  });

  describe('#showChannelOptions', function () {
        it('check null in return', function () {
            expect(tariffObj.showChannelOptions('Entertainment')).to.be.empty;
        });
        it('check return value', function () {
            expect(tariffObj.showChannelOptions(1)).to.be.an('object');
        });
    });

    describe('#addChannel', function () {
        it('sufficient balance', function () {
            expect(tariffObj.addChannel('ESPN')).to.be.contains('You don’t have sufficient balance');
        });

        it('check channel already exists in your tariff', function () {
            expect(tariffObj.addChannel('SonyTV')).to.be.contains('exists');
        });

        it('check channel added', function () {
            expect(tariffObj.addChannel('Unacademy')).to.be.contains(',ESPN');
        });
    });


    describe('#removeChannel', function () {
        it('check return value', function () {
            expect(tariffObj.removeChannel('Unacademy')).to.be.contain('Unacademy channel removed!');
        });
    });


    describe('#resetApplication', function () {
        it('check function', function () {
            expect(tariffObj.resetApplication()).to.be.any;
        });
    });

    describe('#initChannels', function () {
        it('check function', function () {
            expect(tariffObj.initChannels()).to.be.any;
        });
    });


});
