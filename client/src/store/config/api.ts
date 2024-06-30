interface ApiRoute {
  get: string;
  post?: string;
  put?: string;
  delete?: string;
}

interface ApiRoutes {
  [k: string]: ApiRoute;
}

const bugResourceBaseUrl = "/bugs";

export const ApiRoutes: ApiRoutes = {
  bugs: {
    get: bugResourceBaseUrl,
  },
};
