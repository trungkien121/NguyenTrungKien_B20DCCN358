export class FileGrpModel {
  fileGrpId: number | undefined;
  filePath: string;
  listFile: FileModel[];
  constructor(fileGrpId: any, filePath: string, listFile: FileModel[]) {
    this.fileGrpId = fileGrpId;
    this.filePath = filePath;
    this.listFile = listFile;
  }
}

export class FileModel {
  fileGrpId: number;
  seq: number;
  saveName: string;
  orgnName: string;
  extension: string;
  size: number;
  constructor(
    fileGrpId: number,
    seq: number,
    saveName: string,
    orgnName: string,
    extension: string,
    size: number
  ) {
    this.fileGrpId = fileGrpId;
    this.seq = seq;
    this.saveName = saveName;
    this.orgnName = orgnName;
    this.extension = extension;
    this.size = size;
  }
}

export class FileModelRequest {
  fileGrpId: string;
  filePath: string;
  listFile: File[];
  isOnlyOne: Boolean;
  constructor(
    fileGrpId: string,
    filePath: string,
    listFile: File[],
    isOnlyOne: Boolean
  ) {
    this.fileGrpId = fileGrpId;
    this.filePath = filePath;
    this.listFile = listFile;
    this.isOnlyOne = isOnlyOne;
  }
}
