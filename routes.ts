export const routes = {
  public: {
    home: "/",
    login: "/auth",
    signup: "/signup",
    explore: "/explore",
  },
  restricted: {
    admin: "/admin",
    create: "/create",
  },
};

export function isAllowedRoute(pathname: string): boolean {
  const allowedRoutes = Object.values(routes.public);
  return allowedRoutes.includes(pathname);
}
