
const request = require('request');

var axios = require('axios');

var isValid = false;
var isValidUserF = false;
var isValidChildF = false;
var usersList = [];
var userProfilesList = [];
var userUid = "";
var birthDate = "";

function isValidChild(userName){

    userName = userName;

    getValidUsersInfo();
    isValidUser(userName);
    isValidAge();
}

//Function for getting valid users List and user profiles list
function getValidUsersInfo(){
    

    console.log("Calling APIS");

    axios.all([

        axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json'),
        axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json')
  
      ]).then(axios.spread((users, userProfiles) => {
  
        usersList = users.data
        userProfilesList = userProfiles.data
  
        console.log(usersList);
        console.log(userProfilesList);       
  
      })).catch(error => {
        console.log(error);
      });

}

// function for checking if user is Valid
function isValidUser(userName){

    // getValidUsersInfo();

    // loop for checking the if user exists in valid users list
    for (let i=0; i<usersList.length; i+=1) {

        if(usersList[i].username == userName){
            console.log("Valid User")
            userUid = users[i].uid;
            console.log("UUID :"+userUid);
            isValidUserF = true;
            return isValidUserF;
        }

    }

    return isValidUserF;

}

function isValidAge(){

    // Loop for finding the birthdate of valid user
    for (let i=0; i<userProfilesList.length; i+=1) {

        if(userProfilesList[i].userUid == userUid){
            console.log("Valid Uuid User")
            birthDate = userProfile[i].birthdate
            console.log("BIRTHDATE :"+birthDate)
            break
        }
    
    }

    console.log("PRESENT AGE :"+calculateAge(birthDate));

    var age = calculateAge(birthDate)

    if(age < 10){
        console.log("Valid child");
        isValidChildF = true;
        return isValidChildF
        
    }else{
        console.log("Invalid child");
        return isValidChildF
    }

}

// function for calculating age from birthdate.
function calculateAge(birthDate){

    var birth_year =""
    var birth_month =""
    var birth_day =""

    var bodList = birthDate.split("/")

    birth_year = bodList[0]
    birth_day = bodList[1]
    birth_month = bodList[2]
    
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();

    age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    return age;
}


function isValidUserOld(userName){

    axios.all([

      axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json'),
      axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json')

    ]).then(axios.spread((users, userProfiles) => {

      usersList = users.data
      userProfilesList = userProfiles.data

      console.log(users);
      console.log(userProfile);

        // console.log(users);

        // loop for checking the if user exists in valid users list
        for (let i=0; i<usersList.length; i+=1) {

            if(usersList[i].username == userName){
                console.log("Valid User")
                userUid = users[i].uid
                console.log("UUID :"+userUid)
                isValid = true;
                break
            }
    
        }


        if (isValid){
            
            // Loop for finding the birthdate of valid user
            for (let i=0; i<userProfilesList.length; i+=1) {

                if(userProfilesList[i].userUid == userUid){
                    console.log("Valid Uuid User")
                    birthDate = userProfile[i].birthdate
                    console.log("BIRTHDATE :"+birthDate)
                    isValid = true;
                    break
                }
            
            }

            console.log("PRESENT AGE :"+calculateAge(birthDate));
        }
       

        return isValid

    })).catch(error => {
      console.log(error);
    });

}


module.exports = {
    // ValidateUserAndAge,
    getValidUsersInfo,
    isValidUser,
    isValidChild,
    isValidAge,
    calculateAge
}