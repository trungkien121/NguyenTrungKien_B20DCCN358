import { FileModel } from "../common/File";
import { Role } from "./role";

export class UserInfo {
  userUid?: string;
  userId?: string;
  createdBy?: string;
  attachFileGrpId?: string;

  createdDate?: Date;
  email?: string;
  cellPhone?: string;
  dob?: Date;
  fullName?: string;
  address?: string;
  gender?: boolean;
  imgPath?: string;
  twoFAEnable?: boolean;
  authProvider?: string;
  organization?: string;
  position?: string;
  roles?: Role[];

  thumbnail?: FileModel[] = [];
  filePath?: string;
  fileGrpId?: string;
}
