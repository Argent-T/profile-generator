var fs = require("fs");
var inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
inquirer.prompt([
        {
            type: "input",
            message: "what is your Username?",
            name: "username"
        },
        {
            type: "list",
            message: "Choose a color",
            name: "color",
            choices: [
                "Red",
                "Green",
                "Blue"
            ]
        }

    ]).then(function({ username }) {
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    
        axios.get(queryUrl).then(function(res) {
          const repoNames = res.data.map(function(repo) {
           
            return repo.name;
          });
    
          const repoNamesStr = repoNames.join("\n");
    
          fs.writeFile("repos.txt", repoNamesStr, function(err) {
            if (err) {
              throw err;
            }
    
            console.log(`Saved ${repoNames.length} repos`);
            console.log()
          });
        });
      });
    
}

promptUser()

// function generateHTML(answers){

    
// }



// promptUser()
//     .then(function(answers){


//     })