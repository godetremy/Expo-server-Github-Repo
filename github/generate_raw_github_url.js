require("../environnement");

function generateRawGithubUrl(id) {
  return `${process.env.RAW_GITHUB_URL}/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/${process.env.GITHUB_BRANCH}/${id}/`;
}

module.exports = generateRawGithubUrl;