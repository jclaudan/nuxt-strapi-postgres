
// form
// - title - string -
// question
// answer

// ./api/[api-name]/content-types/restaurant/schema.json

const KIND = 'kind';
const TABLENAME = 'tableName';
{
  "kind": "collectionType",
  "tableName": "Restaurants_v1",

  "info": {
    "displayName": "Restaurant",
    "singularName": "restaurant",
    "pluralName": "restaurants",
    "description": ""
  },

  "attributes": {
    "title": {
      "type": "string",
      "minLength": 3,
      "maxLength": 99,
      "unique": true
    },
    "description": {
      "default": "My description",
      "type": "text",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    },
  },
}

// -----------------------------------------------------------------------------
// One-to-One
// relationships are useful when one entry can be linked to only one other entry.

// They can be unidirectional or bidirectional. In unidirectional relationships, only one of the models can be queried with its linked item.

// Unidirectional use case example:
// A blog article belongs to a category.
// Querying an article can retrieve its category,
// but querying a category won't retrieve the owned article.
// ./src/api/[api-name]/content-types/article/schema.json

// fucntion oneToOne
const onetoOneUnidirectional = (attributeName) => {
  const tmp = {
    [attributeName]: {
      type: 'relation',
      relation: 'oneToOne',
      target: attributeName,
    }
  }
  console.log('onetoOne', tmp);
  return tmp;
}

const model = {
  attributes: {
    category: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'category',
    },
  },
};

// Bidirectional use case example:
// A blog article belongs to a category.
// Querying an article can retrieve its category,
// and querying a category also retrieves its owned article.

// fucntion onetoOneBidirectional
const onetoOneBidirectional = (attributeName, inversedBy) => {
  const tmp01 = {
    [attributeName]: {
      type: 'relation',
      relation: 'oneToOne',
      target: attributeName,
      inversedBy,
    }
  }

  const tmp02 = {
    [inversedBy]: {
      type: 'relation',
      relation: 'oneToOne',
      target: attributeName,
      mappedBy: attributeName,
    }
  }

  const result = { tmp01, tmp02 }
  console.log('onetoOneBidirectional', result);
  return result;
}

// ./src/api/[api-name]/content-types/article/schema.json

const model = {
  attributes: {
    category: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'category',
      inversedBy: 'article',
    },
  },
};


// ./src/api/[api-name]/content-types/category/schema.json

const model = {
  attributes: {
    article: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'article',
      mappedBy: 'category',
    },
  },
};
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// One-to-Many
// relationships are useful when:

// an entry from a content-type A is linked to many entries of another content-type B,
// while an entry from content-type B is linked to only one entry of content-type A.
// One-to-many relationships are always bidirectional, and are usually defined with the corresponding Many-to-One relationship:
// A person can own many plants, but a plant is owned by only one person.


// fucntion onetoMany
const onetoMany = (attributeName, inversedBy) => {
  const tmp01 = {
    [attributeName]: {
      type: 'relation',
      relation: 'oneToOne',
      target: attributeName,
      inversedBy,
    }
  }
  const tmp02 = {
    [inversedBy]: {
      type: 'relation',
      relation: 'oneToOne',
      target: attributeName,
      mappedBy: attributeName,
    }
  }

  const result = { tmp01, tmp02 }
  console.log('onetoOneBidirectional', result);
  return result;
}


// ./src/api/[api-name]/content-types/plant/schema.json

const model = {
  attributes: {
    owner: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::person.person',
      inversedBy: 'plants',
    },
  },
};

// ./src/api/person/models/schema.json

const model = {
  attributes: {
    plants: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::plant.plant',
      mappedBy: 'owner',
    },
  },
};
// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------
// Many-to-One
// relationships are useful to link many entries to one entry.

// They can be unidirectional or bidirectional. In unidirectional relationships, only one of the models can be queried with its linked item.

// Unidirectional use case example:
// A book can be written by many authors.

// ./src/api/[api-name]/content-types/book/schema.json

const model = {
  attributes: {
    author: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'author',
    },
  },
};

// Bidirectional use case example:
// An article belongs to only one category but a category has many articles.

// ./src/api/[api-name]/content-types/article/schema.json

const model = {
  attributes: {
    author: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'category',
      inversedBy: 'article',
    },
  },
};

// ./src/api/[api-name]/content-types/category/schema.json

const model = {
  attributes: {
    books: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'article',
      mappedBy: 'category',
    },
  },
};
// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------
// Many-to-Many
// relationships are useful when:

// an entry from content-type A is linked to many entries of content-type B,
// and an entry from content-type B is also linked to many entries from content-type A.
// Many-to-many relationships can be unidirectional or bidirectional. In unidirectional relationships, only one of the models can be queried with its linked item.

// Unidirectional use case example:
const model = {
  attributes: {
    categories: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'category',
    },
  },
};

// Bidirectional use case example:
// An article can have many tags and a tag can be assigned to many articles.

// ./src/api/[api-name]/content-types/article/schema.json

const model = {
  attributes: {
    tags: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'tag',
      inversedBy: 'articles',
    },
  },
};

// ./src/api/[api-name]/content-types/tag/schema.json

const model = {
  attributes: {
    articles: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'article',
      mappedBy: 'tag',
    },
  },
};
// -----------------------------------------------------------------------------
