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

    constructor() {
        this.initChannels();
    }

     /**
     * @tariff - initChannels()
     * @description - This method initializes the basic 3 channels, this method is called in the class constructor and resetApplication() method.
     * @param - 
     * @returns - 
     */
    initChannels() {
        let channels = conf.get('channels');
        if (!channels) {
            channels = ["ZeeTV", "SubTV", "SonyTV"]
            conf.set('channels', channels);
        }
    }

     /**
     * @tariff - resetApplication()
     * @description - This method resets the application, clears all stored variables and calls the initialize initChannels() method.
     * @param -
     * @returns -
     */
    resetApplication(){
        conf.clear();
        conf.set('balance', 0);
        this.initChannels();
    }

    /**
     * @tariff - getPackage()
     * @description - This method is used to view the channel list in the package.
     * @param - 
     * @returns - {array} channels.
     */
    getPackage() {
        return conf.get('channels');
    }

    /**
     * @tariff - showCategory()
     * @description - Categories of channels are obtained by this method.
     * @param -
     * @returns - {String} list of channel categories like 1. Entertainment.
     */
    showCategory(){
      const categories = Object.keys(this.channelCategory);
      let cat ="";
        for (const [i,category] of categories.entries()) {
            cat += chalk.greenBright(`${i + 1}. ${category} \n`);
        }
        return cat;
    }

    /**
     * @tariff - showChannelsByCategories()
     * @description - This method returns the list of channels on the basis of category.
     * @param - {Integer} categoryNameIndex
     * @returns - {Array} channels.
     */
    showChannelsByCategories(categoryNameIndex){
        const categories = Object.keys(this.channelCategory);
        const channels = categories[categoryNameIndex -1]


        console.log("showChannelsByCategories----");
        console.log(this.channelCategory[channels])

        return this.channelCategory[channels];
    }

    /**
     * @tariff - showChannelOptions()
     * @description - This method selects the channel based on the channel index.
     * @param - {Integer} channelOptionIndex
     * @returns - {object} channel and channel number.
     */
    showChannelOptions =(channelOptionIndex)=>{
        console.log("Please choose channel:");
        let channels = this.showChannelsByCategories(channelOptionIndex);
            if(channels){
                let chNo ="";
                for (let i in channels) {
                    chNo += chalk.greenBright(`${(parseInt(i)+1)}. ${channels[i]} \n`);
                }
            return {chNo,channels};
         }
         return {};
   }

    /**
     * @tariff - addChannel()
     * @description - This method allows you to add a channel to the package.
     * @param - {string} channelName
     * @returns - {string} message.
     */
    addChannel(channelName) {

        let channels = conf.get('channels');

        if (channelName) {
            if(channels.includes(channelName)){
                return "exists";
            }else {
                let balance = conf.get('balance');
                if (balance < this.channelPrice) {
                return chalk.red.bold('You don’t have sufficient balance to add this channel in your tariff plan!');
                } else {
                    channels.push(channelName);
                    conf.set('channels', channels);
                    conf.set('balance', balance - this.channelPrice);
                return chalk.greenBright(`${channels}`);
                }
            }

        } else {
        return chalk.red.bold('Channel name is require, please enter channel name!');
        }
    }

    /**
     * @tariff - removeChannel()
     * @description - This method is used to delete the channel.
     * @param - {string} name
     * @returns - {string} message.
     */
    removeChannel(name){
        let channels = conf.get('channels');
        channels.splice(channels.indexOf(name),1);
        conf.set('channels', channels);
        return chalk.red.bold(`${name} channel removed!`);
    }
}

module.exports = Tariff;