export type DeployedIssue = {
  id: number;
  title: string;
  summary: string;
  description: string;
  priority: string;
  resolutionDate: Date;
  assigne: {
    name: string;
    image: string;
  };
  repositories: string[];
};