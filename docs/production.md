---
id: production
title: Production
---

To go production, you should use the production docker-compose file. Open `.env` file and change the very top variable `COMPOSE_FILE=docker-compose.prod.yml`. You can also provide your own docker-compose configuration if you want.

> If you used the development images before, then you have to rebuild them
>
> Do it by adding **--build** flag to `docker-compose up` command, or just remove image and build it from scratch.

Once you are ready to fly production, simply run

```ssh
docker-compose up -d
```

Then run the seeds with the following one-liner script:

```bash
docker run --rm -it --network=${PWD##*/}_power-cms power-cms sh -c "sh ./seeds-prod.sh"
```

And that's it! 🎉

Your application is available on port specified in `.env` file.

## Dockerized version

If you want to use fully dockerized application here you have a simple `docker-compose.yml` file example. Adjust it to your requirements.

```yaml
version: "3.4"

services:
  api:
    image: powercms/power-cms
    environment:
      SERVICES: api
    networks: ["power-cms"]
    depends_on: ["nats", "mongodb"]
    ports: ["3000:3000"]
    labels:
      - "traefik.enable=true"
      - "traefik.backend=api"
      - "traefik.port=3000"
      - "traefik.frontend.entryPoints=http"
      - "traefik.frontend.rule=PathPrefix:/"

  site:
    image: powercms/power-cms
    environment:
      SERVICES: site
    networks: ["power-cms"]
    depends_on: ["nats", "mongodb"]

  user:
    image: powercms/power-cms
    environment:
      SERVICES: user
    networks: ["power-cms"]
    depends_on: ["nats", "mongodb"]

  auth:
    image: powercms/power-cms
    environment:
      SERVICES: auth
      ACCESS_TOKEN_SECRET: power-cms-access
      REFRESH_TOKEN_SECRET: power-cms-refresh
    networks: ["power-cms"]
    depends_on: ["nats", "mongodb"]

  settings:
    image: powercms/power-cms
    environment:
      SERVICES: settings
    networks: ["power-cms"]
    depends_on: ["nats", "mongodb"]

  mongodb:
    image: mongo:4
    networks: ["power-cms"]

  nats:
    image: nats
    networks: ["power-cms"]

  traefik:
    image: traefik
    command: --web --docker --docker.domain=docker.localhost --logLevel=INFO --docker.exposedbydefault=false
    networks:
      - power-cms
    ports:
      - "4001:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /dev/null:/traefik.toml

networks: power-cms:
```

To run seed in production use this one-liner script while your app is started:

```bash
docker run --rm -it --network=${PWD##*/}_power-cms powercms/power-cms sh -c "sh ./seeds-prod.sh"
```
