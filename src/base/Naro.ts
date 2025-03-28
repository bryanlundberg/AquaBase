import _ from 'lodash';
import { Core } from "../core/Core";
import { NaroPath } from "../manage/paths/NaroPath";
import { NaroId } from "../utils/IdGenerator";

export class Naro {
  private readonly dbName: string;
  private readonly core: Core;

  constructor(dbName: string) {
    if (dbName.includes('/')) throw new Error("dbName cannot contain '/'");
    this.dbName = dbName;
    const rootPath = `./data/${this.dbName}`;
    this.core = new Core(rootPath);
    this.core.initialize().catch(error => {
      throw new Error(`Failed to initialize core: ${error.message}`);
    });
  }

  add(collectionName: string, data: any) {
    const collection = this.core.getCollection(collectionName);
    const newItem = { ...data, id: NaroId.generate() };
    collection.push(newItem);
    this.core.updateCollection(collectionName, collection);
    return structuredClone(newItem);
  }

  getAll(collectionName: string) {
    return this.core.getCollection(collectionName);
  }

  get(path: string) {
    const { collectionName, collectionId } = NaroPath.validate(path);
    const collection = this.core.getCollection(collectionName);
    return _.find(collection, (item: any) => item.id === collectionId) || undefined;
  }

  update(path: string, data: any) {
    const { collectionName, collectionId } = NaroPath.validate(path);
    const collection = this.core.getCollection(collectionName);
    const itemIndex = _.findIndex(collection, (item: any) => item.id === collectionId);
    if (itemIndex === -1) throw new Error("Item not found");
    collection[itemIndex] = { ...collection[itemIndex], ...data };
    this.core.updateCollection(collectionName, collection);
  }

  delete(path: string) {
    const { collectionName, collectionId } = NaroPath.validate(path);
    const collection = this.core.getCollection(collectionName);
    const itemIndex = _.findIndex(collection, (item: any) => item.id === collectionId);
    if (itemIndex === -1) throw new Error("Item not found");
    collection.splice(itemIndex, 1);
    this.core.updateCollection(collectionName, collection);
  }
}
