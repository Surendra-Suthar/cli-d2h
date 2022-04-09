
# NodeJS Command Line Application

### Overview: 
Create a D2H like command line application using NodeJS which will be a  standalone application with basic functionalities like viewing your balance, add  balance, view the tariff packages, add the channels to tariff packages if user has  sufficient balance etc. 

Show the output below to the user with welcome message when  application get initialized: 
Welcome. 

#### What would you like to do? Please choose, 

1. To view your balance. (Note: Initial balance is 0) 
2. To add amount to your balance (Note: Ask user for amount and add it  in his balance. Please consider all possible scenarios) 
3. To view your basic tariff package (Note: Initialize user with 3 basic  channels) 
4. To add addon channel to your tariff package (Note: when user choose  this option, show them below categories and ask user to choose any  one of those categories and based on that show the channels.) 

    a. Entertainment 
    
    b. Educational 

    c. Regional 
    
    d. Sports 

Note: If the user has sufficient balance, then add that channel to  user’s tariff package and update the balance accordingly, else show  error message that ‘You don’t have sufficient balance to add this  channel in your tariff plan’ 

5. To remove the channel from your tariff plan (Note: ask user for  channel name, remove it from user’s tariff if it exists, else show error  message ‘You don’t have <channel_name> in your tariff plan’

### Note

• You don’t need to use a database for managing data. Cache will be  sufficient. 

• You are required to write unit tests to cover all the major scenarios. • Your application should run independently on any system without any  difficulties. 

• Create a private github repository, create a PR and share the link. 


### Judgement Criteria: 

• You will be judged upon, 

o Your understanding of the requirements. 

o How do you use design patterns? 

o How do you use OOPS concepts? 

o Code quality and reusability  

o Unit test coverage


To local run this project : 

```bash
  npm i
  npm link
```
