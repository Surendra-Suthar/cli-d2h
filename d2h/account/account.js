const conf = new (require('conf'))()
const chalk = require('chalk')

class Account {

    getBalance() {
        let balance = conf.get('balance');

        if (!balance) {
            balance = 0
        }

        if(balance>0)
            return chalk.greenBright(`${balance}`);

        return chalk.redBright(`${balance}`);
    }

    addCash(cash) {
        let amount = conf.get('balance');

        if (!amount) {
            amount = 0
        }

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