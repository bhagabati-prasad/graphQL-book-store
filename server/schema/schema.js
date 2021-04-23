const graphql = require('graphql');
const lodash = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

// dummy data
const books = [
  { id: '1', name: 'Book 1', genre: 'Fantasy', authorId: '1' },
  { id: '2', name: 'Book 2', genre: 'Fantasy', authorId: '2' },
  { id: '3', name: 'Book 3', genre: 'Sci-Fi', authorId: '3' },
  { id: '4', name: 'Book 4', genre: 'Sci-Fi', authorId: '1' },
  { id: '5', name: 'Book 5', genre: 'Fantasy', authorId: '2' },
  { id: '6', name: 'Book 6', genre: 'Sci-Fi', authorId: '2' },
];
const authors = [
  { id: '1', name: 'Author 1', age: 24 },
  { id: '2', name: 'Author 2', age: 32 },
  { id: '3', name: 'Author 3', age: 45 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return lodash.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return lodash.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return lodash.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return lodash.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
