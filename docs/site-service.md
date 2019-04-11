---
id: site-service
title: Site service
---

> Site service is an essential service of the CMS. It includes only sites management for now, but will contain comments and other site-specific stuff.

## Model

### Site

| Field       |         Type         | Required | Default   |
| ----------- | :------------------: | :------: | --------- |
| **id**      |         uuid         |   yes    | undefined |
| **type**    | `text` &#124; `blog` |   yes    | undefined |
| **title**   |        string        |   yes    | undefined |
| **content** |        string        |   yes    | undefined |
| **url**     |        string        |   yes    | undefined |

## Actions

| Name           | Public | Authorization |
| -------------- | :----: | :-----------: |
| **collection** |  Yes   |     None      |
| **create**     |  Yes   |     Admin     |
| **read**       |  Yes   |     None      |
| **update**     |  Yes   |     Admin     |
| **delete**     |  Yes   |     Admin     |

## Required services

- [Auth service](auth-service.md)
- [Site service](site-service.md)
