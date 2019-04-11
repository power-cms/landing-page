---
id: settings-service
title: Settings service
---

> This service contains general informations like title and logo of the page. There will be more settings in the future. It also provides the routing configuration for the front-end app.

## Model

### Settings

| Field     |  Type  | Required | Default   |
| --------- | :----: | :------: | --------- |
| **title** | string |   yes    | undefined |
| **logo**  | string |   yes    | undefined |

## Actions

| Name       | Public | Authorization |
| ---------- | :----: | :-----------: |
| **create** |   No   |     None      |
| **read**   |  Yes   |     None      |
| **update** |  Yes   |     Admin     |

## Required services

- [Auth service](auth-service.md)
- [Site service](site-service.md)
