interface ApiRoute {
  get: string;
  list: string;
  [k: string]: string;
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
    get: bugResourceBaseUrl.concat("/:id"),
    list: bugResourceBaseUrl,
    add: bugResourceBaseUrl,
    resolve: bugResourceBaseUrl.concat("/:id"),
    delete: bugResourceBaseUrl.concat("/:id"),
  },
};

export const ApiCaching: ApiCaching = {
  cacheTTL: 5,
};
