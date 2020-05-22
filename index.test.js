import gql from "graphql-tag";
import * as schema from "./schema.json";

import Mimic from ".";

const QUERY = gql`
  query {
    characters {
      results {
        id
        name
        episode {
          id
          name
        }
      }
    }
  }
`;

describe("GraphQL Mimic", () => {
  beforeAll(() => {
    Mimic.config({ schema });
  });

  test("should generate a mocked response when provided with a GraphQL AST", () => {
    expect(Mimic.mock(QUERY)).toEqual({
      data: {
        characters: {
          results: [
            {
              id: "1",
              name: "lorem ipsum",
              episode: [
                {
                  id: "1",
                  name: "lorem ipsum"
                },
                {
                  id: "2",
                  name: "lorem ipsum"
                }
              ]
            },
            {
              id: "2",
              name: "lorem ipsum",
              episode: [
                {
                  id: "1",
                  name: "lorem ipsum"
                },
                {
                  id: "2",
                  name: "lorem ipsum"
                }
              ]
            }
          ]
        }
      }
    });
  });
});
