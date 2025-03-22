import fs from "fs-extra";
import msgpack from "msgpack-lite";

export class NaroFiler {
  static ensureDirectory(path: string): void {
    fs.ensureDirSync(path);
  }

  static readBinaryFile(path: string): Buffer {
    if (!fs.existsSync(path)) {
      throw new Error(`File at path ${path} does not exist.`);
    }
    return fs.readFileSync(path);
  }

  static writeBinaryFile(path: string, data: any): void {
    fs.writeFileSync(path, msgpack.encode(data));
  }

  static listDirectories(path: string): string[] {
    if (!fs.existsSync(path)) {
      return [];
    }
    return fs.readdirSync(path).filter((subPath) => {
      const fullPath = `${path}/${subPath}`;
      return fs.lstatSync(fullPath).isDirectory();
    });
  }
}
