import { User } from "@store/user/slice";

/**
 * @params data: response data from back-end
 */
export function normalizeUser(data: { [key: string]: any }): User {
  return {
    id: data.id,
    email: data.email,
    username: data.username,
    fullName: data.fullName,
    roles: data.roles,
    isActive: data.isActive,
    verified: data.isEmailVerified,
    profileImage: data.profileImage,
    oauthProviders: data.oauthProviders,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}
