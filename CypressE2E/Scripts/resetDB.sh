
docker exec -it mongodb bash
mongo localhost:27017/litmus --eval "db.getCollectionNames().forEach((collection)=>{db.getCollection(collection).remove({})})"

exit
exit
exit
