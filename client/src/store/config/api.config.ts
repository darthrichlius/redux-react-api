interface ApiRoute {
  get: string;
  post?: string;
  put?: string;
  delete?: string;
}
interface ApiCaching {
  cacheTTL: number; // in minutes
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

export const ApiCaching: ApiCaching = {
  cacheTTL: 5,
};
