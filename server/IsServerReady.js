function IsServerReady() {
    let errors = [];
    if (!process.env.RAW_GITHUB_URL || process.env.RAW_GITHUB_URL === "")
        errors.push("[ ! ] RAW_GITHUB_URL is not set. Please set it in .env file.");
    if (!process.env.GITHUB_BRANCH || process.env.GITHUB_BRANCH === "")
        errors.push("[ ! ] GITHUB_BRANCH is not set. Please set it in .env file.");
    if (!process.env.GITHUB_USERNAME || process.env.GITHUB_USERNAME === "")
        errors.push("[ ! ] GITHUB_USERNAME is not set. Please set it in .env file.");
    if (!process.env.GITHUB_REPOSITORY || process.env.GITHUB_REPOSITORY === "")
        errors.push("[ ! ] GITHUB_REPOSITORY is not set. Please set it in .env file.");
    if (!process.env.EXPO_SDK_VERSION || process.env.EXPO_SDK_VERSION === "")
        errors.push("[ ! ] EXPO_SDK_VERSION is not set. Please set it in .env file.");
    return errors;
}

module.exports = IsServerReady;