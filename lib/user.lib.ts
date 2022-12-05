import { User } from "../store/user/slice";

export function normalizeJsonToUser(user: any): User {
  return {
    username: user?.username ?? undefined,
    email: user?.email ?? undefined,
    active: user?.active ?? false,
    verified: user?.verified ?? false,
    roles: user?.roles ?? ["student"],
    oauthProviders: user?.oauthProviders ?? [],
    id: user._id ?? null,
    createdAt: new Date(user.createdAt).toISOString(),
  };
}
