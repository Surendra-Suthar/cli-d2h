const conf = new (require("conf"))();
const chalk = require("chalk");
const Tariff = require("../tariff/tariff");

class Account extends Tariff{
  constructor() {
    super();
    conf.set("balance", 0);
  }

  /**
   * @account - getBalance()
   * @description - This method allows you to view your balance in the account.
   * @param -
   * @returns - {string} balance.
   */
  getBalance() {
    return conf.get("balance");
  }

  /**
   * @account - addCash()
   * @description - This method allows you to add cash to the account.
   * @param - {Integer} cash
   * @returns - {string} message.
   */
  addCash(cash) {
    let amount = conf.get("balance");

    if (cash > 0) {
      amount = amount + parseInt(cash);
      conf.set("balance", amount);
      return chalk.green.bold(
        `${cash} amount added successfully, your balance is ${amount}.`
      );
    } else {
      return chalk.red.bold("Please enter a valid amount.");
    }
  }
}

module.exports = Account;
