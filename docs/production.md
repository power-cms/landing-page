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

Then run the seeds like you normally do in development environment

```bash
./seeds.sh
```

And that's it! 🎉

Your application is available on port specified in `.env` file.