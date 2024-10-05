require("../environnement");
const GenerateUUID = require("./GenerateUUID");

function GenerateManifest(info, req, platform, id) {
    return {
        id: GenerateUUID(),
        createdAt: new Date().toISOString(),
        runtimeVersion: `exposdk:${process.env.EXPO_SDK_VERSION}`,
        launchAsset: {
            key: "bundle",
            contentType: "application/javascript",
            url: `${req.protocol + "://" + req.hostname}/${id}/AppEntry.bundle?platform=${platform}`,
        },
        assets: [],
        metadata: {},
        extra: {
            expoClient: {
                ...info,
                splash: {},
                sdkVersion: process.env.EXPO_SDK_VERSION,
            },
            expoGo: {
                debuggerHost: `${req.hostname}`,
                developer: {
                    tool: "expo-cli",
                }
            },
            scopeKey: `@anonymous/${info.expo.slug}`,
        },
    }
}

module.exports = GenerateManifest;