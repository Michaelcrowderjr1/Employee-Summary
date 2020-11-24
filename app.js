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

async function init() {
    const teamMembers = []; //Will contain the team members data
    const teamArray = [];   //Will contain all the team IDs.

    console.log("Building your team summary");
    // Set variables
    let teamHTML;
    let name;
    let id;
    let role;
    let email;

    // Prompts user to answer the basic questions of the employee
    await inquirer.prompt([ 
        {
            type: "input",
            message: `What is the employee's name?`,
            name: "name",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name.";
            }
        },
        {
            type: "input",
            message: `What is the employee's id?`,
            name: "id",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Answer must be an integer greater than zero.";
            }
        },
        {
            type: "input",
            message: `What is the employee's Email?`,
            name: "email",
            validate: answer => {
                const pass = answer.match(
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                );
                if (pass) {
                    return true;
                }
                return "Email address must be valid.";
            }
        },
        {
            type: "list",
            message: `what the employee's role?`,
            name: "role",
            choices: ["Engineer", "Intern", "Manager"]
        }
    ])
    .then((data) => {

        // Takes data from user and places value in global variables
        name = data.name;
        id = data.id;
        role = data.role;
        email = data.email;
    });

    // Switch Case depending on the role of the employee
    switch (role){
        case "Manager":

            // Input extra info manager
            await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the Manager's Office Number? (10 digit number - no dashes)?",
                    name: "officeNumber",
                    validate: answer => {
                        const pass = answer.match(
                            /^\d{10}$/
                        );
                        if (pass) {
                            return true;
                        }
                        return "Not a valid phone number.";
                    }
                }
            ])
            .then((data) => {

                // Create a new object with all avaiable user input data
                const manager = new Manager(name, id, email, data.officeNumber);

            });
            break;

        //Input extra info for intern
        case "Intern":
            await inquirer.prompt([
                {
                    type: "input",
                    message: "What school is the Intern attending?",
                    name: "school",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "This information is required.";
                    }
                }
            ])
            .then((data) => {
                const intern = new Intern(name, id, email, data.school);

            });
            break;

        //Input extra info for engineer
        case "Engineer":
            await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the Engineer's GitHub?",
                    name: "github",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "This information is required.";
                    }
                }
            ])
            .then((data) => {
                const engineer = new Engineer(name, id, email, data.github);

            });
            break;

    } // End of Switch Case
}



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

init();