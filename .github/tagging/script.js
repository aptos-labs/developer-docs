const fs = require("fs")

module.exports = async ({ inputSectionsStr, github, context }) => {
  console.log("Running tagging script")
  console.log(`Input: ${inputSectionsStr}`)

  const sectionTagsString = fs.readFileSync("./.github/tagging/tagsByIssueSection.json")
  const sectionTags = JSON.parse(sectionTagsString)
  const inputSections = inputSectionsStr.split(",").map(s => s.trim())
  const body = inputSections
    .map(section => sectionTags[section])
    .filter(Boolean)
    .join(" ")

  console.log(`Creating comment via github REST API: ${body}`)
  const result = await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body
  })
  console.log(`Result: ${result.status}`)
}
