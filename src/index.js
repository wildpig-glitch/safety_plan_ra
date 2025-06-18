import api, { route } from '@forge/api';
/**
 * Clones an ASIL story (and its sub-tasks) from FuSaDemo into the target project using only public Jira REST APIs.
 * @param {object} params
 * @param {string} params.targetProject - The key of the target Jira project
 * @param {string} params.asilLevel - The ASIL level (A, B, C, or D)
 * @param {string} params.systemName - The name of the system
 * @param {string} params.carline - The name of the carline
 */

// global parameters
const webTriggerUrl = "https://32dbd006-4951-4027-84a9-0c75cb8c661c.hello.atlassian-dev.net/x1/vrLmIUVdd95DoGLK1WJoiuRZqBY";


export async function cloneAsilStory(params) {
  console.log(`Starting ASIL story cloning with params: ${JSON.stringify(params)}`);
  const { targetProject, asilLevel, systemName, carline } = params;
  console.log(`Cloning ASIL story for project ${targetProject} with ASIL level ${asilLevel} for system ${systemName} and carline ${carline}`);

  const validLevels = ['A', 'B', 'C', 'D', 'QM'];
  const isValid = validLevels.includes(asilLevel);

  if (!isValid) {
    throw new Error('ASIL level must be one of A, B, C, D, or QM.');
  }
  const action = 'cloneAsilStory';
  console.log(`Action: ${action}`);
  console.log(`Target project: ${targetProject}, ASIL level: ${asilLevel}, System name: ${systemName}`);

  const payload = {
    action,
    targetProject,
    asilLevel,
    systemName,
    carline
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

export async function takeoverAsilStory(params) {
  console.log(`Starting ASIL story takeover with params: ${JSON.stringify(params)}`);
  const { carline, epicIssueKey } = params;
  const action = 'takeoverAsilStory';
  console.log(`Action: ${action}`);
  console.log(`Taking over ASIL story for carline ${carline} with epic issue key ${epicIssueKey}`);

  const payload = {
    action,
    carline,
    epicIssueKey
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