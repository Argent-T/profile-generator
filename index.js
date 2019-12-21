var fs = require("fs");
var inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    inquirer.prompt([
        {
            type: "input",
            message: "what is your Github Username?",
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
        
    ]).then(function (response) {
        const queryUrl = `https://api.github.com/users/${response.username}`;
       const color = response.color
        axios.get(queryUrl).then(function (res) {
            const html = generateHTML(res, color);
            console.log(res.data)

            return writeFileAsync("index.html", html);
        }).then(function () {
            console.log("Successfully wrote to index.html");
        })
            .catch(function (err) {
                console.log(err);
            });

    });

}

function generateHTML(res, color) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
  </head>
  <body>
  <div>
    <h1 style="color:${color}">${res.data.name}</h1>
    <img id="bio" src="${res.data.avatar_url}" alt="${res.data.name}">
    <p>${res.data.bio}</p>
    <p>${res.data.company}</p>
    <p>Repo URL: <a href= ${res.data.html_url}>${res.data.name}'s Repo URL</a></p>
    <p>Public Repos: ${res.data.public_repos}</p>
    <p>Followers: ${res.data.followers}</p>
    <p>Following: ${res.data.following}</p>
    <p>Location: ${res.data.location}</p>
  </div>
  </body>
  </html>`;
}

promptUser()

