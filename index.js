#! /usr/bin/env node
const chalk = require("chalk");
const conf = new (require("conf"))();
const Account = require("./d2h/account/account");
let accounts = new Account();

const Tariff = require("./d2h/tariff/tariff");
let tariffs = new Tariff();

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
    6. Reset Application. \n >`,
    (name) => {
      switch (name) {
        case "1":
          const balance = accounts.getBalance();
          console.log(`Your balance is : ${balance}`);
          initialize();
          break;

        case "2":
          readline.question(`Please enter amount :`, (amount) => {
            const balance = accounts.addCash(amount);
            console.log(balance);
            initialize();
          });
          break;

        case "3":
          const pkg = tariffs.getPackage();
          console.log(`Your basic tariff package channels :`);
          console.log(pkg.join("\n"));
          initialize();
          break;

        case "4":
          addOn();
          initialize();
          break;

        case "5":
          removeChannel();
          initialize();
          break;

        case "6":
          tariffs.resetApplication();
          initialize();
          break;

        default:
          console.log(chalk.red.bold("Please enter valid input!"));
          initialize();
      }
    }
  );
};

const addOn = () => {
  console.log("Choose any one categories of channel:");
  let cat = tariffs.showCategory();
  readline.question(`${cat}`, (catq) => {
    showAddonOpt(catq);
    initialize();
  });
};

const removeChannel = () => {
  let channel = tariffs.getPackage();
  console.log(channel);
  readline.question(`Enter channel to remove :`, (chRemove) => {
    if (channel.indexOf(chRemove) >= 0) {
      const removed = tariffs.removeChannel(chRemove);
      console.log(removed);
    } else {
      console.log(chalk.red.bold(`${chRemove} channel not found!`));
    }
    initialize();
  });
};

const showAddonOpt = (chOpt) => {
  let { chNo, channels } = tariffs.showChannelOptions(chOpt);

  if (channels) {
    readline.question(`${chNo}`, (ch1) => {
      const add = tariffs.addChannel(channels[ch1 - 1]);
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

initialize();
