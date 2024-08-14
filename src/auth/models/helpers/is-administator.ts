import { Role, RoleResponse, UserResponse } from '~/user/models/services/generated/user.client';

export default (user: UserResponse, roles: RoleResponse[]) => {
  const adminRole = roles?.find((role) => role.name === Role.Administrator);
  return !!user?.roles.find((role) => role.id === adminRole?.id);
};
