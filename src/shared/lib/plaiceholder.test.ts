import { expect, test } from "vitest";

import { getRemotePlaiceholderImage } from "./plaiceholder";

test("base64와 src property를 반환해야 한다.", async () => {
  const src = "https://dummyimage.com/100x100/000/fff";
  const result = await getRemotePlaiceholderImage(src);

  expect(result).toHaveProperty("base64");
  expect(result).toHaveProperty("img");
  expect(result.img).toHaveProperty("src", src);
  expect(result.img).toHaveProperty("width");
  expect(result.img).toHaveProperty("height");
});
