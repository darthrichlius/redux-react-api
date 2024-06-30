export interface User {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface Bug {
  id: number;
  resolved: boolean;
  description: string;
  user: User | null;
}

export type BugRegister = Omit<Bug, "id" | "resolved" | "user"> & {
  resolved?: boolean;
  user?: User | null;
};

/**
 * QueryState approaches is very opinionated and specific to the store context
 * In our case our store management is deeply coupled with API requests
 * Therefore, this approach is relevant. However, for another context, it might not be.
 * The developer must and can customize the definition to better fit their needs.
 * Finally, for people familiar with tools such as ReactQuery, this approach is not novel.
 * Actually, we inspired from the existing convention from third-part library like ReactQuery
 */
export interface QueryState {
  loading: boolean;
  /**
   * Last time we called the server.
   * USE CASES:
   *  - caching
   *  - logging
   *  - debugging
   */
  lastFetch: number | null; // We prefer timestamp as Javascript Date is not serializable
}

/**
 * Having specific QueryState for each entity make the type management easier.
 * If we don't do that, we would risk having to manually infer the type when trying to access `.list`
 * Which is, by experience, an ati-pattern, annoying and cumbersome (hope there are enough adjective for you to feel the pain)
 */
export interface UserQueryState extends QueryState {
  data: Array<User>;
}

export interface ProjectQueryState extends QueryState {
  data: Array<Project>;
}

export interface BugQueryState extends QueryState {
  data: Array<Bug>;
}
