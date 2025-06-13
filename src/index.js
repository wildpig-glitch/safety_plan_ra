import api, { route } from '@forge/api';
/**
 * Clones an ASIL story (and its sub-tasks) from FuSaDemo into the target project using only public Jira REST APIs.
 * @param {object} params
 * @param {string} params.targetProject - The key of the target Jira project
 * @param {string} params.asilLevel - The ASIL level (A, B, C, or D)
 * @param {string} params.systemName - The name of the system
 */

// global parameters
const webTriggerUrl = "https://32dbd006-4951-4027-84a9-0c75cb8c661c.hello.atlassian-dev.net/x1/vrLmIUVdd95DoGLK1WJoiuRZqBY";


export async function cloneAsilStory(params) {
  console.log(`Starting ASIL story cloning with params: ${JSON.stringify(params)}`);
  const { targetProject, asilLevel, systemName } = params;
  console.log(`Cloning ASIL story for project ${targetProject} with ASIL level ${asilLevel} for system ${systemName}`);
  
  const asilLevelList = [...new Set(  // Remove duplicates
    asilLevel
      .replace(/[\s,]/g, '')  // Remove all spaces and commas
      .split('')              // Split into individual characters
      .filter(item => item.length > 0)  // Remove empty strings
  )].sort();  // Sort alphabetically
  
  if (asilLevelList.length === 0 || asilLevelList.some(item => !["A", "B", "C", "D"].includes(item))) {
    throw new Error('ASIL level must be a combination of A, B, C, or D.');
  }

  console.log(`Target project: ${targetProject}, ASIL level: ${asilLevelList.join(", ")}, System name: ${systemName}`);

  const payload = {
    targetProject,
    asilLevel: asilLevelList.join(", "),
    systemName
  };
  const response = await fetch(webTriggerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Web trigger call failed: ${response.status} ${await response.text()}`);
  }
  const result = await response.json();
  console.log(`Web trigger response: ${JSON.stringify(result)}`);
  return result;
}