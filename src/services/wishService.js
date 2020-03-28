
const https = require('https');

var validRequests = [];
var user = {};

// function for checking valid user with age < 10 years.
async function validateChild(userName, wishText) {
    await https.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json', async (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        await resp.on('data', (chunk) => {
            data += chunk;
        });

        const usersList = JSON.parse(data);
        var userUid;

        var child = usersList.filter(function (item, index) {
            return usersList[index].username == userName;
        });

        if (child.length < 1) {
            throw new Error('Child is not registered.');
        }
        userUid = child[0].uid;
        await https.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json', async (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            await resp.on('data', (chunk) => {
                data += chunk;
            });

            const userProfilesList = JSON.parse(data);

            const childProfile = userProfilesList.filter(function (item, index) {
                return userProfilesList[index].userUid == userUid;
            });

            user.birthDate = childProfile[0].birthdate;
            user.address = childProfile[0].address;

            var age = calculateAge(user.birthDate);

            if (age >= 10) {
                throw new Error('Child is invalid as age is greater than 10.');
            }

            // TODO: Move below code in a seperate function
            validObj = {};
            // Setting valid user's properties
            validObj.username = user.username
            validObj.address = user.address;
            validObj.wishText = user.wishText;

            // putting valid rquests into list
            validRequests.push(validObj);

        }).on("error", (err) => {
            throw new Error('Failed to fetch users profile.');
        });

    }).on("error", (err) => {
        throw new Error('Failed to fetch users list.');
    });
    user.username = userName;
    user.wishText = wishText;
}

function submitWish(wishText) {
    validObj = {};
    // Setting valid user's properties
    validObj.username = user.username
    validObj.address = user.address;
    validObj.wishText = wishText;

    // putting valid rquests into list
    validRequests.push(validObj);
    user = {};
}

// function for calculating age from birthdate.
function calculateAge(birthDate) {

    var birth_year = ""
    var birth_month = ""
    var birth_day = ""

    var bodList = birthDate.split("/")

    birth_year = bodList[0]
    birth_day = bodList[1]
    birth_month = bodList[2]

    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();

    age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
        age--;
    }
    return age;
}


module.exports = {
    validateChild,
    submitWish,
    validRequests
}