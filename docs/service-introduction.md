---
id: service-introduction
title: Introduction
---

Every microservice existing in PowerCMS should implement proper interface. It's very simple and as unopinionated as possible. Nothing describes it better than the code, so let's take a look at the interfaces below:

```ts
interface IService {
  name: string;
  actions: IActionHandler[];
}

interface IActionHandler {
  name: string;
  type: ActionType;
  private?: boolean;
  execute: (action: IActionData) => Promise<any>;
  authorize?: (action: IActionData) => Promise<boolean>;
}
```

The service itself contains a name, and an array of actions. The action contains name, type, private flag, and 2 methods: execute and authorize.

Those interfaces are available in special package called `@power-cms/common`, created to share the base code of all microservices in one plase.

## Hello service

Let's create a very basic project scaffolding:

```bash
npm init --yes
npm install --save-dev ts-node typescript
npm install --save @power-cms/common
```

and create an `index.ts` file containing a simple service:

```ts
import { IService, ActionType } from "@power-cms/common/application";

export const service: IService = {
  name: "foo",
  actions: [
    {
      name: "bar",
      type: ActionType.COLLECTION,
      execute: async () => ["foo", "bar"]
    }
  ]
};
```

## Project structure

It works, it's simple, it gives developer a free hand for the implementation of any kind, however it's not what we prefer. PowerCMS is domain driven, CQRS base project, so it need a good file structure. This is how we organize it:

```
src
├────domain
│    │    example.ts
│    │
│    └────exception
│         example-not-found.exception.ts
│
├──── application
│    ├────action
│    │    example.action.ts
│    │
│    ├────command
│    │    example.command.ts
│    │    example.command-handler.ts
│    │
│    ├────query
│    │    example.query.ts
│    │    example.view.ts
│    │
│    ├────service
│    │    service.ts
│    │
│    └────validator
│         example.validator.ts
│
└────infrastructure
```

## CLI Tool

> In the close future, there will be a CLI Tool to make project scaffolding in one command. It will also include other commands to generate single parts of service, so stay tuned, and check the **Roadmap**
