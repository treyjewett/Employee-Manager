const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Create an array to store Employee inputs in.
let team = [];

// Create the main prompt that will go into each employee's profile.
const teamBuilder = [
    {
        type: 'input',
        name: 'name',
        message: "What is your Employee's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your Employee's ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "How can I reach the Employee via Email?"
    },
    {
        type: 'list',
        name: 'role',
        choices: [
            'Manager',
            'Engineer',
            'Intern'
        ]
    }
]

// Once the main prompt has been answered, narrow down the results to see what kind of employee the employer is adding.
employeeEntry = () => {
    inquirer.prompt(teamBuilder)
        .then(function (data) {

            // When "Manager" has been selected, fill in missing data and push information to team.
            if (data.role === "Manager") {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: "What is your manager's office number?"
                    },
                    {
                        type: 'list',
                        name: 'another',
                        messge: 'Are there more employees to add to the team?',
                        choices: [
                            'yes',
                            'no'
                        ]
                    }
                ])
                    .then(function (dataManager) {
                        const manager = new Manager(data.name, data.id, data.email, dataManager.officeNumber);
                        team.push(manager);
                        if (dataManager.another === 'yes') {
                            employeeEntry();
                        } else {
                            fs.writeFileSync('MyTeam/team.html', render(team));
                            console.log('Successfully update your team page!')
                        }
                    })
            }

            // When "Engineer" has been selected, fill in missing data and push information to team.
            if (data.role === "Engineer") {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'github',
                        message: "Where can I view your Employee's work on GitHub?"
                    },
                    {
                        type: 'list',
                        name: 'another',
                        messge: 'Are there more employees to add to the team?',
                        choices: [
                            'yes',
                            'no'
                        ]
                    }
                ])
                    .then(function (dataEngineer) {
                        const engineer = new Engineer(data.name, data.id, data.email, dataEngineer.github);
                        team.push(engineer);
                        if (dataEngineer.another === 'yes') {
                            employeeEntry();
                        } else {
                            fs.writeFileSync('MyTeam/team.html', render(team));
                            console.log('Successfully update your team page!')
                        }
                    })
            }

            // When "Intern" has been selected, fill in missing data and push information to team.
            if (data.role === 'Intern') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'school',
                        message: 'Where does your intern attend school?'
                    },
                    {
                        type: 'list',
                        name: 'another',
                        messge: 'Are there more employees to add to the team?',
                        choices: [
                            'yes',
                            'no'
                        ]
                    }
                ])
                    .then(function (dataIntern) {
                        const intern = new Intern(data.name, data.id, data.email, dataIntern.school);
                        team.push(intern);
                        if (dataIntern.another === 'yes') {
                            employeeEntry();
                        } else {
                            fs.writeFileSync('MyTeam/team.html', render(team));
                            console.log('Successfully update your team page!')
                        }
                    })
            }
        })
}

employeeEntry();