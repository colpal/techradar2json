import { join } from "node:path";
import { expect, test } from "vitest";
import { loadTechnologyRadar } from "./lib.ts";

test("serializes basic Technology Radar fixture", async () => {
  const configPath = join(
    import.meta.dirname,
    "test/fixtures/basic/config.yaml",
  );
  expect(await loadTechnologyRadar(configPath)).toStrictEqual({
    configuration: {
      ratings: [
        {
          name: "Adopt",
          id: "adopt",
        },
        {
          name: "Trial",
          id: "trial",
        },
        {
          name: "Assess",
          id: "assess",
        },
        {
          name: "Hold",
          id: "hold",
        },
      ],
      categories: [
        {
          name: "Techniques",
          id: "techniques",
        },
        {
          name: "Platforms",
          id: "platforms",
        },
        {
          name: "Tools",
          id: "tools",
        },
        {
          name: "Languages and Frameworks",
          id: "languages-and-frameworks",
        },
      ],
      tags: ["database"],
    },
    technologies: [
      {
        name: "PostgreSQL",
        homepage: "https://www.postgresql.org/",
        license: "open-source",
        category: "platforms",
        tags: ["database"],
        links: [
          "https://example.com/first-link",
          "https://example.com/second-link",
        ],
        id: "postgresql",
        description:
          "This is a timeless description of PostgreSQL that doesn't allude to its current\nrating.\n",
        posts: [
          {
            rating: "adopt",
            date: new Date("1970-01-01"),
            content:
              "This is why you should adopt PostgreSQL as of this date.\n",
          },
        ],
      },
    ],
  });
});
