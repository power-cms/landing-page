---
id: user-service
title: User service
---

> User service stores information about the users. It doesn't contain any authentication informations like credentials.

## Model

### User

| Field        |          Type           | Required | Default   |
| ------------ | :---------------------: | :------: | --------- |
| **id**       |          uuid           |   yes    | undefined |
| **username** |         string          |   yes    | undefined |
| **email**    |          sting          |   yes    | undefined |
| **avatar**   | avatar &#124; undefined |   yes    | undefined |
| **roles**    |        string[]         |   yes    | undefined |

## Actions

| Name           | Public | Authorization |
| -------------- | :----: | :-----------: |
| **collection** |  Yes   |     Admin     |
| **create**     |  Yes   |     None      |
| **read**       |  Yes   | Admin or Self |
| **update**     |  Yes   | Admin or Self |
| **delete**     |  Yes   |     Admin     |
| **getByLogin** |   No   |     None      |
| **grantRoles** |   No   |     Admin     |

## Required services

- [Auth service](auth-service.md)
