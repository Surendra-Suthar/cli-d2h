const conf = new (require('conf'))()
const chalk = require('chalk')

class Tariff {

    channelPrice = 10;

    channelCategory = {
        "Entertainment": ["Zee", "Zee1", "Zee2"],
        "Educational": ["Unacademy", "Study IQ", "LESICS"],
        "Regional": ["9X", "ETV", "Zee24"],
        "Sports": ["SporTV", "ESPN", "SonyTEN"],
    };

    // channelOpt = {
    //     "1": ["Zee", "Zee1", "Zee2"],
    //     "2": ["Unacademy", "Study IQ", "LESICS"],
    //     "3": ["9X", "ETV", "Zee24"],
    //     "4": ["SporTV", "ESPN", "SonyTEN"],
    // };

    // channelCategory1 = {
    //     "a": ["Entertainment", ["Zee", "Zee1", "Zee2"]],
    //     "b": ["Educational", ["Unacademy", "Study IQ", "LESICS"]],
    //     "c": ["Regional", ["9X", "ETV", "Zee24"]],
    //     "d": ["Sports", ["SporTV", "ESPN", "SonyTEN"]],
    // };

    constructor() {
        let channels = conf.get('channels')
        if (!channels) {
            channels = ["ZeeTV", "SubTV", "SonyTV"]
            conf.set('channels', channels);
        }
    }

    getPackage() {
        return conf.get('channels');
    }

    showCategory(){
      const categories = Object.keys(this.channelCategory);
      let cat ="";
        for (const [i,category] of categories.entries()) {
            cat += chalk.greenBright(`${i + 1}. ${category} \n`);
        }
        return cat;
    }

    showChannelsByCategories(categoryName){
        const categories = Object.keys(this.channelCategory);
        const channels = categories[categoryName -1]
        return this.channelCategory[channels];
    }


    showChannelOptions =(catq)=>{
        console.log("Please choose channel:");
        let channels = this.showChannelsByCategories(catq);
        let chNo ="";
        for (let i in channels) {
            chNo += chalk.greenBright(`${(parseInt(i)+1)}. ${channels[i]} \n`);
        }
        return {chNo,channels};
    }

    addChannel(cat, name) {
        let channels = conf.get('channels');

        if (name) {

            if(channels.includes(name)){
                console.log(
                    chalk.red.bold('Channel already exists in your tariff, please select other channel!')
                )
                 return "exists";
            }else {
                let balance = conf.get('balance');
                if (balance < this.channelPrice) {
                   return chalk.red.bold('You don’t have sufficient balance to add this channel in your tariff plan!');
                } else {
                    channels.push(name);
                    conf.set('channels', channels);
                    conf.set('balance', balance - this.channelPrice);
                   return chalk.greenBright(`${channels}`);
                }
            }

        } else {
           return chalk.red.bold('Channel name is require, please enter channel name!');
        }
    }

    removeChannel(name){
        let channels = conf.get('channels');
        channels.splice(channels.indexOf(name),1);
        conf.set('channels', channels);
        console.log(chalk.red.bold(`${name} channel removed!`));
    }
1
}

module.exports = Tariff;