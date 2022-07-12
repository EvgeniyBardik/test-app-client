import appReducer, { addError } from "./appSlice";

const error = {
  status: 400,
  data: {
    statusCode: 400,
    message: "Wrong password",
    error: "Bad Request",
  },
};

describe("appSlice", () => {
  test("should return default state when passed an emply action", () => {
    const result = appReducer(undefined, { type: "" });
    expect(result).toEqual({ error: undefined });
  });
  test("should add new error with 'addError' action", () => {
    const action = { type: addError.type, payload: { error } };

    const result = appReducer(undefined, action);
    expect(result.error).toBe(error);
  });
});
