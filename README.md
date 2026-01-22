<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Execute in development evironment

1. Clone the repository

2. Execute

```
yarn install
```

3. Install Nest CLI

```
npm i -g @nestjs/cli
```

4. Set up the DB

```
docker-compose up -d
```

5. Clone **.env.template** file and rename to **.env**

6. Fill environment variables defined in **.env**

7. Run app with command:

```
yarn start:dev
```

8. Populate the DB with the Seed

```
localhost:3000/api/v2/seed
```

## Stack Used

- Nest.js
- MongoDB
- Docker
