# Generate mono repo
```shell
nest generate library common
```

# Generate Common Module
```shell
# Generate module
# database is the name of the module
# -p is the prefix of the module

# Generate database module
nest generate module database -p common

# Generate config module
nest generate module config -p common
```
# Generate Microservice
```shell
# Generate reservations service
nest g app reservations
# Generate auth service
nest g app auth
nest g module users
nest g service users
nest g controller users
```

# Generate Service
```shell
nest g resource reservations
```
