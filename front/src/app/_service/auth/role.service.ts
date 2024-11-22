// role.service.ts
import { Injectable } from "@angular/core";
import { Role } from "src/app/_model/auth/quyen";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  roleUser: Role[] | undefined;

  constructor() {}

  hasRole(roleId: string): boolean {
    return this.roleUser
      ? this.roleUser.some((role) => role.roleId === roleId)
      : false;
  }

  setRoles(roles: Role[]): void {
    this.roleUser = roles;
  }
}
