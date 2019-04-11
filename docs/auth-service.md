---
id: auth-service
title: Auth service
---

> Auth service is responsible for authentication, authorization and storing the user credentials. It uses JTW tokens for authentication purpose.

## Model

### Credentials

| Field        |  Type  | Required | Default   |
| ------------ | :----: | :------: | --------- |
| **id**       |  uuid  |   yes    | undefined |
| **userId**   |  uuid  |   yes    | undefined |
| **password** | string |   yes    | undefined |

### Refresh token

| Field      |  Type  | Required | Default   |
| ---------- | :----: | :------: | --------- |
| **id**     |  uuid  |   yes    | undefined |
| **userId** |  uuid  |   yes    | undefined |
| **token**  | string |   yes    | undefined |

## Actions

| Name              | Public | Authorization |
| ----------------- | :----: | :-----------: |
| **login**         |  Yes   |     None      |
| **refresh_token** |  Yes   |     None      |
| **register**      |  Yes   |     None      |
| **authenticate**  |   No   |     None      |
| **authorize**     |   No   |     None      |

## Required services

None
