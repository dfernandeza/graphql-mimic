const OBJECT_KINDS = {
  LIST: "LIST"
};

const SCALAR_TYPES = {
  Int: "Int",
  Float: "Float",
  String: "String",
  Boolean: "Boolean",
  ID: "ID"
};

const ROOT = "RootQueryType";

const FAKE = {
  Int: 1,
  Float: 1.0,
  String: "lorem ipsum",
  Boolean: false,
  ID: (initial = 0) => () => `${++initial}`
};

let _schema;
let _types;
let _root;

function getType(field) {
  const type = _types.find(
    type => type.name.toLowerCase() === field.toLowerCase()
  );
  if (type) return type;

  if (_root) {
    const type = _root.fields.find(
      type => type.name.toLowerCase() === field.toLowerCase()
    );
    if (type) return type;
  }

  return;
}

function getTypeFrom(parentType, field) {
  if (parentType.type) {
    return getTypeFrom(
      getType(parentType.type.ofType?.name ?? parentType.type.name),
      field
    );
  }

  return parentType.fields?.find(type => type.name === field);
}

function unfold(selectionSet, parentType, idFactory = FAKE.ID()) {
  return selectionSet.selections.reduce((acc, selection) => {
    if (selection.selectionSet) {
      const type =
        parentType !== undefined
          ? getTypeFrom(parentType, selection.name.value)
          : getType(selection.name.value);

      const kind = type.kind ?? type.type.kind;

      if (kind === OBJECT_KINDS.LIST) {
        const idFactory = FAKE.ID();
        return {
          ...acc,
          [selection.name.value]: [
            unfold(selection.selectionSet, type, idFactory),
            unfold(selection.selectionSet, type, idFactory)
          ]
        };
      }

      return {
        ...acc,
        [selection.name.value]: unfold(selection.selectionSet, type)
      };
    }

    const type = getTypeFrom(parentType, selection.name.value).type.name;
    return {
      ...acc,
      [selection.name.value]:
        type === SCALAR_TYPES.ID ? idFactory() : FAKE[type]
    };
  }, {});
}

const Mimic = {
  config({ schema }) {
    _schema = schema.__schema;
    _types = _schema.types;
    _root = _types.find(type => type.name === ROOT);
  },

  mock(gql) {
    const { selectionSet } = gql.definitions[0];
    return { data: unfold(selectionSet) };
  }
};

export default Mimic;
