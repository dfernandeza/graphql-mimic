# graphql-mimic

Client side mocking library for GraphQL.

Using the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) for example purposes.

```bash
npx apollo client:download-schema schema.json --endpoint=https://rickandmortyapi.com/graphql
```

## General idea

Combine information from the GraphQL schema and a provided GraphQL AST (a [graphql-tag](https://github.com/apollographql/graphql-tag) query) to automatically generate response mocks. i.e.

```javascript
import * as schema from "./schema.json";

const QUERY = gql`
  query {
    characters {
      results {
        id
        name
      }
    }
  }
`;

Mimic.config({ schema });
const mock = Mimic.mock(QUERY);

// {
//   data: {
//     characters: {
//       results: [
//         {
//           id: "1",
//           name: "lorem ipsum"
//         },
//         {
//           id: "2",
//           name: "lorem ipsum"
//         }
//       ];
//     }
//   }
// }
```

:warning: This is still a work in progress, any collaboration would be greatly appreciated.
