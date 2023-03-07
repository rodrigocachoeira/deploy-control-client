import { Issue } from "../../../types/issue";

import { Blocks, bold, link, listDash, Message } from 'slack-block-builder';

type Iniciative = {
  name: string,
  repositories?: string[]
  issues: Issue[]
}

export function generateMarkdown(boardName: string, issues: Issue[]) {
  //MOCK
  const initiative = 'Fatal Propagandas 1.5';
  const repositories = ['fm-seo-pages', 'fm-site-br'];

  const iniciatives = groupByIniciatives(issues);
  iniciatives.map((initiative: Iniciative) => {
    initiative.repositories = getRepositoriesOfIssues(initiative.issues);

    return iniciatives;
  });

  const builder = Message()
    .blocks(
      Blocks.Header({text: `:andromeda: Time ${boardName}`})
    );

  iniciatives.map((initiative: Iniciative) => {
    builder.blocks(
      Blocks.Section({text: `${bold('Iniciativa')}: \`${initiative.name}\` `}),
      Blocks.Section({text: createRepositories(initiative?.repositories ?? [])}),
      Blocks.Section({text: listDash(createIssue(initiative.issues))})
    );
  });
  const json = builder.buildToJSON();   

  console.log(json);

  return 'teste'
}

function groupByIniciatives(issues: Issue[]) {
  const initiatives: Iniciative[] = [];

  issues.map((issue: Issue) => {
      const epic = issue.epic?.title;

      if (epic === undefined) {
        return;
      }

      const alreadyExist = initiatives.filter((initiative: Iniciative) => {
        return initiative.name == epic;
      }).length > 0;

      if (alreadyExist) {
        initiatives.map((initiative: Iniciative) => {
          if (initiative.name == epic) {
            initiative.issues.push(issue);
          }
        });
      } else {
        initiatives.push({
          name: epic,
          issues: [issue]
        });
      }
  });

  return initiatives;
}

function getRepositoriesOfIssues(issues: Issue[]) {
  const repositories: string[] = [];

  issues.map((issue: Issue) => {
    issue.repositories.map((repository: string) => {
      if (! repositories.includes(repository)) {
        repositories.push(repository);
      }
    });
  });

  return repositories;
}

function createIssue(issues: Issue[]) {
  return issues.map((issue: Issue) => {
    return link(
      `https://atlastechnologies.atlassian.net/browse/${issue.title}`, issue.title
    ) + '\n ' + bold(`Descriçào: ${issue.summary}`);
  });
}

function createRepositories(repositories: string[]) {
  return repositories.map((repository: string) => {
    return `\`${repository}\``;
  }).join(' ')
}