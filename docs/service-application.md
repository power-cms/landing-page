---
id: service-application
title: Service application
sidebar_label: Application
---

> Application is responsible for handling all the actions, which are possible to execute in the service, it orchestrates the application flow. Also in this part of the service are placed commands, handlers, and queries.

## Command

Command directory includes the paris of commands and handlers, which are responsible for any application persistant state change, like inserting new resources, updating or deleting. Commands are very simple, anemic interfaces, but the handlers are classes using repositories to perform those actions. The very important rule here is to never invoke another command from the command's method - this is action's responsibility to delegate the proper commands set.

In general command handler must implement following interface:

```ts
interface ICommandHandler {
  handle(data: any): Promise<void>;
}
```

It just handles a command of any type, and returnes Promise of void (so can perform acync methods). There are some abstract ready-to-use command handlers provided in the `@power-cms/common` package, but if they are not sufficient, feel free to create your own.

```ts
import { BaseCreateCommandHandler } from "@power-cms/common/application";
```

**`BaseCreateCommandHandler`** - base create handler

**`BaseUpdateCommandHandler`** - base update handler

**`BaseDeleteCommandHandler`** - base delete handler

Example:

```ts
export interface ICreateFooCommand {
  id: string;
  bar: string;
}
```

```ts
import { BaseCreateCommandHandler } from "@power-cms/common/application";
import { Id } from "@power-cms/common/domain";
import { Foo } from "../../domain/foo";
import { IFooRepository } from "../../domain/foo.repository";
import { ICreateFooCommand } from "./create-foo.command";

export class CreateFooCommandHandler extends BaseCreateCommandHandler<
  Foo,
  ICreateFooCommand
> {
  constructor(fooRepository: IFooRepository) {
    super(fooRepository);
  }

  protected transform(command: ICreateFooCommand): Foo {
    return new Foo(Id.fromString(command.id), command.bar);
  }
}
```

## Query

Queries in contrast to repositories, are used just for fetching data from the storage. In terms of data models they use `Views` - kind of DTO class. In the application part queries are only interfaces, describing the

There is a set of ready-to-use queries in the `@power-cms/common` package.

```ts
import { ISingleQuery } from "@power-cms/common/application";
```

**`ISingleQuery`** - fatches single resource by id

**`ICollectionQuery`** - fatches all collection, pagination included

Example

```ts
export class FooView {
  constructor(public id: string, public bar: string) {}
}
```

```ts
import { ICollectionQuery } from "@power-cms/common/application";
import { ISingleQuery } from "@power-cms/common/application";
import { FooView } from "./foo.view";

export interface IFooQuery
  extends ISingleQuery<FooView>,
    ICollectionQuery<FooView> {}
```

## Action

When you have both commands and queries ready, it's the best time to start writing actions. They invoke certain comands, and run proper queries. They include a name, type, private flag, execution method and optional authorization method.

Actions must implment the following interface:

```ts
export interface IActionHandler {
  name: string;
  type: ActionType;
  private?: boolean;
  execute: (action: IActionData) => Promise<any>;
  authorize?: (action: IActionData) => Promise<boolean>;
}

export enum ActionType {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
  COLLECTION = "collection"
}

export interface IActionData {
  data?: any;
  params?: any;
  query?: any;
  auth?: any;
}
```

`ActionType` is used in the communication layer for routing purpose, also if you mark the action as private, it won't be available from the API gateway, but only by other microservices.

An `authorize` method takes the action as an argument should return boolean value in order to possibility to perform certain action by the user.

As other parts of PowerCMS, there are some base actions in the `@power-cms/common` package. Of course, if they don't cover your case - create your own implementation of `IActionHandler` interface.

```ts
import { BaseCreateAction } from "@power-cms/common/application";
```

**`BaseAction`** - very generic, base action

**`BaseCollectionAction`** - fetching resource collection

**`BaseCreateAction`** - fetching resource collection

**`BaseReadAction`** - fetching single resource

**`BaseUpdateAction`** - updating resource

Example:

```ts
import {
  Acl,
  BaseCreateAction,
  IActionData
} from "@power-cms/common/application";
import { JoiObject } from "joi";
import { CreateFooCommandHandler } from "../command/create-foo.command-handler";
import { IFooQuery } from "../query/foo.query";
import { FooView } from "../query/foo.view";
import { validator } from "../validator/create.validator";

export class CreateAction extends BaseCreateAction<FooView> {
  public validator: JoiObject = validator;

  constructor(
    createFooHandler: CreateFooCommandHandler,
    fooQuery: IFooQuery,
    private acl: Acl
  ) {
    super(createFooHandler, fooQuery);
  }

  public authorize(action: IActionData): Promise<boolean> {
    return this.acl
      .createBuilder(action)
      .isAdmin()
      .check();
  }
}
```

## Service

The last thing of the application part is the service class. The interface is really simple, it contains only name and actions. There is no need for any additional base classes in this case, let's see an example:

```ts
import { IActionHandler, IService } from "@power-cms/common/application";

export class FooService implements IService {
  public name: string = "foo";

  constructor(public actions: IActionHandler[]) {}
}
```

## Acl

Acl is a part of application security, it's responsible for users authorization to perform any actions. We use builder pattern to compose certain validation rules. It should be heavy used especially in the actions.

Example:

```ts
public authorize(action: IActionData): Promise<boolean> {
  return this.acl
    .createBuilder(action)
    .isAdmin()
    .check();
}
```

Then building the authorization rules, you should start from the **`createBuilder(action)`** method, then chain all the rules you want to validate, and then build the acl by invoking **`check()`** method.

Available acl methods:

**`.isAdmin()`** - checks if user is admin

**`.isAuthenticated()`** - checks if user is authenticated

**`.isOwner()`** - checks if user is the resource owner (`ownerId` field on the resource should match user's id)

**`.custom(rule: (actionData: any) => boolean)`** - allows to provide custom method

## Remote procedure

Remote procedure module is for communication between services. The application part contains only an interface, without concrete implementation.

This is how it looks like:

```ts
import { IActionData } from '../action/action-handler';
export interface IRemoteProcedure {
    call: <T>(serviceName: string, actionName: string, action: IActionData) => Promise<T>;
}
```

## Logger

Everything is obvious here - a standard logger interface.

```ts
export type ILogMethod = (level: string, msg: string) => void;
export type ILeveledLogMethod = (msg: string) => void;
export interface ILogger {
    log: ILogMethod;
    error: ILeveledLogMethod;
    warn: ILeveledLogMethod;
    info: ILeveledLogMethod;
    verbose: ILeveledLogMethod;
    debug: ILeveledLogMethod;
}
```

## Pagination

Pagination class is used for data pagination in repository. It allows to set items limit per page, and choose the certain page. 