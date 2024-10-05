require("./environnement");
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const generateRawGithubUrl =  require('./github/generate_raw_github_url');
const GenerateManifest = require("./expo/GenerateManifest");
const GenerateErrorPage = require("./server/GenerateErrorPage");

let ip_to_id = [];

router.all('/', (req, res) => {
    let welcome = fs.readFileSync(path.join(__dirname, '/server/Welcome.html'), 'utf8')
        .replace("{{ HOST }}", req.hostname)
    res.send(welcome);
})

router.get('/:id', async (req, res) => {
    if (req.query.platform !== "ios" && req.query.platform !== "android")
        return res
            .status(400)
            .send(GenerateErrorPage(
                "400 Bad Request",
                req.query.platform === undefined ?
                    "Missing platform query parameter" :
                    `${req.query.platform} is not a valid platform. Use 'ios' or 'android' instead.`
            ));
    let url = generateRawGithubUrl(req.params.id) + "app.json";
    try {
        let f = await fetch(url)
        let text = await f.text();
        if (text === "404: Not Found")
            return res
                .status(404)
                .send(GenerateErrorPage("404 Not Found", "No app.json found for id " + req.params.id));
        let json = await JSON.parse(text);
        ip_to_id = ip_to_id.filter(e => e.ip !== req.ip);
        ip_to_id.push({ip: req.ip, id: req.params.id});
        res
            .header("expo-protocol-version", "0")
            .header("expo-sfv-version", "0")
            .send(GenerateManifest(json, req, req.query.platform, req.params.id));
    } catch (e) {
        res
            .status(500)
            .send(GenerateErrorPage("500 Internal Server Error", "Error while parsing app.json"));
    }
})
router.get('/:id/AppEntry.bundle', async (req, res) => {
    if (req.query.platform !== "ios" && req.query.platform !== "android")
        return res
            .status(400)
            .send(GenerateErrorPage(
                "400 Bad Request",
                req.query.platform === undefined ?
                    "Missing platform query parameter" :
                    `${req.query.platform} is not a valid platform. Use 'ios' or 'android' instead.`
            ));
    let url = generateRawGithubUrl(req.params.id) + "expo/AppEntry_" + req.query.platform + ".js";
    let f = await fetch(url)
    let text = await f.text();
    if (text === "404: Not Found")
        return res
            .status(404)
            .send(GenerateErrorPage("404 Not Found", "No AppEntry found for id " + req.params.id));
    res.header("Content-Type", "application/javascript");
    res.send(text);
})

router.get('/*', async (req, res) => {
    let id = ip_to_id[ip_to_id.findIndex(e => e.ip === req.ip)];
    if (id) {
        res.redirect(generateRawGithubUrl(id.id) + "assets/" + req.query.hash);
    } else {
        res
            .status(428)
            .send(GenerateErrorPage("428 Precondition Required", "You need to request a valid expo bundle first."));
    }
})

router.all('*', (req, res) => {
    res
        .status(404)
        .send(GenerateErrorPage("404 Not Found", "The requested URL was not found on this server."));
});

module.exports = router;