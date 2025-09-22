interface GitHubFileParams {
  path: string;
  contentBase64: string;
  message: string;
}

interface GitHubResponse {
  content: {
    sha: string;
  };
}

export async function putFile({ path, contentBase64, message }: GitHubFileParams): Promise<{ sha: string }> {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    throw new Error('Missing required GitHub environment variables. Please set GITHUB_OWNER, GITHUB_REPO, and GITHUB_TOKEN in your .env.local file. See env.local.example for details.');
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${errorText}`);
  }

  const data: GitHubResponse = await response.json();
  return { sha: data.content.sha };
}