---
id: getting-started
title: Getting started
---

> PowerCMS is a Domain Driven, CQRS based CMS project in Microservices architecture, written for developers. Good architecture, code quality and fancy technologies will be always on the first place!

All PowerCMS packages are written to be framework independent - pure domain modules.
They contain the business logic, but don't know too much about the infrastructure or communication implementation between each other.

Main package is the "glue", connecting the modules together, providing proper communication protocol, implementing discovery and API gateway.
Currently it's built on top of the [moleculer](https://moleculer.services), which takes care about all necessary microservice specific infrastructure.

PowerCMS uses [mongodb](https://www.mongodb.com) as a data storage, [nats](https://nats.io) as a messaging server.
No more third party services are required so far.

## How to use?

Clone the repository first

```bash
git clone git@github.com:power-cms/power-cms.git
```

Then copy the environment variables file and adjust it to your preferences. Read more about environment variables [here](#environment-variables).

```bash
cd power-cms
cp .env.dist .env
```

Run the server with docker

```bash
docker-compose up
```

Here you are! 🎉

Your application is available on [http://localhost:3000](http://localhost:3000)

## Seeds

- Home page
- Basic settings
- Admin user (login: **Admin** password: **admin**)

To run seeds, make sure the server is already started, and then run the following command:

```bash
./seeds.sh
```

## Environment variables

| Variable             | Meaning                                                 | Default value      |
| -------------------- | ------------------------------------------------------- | ------------------ |
| COMPOSE_FILE         | docker-compose file path                                | docker-compose.yml |
| LOGGER               | Enables or disables logger                              | true               |
| LOGLEVEL             | Logging level                                           | info               |
| PORT                 | TCP port for                                            | 3000               |
| TRANSPORTER          | Transporter http address                                | nats://nats:4222   |
| DB_HOST              | Database host                                           | mongodb            |
| DB_PORT              | Database port                                           | 27017              |
| DB_DATABASE          | Database name                                           | power-cms          |
| ACCESS_TOKEN_SECRET  | Access token secret - should be a random, secure value  | power-cms-access   |
| REFRESH_TOKEN_SECRET | Refresh token secret - should be a random, secure value | power-cms-refresh  |
