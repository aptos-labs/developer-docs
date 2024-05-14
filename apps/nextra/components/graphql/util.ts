type GraphQLQuery = string;

function graphqlQueryToFetchMarkdown(
  graphqlQuery: GraphQLQuery,
  url: string,
): string {
  // JSON.stringify the options for the fetch call
  const fetchOptions: string = JSON.stringify(
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: graphqlQuery }),
    },
    null,
    4,
  ); // null and 4 for formatting

  // Return the markdown formatted string
  return `\`\`\`js filename="script.js"
fetch("${url}", ${fetchOptions})
    .then(response => response.json())
    .then(data => console.log(data));
\`\`\``;
}

function graphqlQueryToCurlMarkdown(
  graphqlQuery: GraphQLQuery,
  url: string,
): string {
  // Prepare the GraphQL query in a format suitable for curl command
  const queryFormattedForCurl: string = JSON.stringify({
    query: graphqlQuery,
  }).replace(/"/g, '\\"');

  // Construct the curl command
  const curlCommand: string = `curl -X POST \\
--header "Content-Type: application/json" \\
--header "Accept: application/json" \\
--data "{\\"query\\": \\"${queryFormattedForCurl}\\"}" \\
"${url}"`;

  // Return the curl command formatted as a Markdown code block
  return `\`\`\`bash filename="Terminal"\n${curlCommand}\n\`\`\``;
}

// Example usage
const exampleQuery: GraphQLQuery = `{
    user(id: "1") {
        name
        email
    }
}`;
