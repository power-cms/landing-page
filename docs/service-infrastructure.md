---
id: service-infrastructure
title: Service infrastructure
sidebar_label: Infrastructure
---

> Infrastructure part contains everything connected with any third party services integration (eg. database) or anything else connected with projet architecture, like DI container configuration.

## Container (DI)

For now PowerCMS uses [awilix](https://www.npmjs.com/package/awilix) in it's classic mode for dependency injection and application container. Container needs to be configured manually, but decorators are the part of roadmap.

## MongoDB

PowerCMS uses currently [MongoDB](https://www.mongodb.com) as a data storage. All repositories implementations ale written with MongoDB, but as we use large abstraction layer, there is nothing to prevent you from writing another implementations, eg. with PostgreSQL.

`@power-cms/common` package contains the pagination helper to handle pagination easily and consistent.

```ts
import { MongodbPaginator } from "@power-cms/common/infrastructure";

...

public async getAll(pagination: Pagination): Promise<IPaginationView<SiteView>> {
  const collection = await this.getCollection();
  return this.paginator.paginate(collection, pagination, this.toView);
}

```

## Logger

We use [winston](https://www.npmjs.com/package/winston) as an application logger. It's light and sufficient, the format we use is the logstash one.
