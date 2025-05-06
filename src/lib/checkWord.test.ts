import assert from "assert";
import { describe, it } from "@jest/globals";
import { allLettersGuessed } from "./checkWord";

describe("Checks the word for completion", () => {
  it("Returns true if the word is completed", () => {
    const outcome = allLettersGuessed("abcde", ["a", "b", "c", "d", "e"]);
    assert.strictEqual(outcome, true);
  });

  it("Returns false if the word is not completed", () => {
    const outcome = allLettersGuessed("abcde", ["a"]);
    assert.strictEqual(outcome, false);
  });
});
