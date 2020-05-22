# graphql-mimic

Client side mocking library for GraphQL.

Using the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) for example purposes.

```bash
npx apollo client:download-schema schema.json --endpoint=https://rickandmortyapi.com/graphql
```

## General idea

Combine information from the GraphQL schema [introspection query result](https://github.com/graphql/graphql-js/blob/0276d685b51262686c841763ba0b6e71103f64f3/src/utilities/introspectionQuery.js) and a provided GraphQL AST (a [graphql-tag](https://github.com/apollographql/graphql-tag) query) to automatically generate response mocks. i.e.

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

GraphQL-Mimic will generate a mock where each field is assigned a default value. Default values are assigned according to the field scalar type as follows:

  - Int: 1
  - Float: 1.0
  - String: "lorem ipsum"
  - Boolean: false
  - ID: "1" or "2"

Notice that the ID scalar type could be assigned with a value of "1" or "2" because by default every list in the mocked response will contain 2 items. 

## Additional notes

graphql-mimic is intended to be client agnostic, but we plan to provide "adapters" to make it easy to work with common GraphQL clients like [Apollo Client](https://www.apollographql.com/docs/react/). 

:warning: This is still a work in progress, any collaboration would be greatly appreciated.
