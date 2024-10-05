require("../environnement");
const fs = require('fs');
const path = require('path');
const isServerReady = require("./IsServerReady");


const settings = {
    ready_color: "#00a372",
    ready_title: "Expo server is ready !",
    ready_subtitle: "The server is running and ready to serve your app.",
    ready_message: "Download ExpoGo from the App Store or Google Play, and enter the following URL.",
    ready_url: "exp://{{ HOST }}/@id",

    error_color: "#d9534f",
    error_title: "Expo server is not ready !",
    error_subtitle: "The server is running but it's look like there is an error.",
    error_message: "Please solve problems listed below and restart the server.",
}

function GenerateWelcomePage(host) {
    let errors = isServerReady();
    return fs.readFileSync(path.join(__dirname, '/Welcome.html'), 'utf8')
        .replaceAll("{{ COLOR }}", errors.length === 0 ? settings.ready_color : settings.error_color)
        .replace("{{ ERROR }}", errors.length === 0 ? "" : "none")
        .replace("{{ TITLE }}", errors.length === 0 ? settings.ready_title : settings.error_title)
        .replace("{{ SUBTITLE }}", errors.length === 0 ? settings.ready_subtitle : settings.error_subtitle)
        .replace("{{ MESSAGE }}", errors.length === 0 ? settings.ready_message : settings.error_message)
        .replace("{{ CODE }}", errors.length === 0 ? settings.ready_url : errors.join("<br>"))
        .replaceAll("{{ HOST }}", host)
}

module.exports = GenerateWelcomePage;