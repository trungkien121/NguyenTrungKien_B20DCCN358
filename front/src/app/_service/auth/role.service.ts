// role.service.ts
import { Injectable } from "@angular/core";
import { Quyen } from "src/app/_model/auth/quyen";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  roleUser: Quyen[] | undefined;

  constructor() {}

  hasRole(roleId: string): boolean {
    return this.roleUser
      ? this.roleUser.some((role) => role.id === roleId)
      : false;
  }

  setRoles(roles: Quyen[]): void {
    this.roleUser = roles;
  }
}
