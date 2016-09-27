// Import the required libraries
const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')
const express = require('express')

const resolver = require('./lib/resolver')

const dbType = new graphql.GraphQLObjectType({
  name: 'Database',
  fields: {
    db_name: { type: graphql.GraphQLString },
    _global_changes: { type: graphql.GraphQLString },
    update_seq: { type: graphql.GraphQLString },
    sizes: {
      type: new graphql.GraphQLObjectType({
        name: 'sizes',
        fields: {
          file: { type: graphql.GraphQLInt },
          external: { type: graphql.GraphQLInt },
          active: { type: graphql.GraphQLInt }
        }
      })
    },
    purge_seq: { type: graphql.GraphQLInt },
    doc_del_count: { type: graphql.GraphQLInt },
    doc_count: { type: graphql.GraphQLInt },
    disk_size: { type: graphql.GraphQLInt },
    disk_format_version: { type: graphql.GraphQLInt },
    data_size: { type: graphql.GraphQLInt },
    compact_running: { type: graphql.GraphQLBoolean },
    instance_start_time: { type: graphql.GraphQLString }
  }
})

const docType = new graphql.GraphQLObjectType({
  name: 'animaldb',
  fields: {
    _id: { type: graphql.GraphQLString },
    _rev: { type: graphql.GraphQLString },
    min_weight: { type: graphql.GraphQLFloat },
    max_weight: { type: graphql.GraphQLFloat },
    min_length: { type: graphql.GraphQLFloat },
    max_length: { type: graphql.GraphQLFloat },
    latin_name: { type: graphql.GraphQLString },
    wiki_page: { type: graphql.GraphQLString },
    class: { type: graphql.GraphQLString },
    diet: { type: graphql.GraphQLString }
  }
})


const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => {
      return {

        all_dbs: {
          args: { limit: { type: graphql.GraphQLInt } },
          type: new graphql.GraphQLList(dbType),
          resolve: (_, {limit}) => {
            return resolver.fetchAllDbs({limit: limit})
          }
        },

        animaldb: {
          type: new graphql.GraphQLList(docType),
          resolve: (a, b) => {
            return resolver.fetchAnimalDb()
          }
        }
      }
    }
  })
})

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000)

console.log('GraphQL server running on http://localhost:3000/graphql')
