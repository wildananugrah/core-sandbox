# db account
docker run -d --name db_sandbox-core -p 5000:27017 mongo

# # db simulator
# docker run -d --name db_simulator -p 7000:27017 mongo

# # db monolith
# docker run -d --name db_monolith -p 3000:27017 mongo

# # db cqrs
# docker network create mongo-cqrs-net
# docker run -d --name db3-cqrs -p 4020:27017 --net mongo-cqrs-net mongo --replSet mongoCQRSSet2
# docker run -d --name db4-cqrs -p 4030:27017 --net mongo-cqrs-net mongo --replSet mongoCQRSSet2
# docker run -d --name db5-cqrs -p 4040:27017 --net mongo-cqrs-net mongo --replSet mongoCQRSSet3
# docker run -d --name db6-cqrs -p 4050:27017 --net mongo-cqrs-net mongo --replSet mongoCQRSSet3
# docker run -d --name db7-cqrs -p 4060:27017 --net mongo-cqrs-net mongo --replSet mongoCQRSSet4
# docker run -d --name db8-cqrs -p 4070:27017 --net mongo-cqrs-net mongo --replSet mongoCQRSSet4

# # db saga svc
# docker run -d --name db1-saga-svc -p 5000:27017 mongo; docker run -d --name db2-saga-svc -p 5010:27017 mongo; docker run -d --name db3-saga-svc -p 5020:27017 mongo; docker run -d --name db4-saga-svc -p 5030:27017 mongo; docker run -d --name db5-saga-svc -p 5040:27017 mongo; docker run -d --name db6-saga-svc -p 5050:27017 mongo;

# # db dist
# docker network create mongo-dist-net
# docker run -d --name db1-dist -p 6000:27017 --net mongo-dist-net mongo mongod --replSet mongoDISTSet; docker run -d --name db2-dist -p 6010:27017 --net mongo-dist-net mongo mongod --replSet mongoDISTSet; docker run -d --name db3-dist -p 6020:27017 --net mongo-dist-net mongo mongod --replSet mongoDISTSet; docker run -d --name db4-dist -p 6030:27017 --net mongo-dist-net mongo mongod --replSet mongoDISTSet; docker run -d --name db5-dist -p 6040:27017 --net mongo-dist-net mongo mongod --replSet mongoDISTSet; docker run -d --name db6-dist -p 6050:27017 --net mongo-dist-net mongo mongod --replSet mongoDISTSet; docker run -d --name db7-dist -p 6060:27017 --net mongo-dist-net mongo mongod --replSet mongoDISTSet;

# # remove all db
# # docker stop $(docker ps -a -q)
# # docker rm $(docker ps -a -q)
# # docker stop $(docker ps -a -q); docker rm $(docker ps -a -q); docker volume prune; docker run -d --name db_monolith -p 3000:27017 mongo
# # docker rmi -f $(docker images -aq)
# # docker rmi $(sudo docker images -f "dangling=true" -q)
# # while true; do docker stats --no-stream | tee --append stats.txt; sleep 1; done
# # while true; do docker stats --no-stream | tee --append stats-monolith-app.txt; done
# # while true; do docker stats --no-stream | tee --append stats-monolith-db.txt; done
# # while true; do docker stats --no-stream | tee --append stats-msa-shared-db-app.txt; done
# # while true; do docker stats --no-stream | tee --append stats-msa-shared-db-db.txt; done
# # while true; do docker stats --no-stream | tee --append stats-msa-dist-db-app.txt; done
# # while true; do docker stats --no-stream | tee --append stats-msa-dist-db-db.txt; done
# # while true; do docker stats --no-stream | tee --append stats-msa-db-per-svc-app.txt; done
# # while true; do docker stats --no-stream | tee --append stats-msa-db-per-svc-db.txt; done
# # while true; do docker stats --no-stream | tee --append stats-msa-saga-app.txt; done
# # while true; do docker stats --no-stream | tee --append stats-msa-saga-db.txt; done

# # docker run --name postgres-db -p 5000:5432 -e POSTGRES_PASSWORD=simplebankdb_password -e POSTGRES_USER=simplebankdb_user -e POSTGRES_DB=simplebankdb -d postgres
# # docker run --name pg-admin -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=user@mail.com' -e 'PGADMIN_DEFAULT_PASSWORD=password' -d dpage/pgadmin4

# # db per service
# # docker run --name postgres-db-1 -p 5000:5432 -e POSTGRES_PASSWORD=simplebankdb_password -e POSTGRES_USER=simplebankdb_user -e POSTGRES_DB=simplebankdb -d postgres; docker run --name postgres-db-2 -p 5010:5432 -e POSTGRES_PASSWORD=simplebankdb_password -e POSTGRES_USER=simplebankdb_user -e POSTGRES_DB=simplebankdb -d postgres; docker run --name postgres-db-3 -p 5020:5432 -e POSTGRES_PASSWORD=simplebankdb_password -e POSTGRES_USER=simplebankdb_user -e POSTGRES_DB=simplebankdb -d postgres; docker run --name postgres-db-4 -p 5030:5432 -e POSTGRES_PASSWORD=simplebankdb_password -e POSTGRES_USER=simplebankdb_user -e POSTGRES_DB=simplebankdb -d postgres; docker run --name postgres-db-5 -p 5040:5432 -e POSTGRES_PASSWORD=simplebankdb_password -e POSTGRES_USER=simplebankdb_user -e POSTGRES_DB=simplebankdb -d postgres; docker run --name postgres-db-6 -p 5050:5432 -e POSTGRES_PASSWORD=simplebankdb_password -e POSTGRES_USER=simplebankdb_user -e POSTGRES_DB=simplebankdb -d postgres

# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db1-dist
# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db2-dist
# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db3-dist
# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db4-dist
# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db5-dist
# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db6-dist
# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db7-dist
# # docker exec -it db1-dist mongo

# config = {
#    "_id":"mongoDISTSet",
#    "members":[
#       {
#          "_id":0,
#          "host":"172.19.0.2:27017"
#       },
#       {
#          "_id":1,
#          "host":"172.19.0.3:27017"
#       },
#       {
#          "_id":2,
#          "host":"172.19.0.4:27017"
#       },
#       {
#          "_id":3,
#          "host":"172.19.0.5:27017"
#       },
#       {
#          "_id":4,
#          "host":"172.19.0.6:27017"
#       },
#       {
#          "_id":5,
#          "host":"172.19.0.7:27017"
#       },
#       {
#          "_id":6,
#          "host":"172.19.0.8:27017"
#       }
#    ]
# }

# rs.initiate(config)