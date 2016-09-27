# GraphQL CouchDB demo proxy

Prototype for GraphQL & CouchDB

## Examples

```
Boot server:

npm run dev
```

```
A Database list with metadata:

http://localhost:3000/graphql?query={all_dbs{db_name,disk_size,doc_count,doc_del_count}}

Remove a few properties:

http://localhost:3000/graphql?query={all_dbs{db_name,doc_del_count}}


Database list, just names amd disk_size, limit to 1:

http://localhost:3000/graphql?query={all_dbs(limit:1){db_name,disk_size}}


With animaldb, selecting just ids:

http://localhost:3000/graphql?query={all_dbs{db_name,disk_size,doc_count,doc_del_count},animaldb{_id}}

```
