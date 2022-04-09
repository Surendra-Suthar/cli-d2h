const conf = new (require('conf'))()
const chalk = require('chalk')

class Account {

    constructor() {
        conf.set('balance', 0);
    }

    getBalance() {
        return conf.get('balance');
    }

    addCash(cash) {
        
        let amount = conf.get('balance');

        if (cash > 0) {
            amount = (amount + parseInt(cash));
            conf.set('balance', amount);
            return chalk.green.bold(`${cash} amount added successfully, your balance is ${amount}.`);
        } else {
          return chalk.red.bold('Please enter a valid amount.');
        }
    }

}

module.exports = Account;