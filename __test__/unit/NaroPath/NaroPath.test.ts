import { describe, expect, test } from "vitest";
import { COLLECTION_NAME, SUB_COLLECTION_NAME } from "../../../src/constants/constants-test";
import { NaroPath } from "../../../src";

describe("NaroPath, should validate paths are well structured", () => {
  test("Should throw error if path is empty", () => {
    expect(() => NaroPath.validate("")).toThrowError();
  })

  test("Should accept 'collectionName' as path ", () => {
    const { collectionName, collectionId, subCollectionName, subCollectionId } = NaroPath.validate(COLLECTION_NAME);
    expect(collectionName).toBe(COLLECTION_NAME);
    expect(collectionId).toBeUndefined();
    expect(subCollectionName).toBeUndefined();
    expect(subCollectionId).toBeUndefined();
  });

  test("Should accept 'collectionName/id' as path ", () => {
    const { collectionName, collectionId, subCollectionName, subCollectionId } = NaroPath.validate(`${COLLECTION_NAME}/1234`);
    expect(collectionName).toBe(COLLECTION_NAME);
    expect(collectionId).toBe("1234");
    expect(subCollectionName).toBeUndefined();
    expect(subCollectionId).toBeUndefined();
  });

  test("Should accept 'collectionName/id/subCollectionName' as path ", () => {
    const { collectionName, collectionId, subCollectionName, subCollectionId } = NaroPath.validate(`${COLLECTION_NAME}/1234/${SUB_COLLECTION_NAME}`);
    expect(collectionName).toBe(COLLECTION_NAME);
    expect(collectionId).toBe("1234");
    expect(subCollectionName).toBe(SUB_COLLECTION_NAME);
    expect(subCollectionId).toBeUndefined();
  });

  test("Should accept 'collectionName/id/subCollectionName/id' as path ", () => {
    const { collectionName, collectionId, subCollectionName, subCollectionId } = NaroPath.validate(`${COLLECTION_NAME}/1234/${SUB_COLLECTION_NAME}/5678`);
    expect(collectionName).toBe(COLLECTION_NAME);
    expect(collectionId).toBe("1234");
    expect(subCollectionName).toBe(SUB_COLLECTION_NAME);
    expect(subCollectionId).toBe("5678");
  });

  test("Should throw error if path is not well structured collection/id/sub-collection/id/extra", () => {
    expect(() => NaroPath.validate(`${COLLECTION_NAME}/1234/${SUB_COLLECTION_NAME}/5678/extra`)).toThrowError();
  });

  test("Should throw error if path is not well structured collection/id/sub-collection/id/extra/sub", () => {
    expect(() => NaroPath.validate(`${COLLECTION_NAME}/1234/${SUB_COLLECTION_NAME}/5678/extra/sub`)).toThrowError();
  });

  test("Should throw error if path ends with / as collection/id/sub-collection/id/", () => {
    expect(() => NaroPath.validate(`${COLLECTION_NAME}/1234/${SUB_COLLECTION_NAME}/5678/`)).toThrowError();
  });

  test("Should throw error if path ends with / as collection/id/sub-collection/", () => {
    expect(() => NaroPath.validate(`${COLLECTION_NAME}/1234/${SUB_COLLECTION_NAME}/5678/`)).toThrowError();
  });

  test("Should throw error if path ends with / as collection/id/", () => {
    expect(() => NaroPath.validate(`${COLLECTION_NAME}/1234/${SUB_COLLECTION_NAME}/5678/`)).toThrowError();
  });

  test("Should throw error if path ends with / as collection/", () => {
    expect(() => NaroPath.validate(`${COLLECTION_NAME}/1234/${SUB_COLLECTION_NAME}/5678/`)).toThrowError();
  });
});
