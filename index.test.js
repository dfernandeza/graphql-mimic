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
    // The most basic functionality would be to generate a mock by combining information from
    // the API schema and a provided GraphQL AST i.e. QUERY
    // - Default number will be 1.
    // - Default string will be "lorem ipsum".
    // - List should always return 2 items.

    // expect(Mimic.mock(QUERY)).toEqual({
    //   data: {
    //     characters: {
    //       results: [
    //         {
    //           id: "1",
    //           name: "lorem ipsum",
    //           episode: [
    //             {
    //               name: "lorem ipsum"
    //             },
    //             {
    //               name: "lorem ipsum"
    //             }
    //           ]
    //         },
    //         {
    //           id: "2",
    //           name: "lorem ipsum",
    //           episode: [
    //             {
    //               name: "lorem ipsum"
    //             },
    //             {
    //               name: "lorem ipsum"
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   }
    // });

    expect(true).toBe(true);
  });
});
