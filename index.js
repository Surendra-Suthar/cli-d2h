#! /usr/bin/env node
const chalk = require("chalk");
const Account = require("./d2h/account/account");
let accounts = new Account();

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const initialize = () => {
  readline.question(
    `\nWelcome. What would you like to do? Please choose, \n 
    1. To view your balance. \n 
    2. To add amount to your balance. \n 
    3. To view your basic tariff package. \n 
    4. To add addon channel to your tariff package. \n 
    5. To remove the channel from your tariff plan. \n  \n 
    6. Reset Application. \n\n >`,
    (name) => {
      switch (name) {
        case "1":
          const balance = accounts.getBalance();
          console.log(`Your balance is : ${balance}`);
          break;

        case "2":
          readline.question(`Please enter amount :`, (amount) => {
            const balance = accounts.addCash(amount);
            console.log(balance);
            initialize();
          });
          break;

        case "3":
          const pkg = accounts.getPackage();
          console.log(`Your basic tariff package channels :`);
          console.log(pkg.join("\n"));
          break;

        case "4":
          addOn();
          break;

        case "5":
          removeChannel();
          break;

        case "6":
          accounts.resetApplication();
          break;

        default:
          console.log(chalk.red.bold("Please enter valid input!"));
      }
      initialize();
    }
  );
};

const addOn = () => {
  console.log("Choose any one categories of channel:");
  let cat = accounts.showCategory();
  readline.question(`${cat}`, (catq) => {
    showAddonOpt(catq);
    initialize();
  });
};

const showAddonOpt = (chOpt) => {
  let { chNo, channels } = accounts.showChannelOptions(chOpt);

  if (channels) {
    readline.question(`${chNo}`, (ch1) => {
      const add = accounts.addChannel(channels[ch1 - 1]);
      if (add === "exists") {
        console.log(
          chalk.red.bold(
            "Channel already exists in your tariff, please select other channel!"
          )
        );
        showAddonOpt(chOpt);
      } else {
        console.log(add);
      }
      initialize();
    });
  } else {
    console.log(chalk.red.bold(`Please choose valid category!`));
  }
};

const removeChannel = () => {
  let channel = accounts.getPackage();
  console.log(channel);
  readline.question(`Enter channel to remove :`, (chRemove) => {
    if (channel.indexOf(chRemove) >= 0) {
      const removed = accounts.removeChannel(chRemove);
      console.log(removed);
    } else {
      console.log(chalk.red.bold(`${chRemove} channel not found!`));
    }
    initialize();
  });
};

initialize();
