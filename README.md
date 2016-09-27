# GraphQL CouchDB demo proxy

Prototype for GraphQL & CouchDB

## Examples

```
Boot server:

npm run dev
```

```
Database list with metadata:

http://localhost:3000/graphql?query={all_dbs{db_name,disk_size,doc_count,doc_del_count}}


Database list, just names amd disk_size, limit to 1:

http://localhost:3000/graphql?query={all_dbs(limit:1){db_name}}


With animaldb:

http://localhost:3000/graphql?query={all_dbs{db_name,disk_size,doc_count,doc_del_count},animaldb{_id}}

```
