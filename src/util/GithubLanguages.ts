import { GITHUB_TOKEN } from "../secrets/secrents";

export const getLang = async () => {
    let owner = 'ivy-fhe';
    let repo = 'tech-radar';
    
    return await fetchLanguages(owner, repo, GITHUB_TOKEN);
}

const fetchLanguages = async (owner: string, repo: string, token: string) => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
      method: 'GET',
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer "+ token,
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    let resp = await response.json();
    console.log(resp);
    return resp;
  }