# Noogle

## Search Engine with Page Ranking

This repository contains the code used to create A Search Engine for .np domain. This is the Final year project submitted in partial fulfillment of the requirements for the degree of
Bachelor of Science in Computer Science and Information Technology awarded by
**Tribhuvan University**

---

## Project By

- [Suparth Narayan Ghimire](https://suparthnarayanghimire.com.np)
- [Shree Krishna Lamichhane](https://shreekrishnalamichhane.com.np)
- [Shree Bhadra Bhattarai](#)

---

## Submitted To

**ASIAN COLLEGE OF HIGHER STUDIES**\
Department of Computer Science and Information Technology\
**Asian College of Higher Studies**\
Jawalakhel, Lalitpur

---

## Supervisor

**Mr. Dadhi Ram Ghimire**\
Assistant professor\
**Asian College of Higher Studies**\
**Jawalakhel, Lalitpur**

---

## Technology


### Server

**Primary Language**: Python and Typescript\
**Server Libarary**: Flask\
**Libraries Used**

| Name        | Description                                                         |
| :---------- | :------------------------------------------------------------------ |
| `Puppeteer` | igh-level API for controlling headless Chrome or Chromium browsers |
| `Numpy`     | Mathematical functions for numerical operations                     |
| `Pandas`    | Indexing,slicing, and reshaping of data.                            |
| `NLTK`      | Text classification, tokenization, stemming, and parsing            |
| `NetworkX`  | Creation, manipulation, and analysis of complex networks or graphs  |
| `PyMango`   | Interacting with MongoDB, a NoSQL Database                          |
| `Flask`     | Micro web framework for Python used for building web applications   |

### Client

**Primary Language**: Typescript\
**Client Meta Framework**: Next.js\
**Libraries Used**

| Name           | Description                                                                                      |
| :------------- | :----------------------------------------------------------------------------------------------- |
| `Next.js`      | React-based web application framework used for building server-side rendered (SSR) applications. |
| `Yarn`         | Mathematical functions for numerical operations                                                  |
| `Tailwind CSS` | CSS framework that provides a set of pre-defined classes to style web pages.                     |

---

## API Reference

#### Search

```http
  GET /search
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `query`   | `string` | **Required**. Your Query |

Takes query and returns list of websites relating to this query

---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Server

- `ALLOW_ORIGIN`: To allow CORS (default is http://localhost:5000)

- `DATABASE_URI`: Connection String for MongoDB Database (default is `mongodb://root:prisma@localhost:27017/db_seven_sem_prj?authSource=admin`)

### Client

- `NEXT_PUBLIC_SERVER_ENDPOINT`: To determine endpoint where server is running (default is http://localhost:5000)

---

## Run

To run this project locally, follow following procedure

### Clone

```bash
  git clone https://github.com/suparthghimire/search_engine.git
```

### Server

```
  cd search_engine
  cd server/api
  python app.py
```

### Client

```
  cd search_engine
  cd server/ui
  yarn
  yarn build
  yarn start
```

---

## Report

[Download Project Report](https://drive.google.com/file/d/1_hsGLPlCLvBSCsVDbKDxYsso-iRa45_E/view?usp=share_link)