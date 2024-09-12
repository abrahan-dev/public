# Architecture, Typescript and DDD

**Software architecture example.**

- Event oriented
- Hexagonal architecture
- Domain driven design
- Asynchronous management with RabbitMQ

## 🥞 Stack

- Node
- Typescript
- MySql

### 📚 Libraries

- Express
- Jest
- Cucumber
- TypeORM

### 🚀 Infrastructure

- Docker
- Github

## Project structure

It follows conventions inspired by domain driven design, hexagonal architecture and command/query responsibility segregation.

| Path  | Description |
| ------------- | ------------- |
| /src  | It holds only code that is supposed to be compiled and sent into production.  |
| /src/apps  | It holds application code: web and server frameworks, separated by contexts and apps.  |
| /src/contexts  | It holds business code separated by contexts and modules.  |
| /tests  | It holds all the tests.  |
| /tests/apps  | It holds black box tests (e2e, acceptance ...) separated by context and app.  |
| /tests/contexts  | It holds unit tests or integration tests separated by contexts and modules. It replicates the structure of _/src/contexts_.  |

## Contexts

### Backoffice

[👀](./src/contexts/backoffice/) Administrators can interact with client data and see reports.

### Frontoffice

[👀](./src/contexts/frontoffice/) Clients use this application.

### Home

[👀](./src/contexts/home/) The static home page of the project.
