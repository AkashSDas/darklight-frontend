import { handleAsync } from "@lib/handle-async";

describe("/lib/handle-async", () => {
  it("should return [data, null]", async () => {
    var [data, error] = await handleAsync(Promise.resolve("data"));
    expect(data).toBe("data");
    expect(error).toBeNull();
  });

  it("should return [null, error]", async () => {
    var [data, error] = await handleAsync(Promise.reject("error"));
    expect(data).toBeNull();
    expect(error).toBe("error");
  });
});
