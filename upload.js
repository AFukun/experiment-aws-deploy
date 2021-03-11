/*
 * Todos
 * [*] check IP before upload
 * [ ] upload use exec
 * [ ] handle errors
 */

const {describeInstance} = require("./services/describeInstance");

const upload = async() => {
    try {
        const response= await describeInstance();
        console.log(response);
    } catch(err) {
        console.log(err);
    }
}
