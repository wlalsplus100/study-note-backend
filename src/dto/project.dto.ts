export class CreateProjectDto {
  readonly title: string;
  readonly description?: string;
  readonly github_url?: string;
  readonly demo_url?: string;
  readonly thumbnail?: string;
  readonly owner_id: string;
  readonly techStack: string[];
}

export class UpdateProjectDto {
  readonly title?: string;
  readonly description?: string;
  readonly github_url?: string;
  readonly demo_url?: string;
  readonly thumbnail?: string;
  readonly techStack: string[];
}
