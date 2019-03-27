---
id: service-domain
title: Service domain
sidebar_label: Domain
---

> Domain is responsible for the domain logic - it should contain the domain model, repository, events and exceptions.

## Domain model

Model describes the business product, it is responsible for handling the business logic and generates proper domain events.

Example:

```ts
import { Id } from "@power-cms/common/domain";

export class Foo {
  constructor(private id: Id, private bar: string) {}

  public getId(): Id {
    return this.id;
  }

  public getBar(): string {
    return this.bar;
  }
}
```

## Exceptions

There are many situations that you need to throw an exception: assertion fail, resource not found, or any other domain logic exception occured. For the general error handling purpose, all domain exceptions must extend domain exceptions form `@power-cms/common` package. This is the only way to properly handle the domain error in another abstraction layer (communication layer in this case) and convert it to the proper HTTP status code.

```ts
import { DomainException } from "@power-cms/common/domain";
```

**`DomainException`** - generic domain exception

**`ForbiddenException`** - should be used then the action is not allowed

**`InvalidArgumentException`** - should be used when improper arguments provided

**`NotFoundException`** - should be used the resource is not found

**`PersistanceException`** - should be used on persistance error

**`ValidationException`** - should be when validation failed

Example:

```ts
import { Id, NotFoundException } from "@power-cms/common/domain";

export class FooNotFoundException extends NotFoundException {
  public static withId(id: Id): FooNotFoundException {
    return new FooNotFoundException(
      `Foo with id ${id.toString()} cannot be found.`
    );
  }
}
```

## Repository

From the domain point of view repository is only an interface, cantaining all methods definitions for persisting data. When creating your own repositories you can extend the `@power-cms/common` ones. They are atomic, so use only those, which you neeed, but if they are not sufficient, then feel free to create your own.

```ts
import { ICreateRepository } from "@power-cms/common/domain";
```

**`ICreateRepository`** - contains create method

**`IUpdateRepository`** - contains update method

**`IDeleteRepository`** - contains delete method

Example:

```ts
import {
  ICreateRepository,
  IDeleteRepository,
  IUpdateRepository
} from "@power-cms/common/domain";
import { Foo } from "./foo";

export interface IFooRepository
  extends ICreateRepository<Foo>,
    IUpdateRepository<Foo>,
    IDeleteRepository {}
```
