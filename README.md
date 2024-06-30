A demo application showcasing how to use RTK (**Redux Toolkit**) with **React** in an **API Rest** context.

## Getting Started

**Requirements**

- **Make**: Required to safely start the application (you can do it manually if you want)
- **Node 18+**: This is a `vitejs` peer dependency
- **npm**: Required to manage packages and run scripts
- **sqlite3**: Required to process data
- **npx**: Required to execute `prisma`

**Instructions**

1. Clone the project.
2. Move to the project root.
3. Execute the make script.

```bash
# The script will start both the client and server development servers
make start
```

4. The script should prompt you to name a migration. Add any name and **enter**

**HMR**

Both services have HMR enabled. Yeah! :)

## Challenges

The project tackle 4 main challenges (non exhaustive list):

1. Properly using Redux (which is a challenge in itself ...)
2. Redux in the context of a react Rest API application
3. Redux in the context of TypeScript
4. Playing with Redux middlewares

### 1. Redux

**Context & Problematic**

Redux is one of the most controversial topic in the Javascript community. It has its supporters and haters, both having strong and valid arguments.
Using Redux should never be the first approach when developing an application.
It adds so much boilerplate to the code and complexity.
We should use it only when necessary.

On the other hand, Redux has strong valid pros.

- It comes with a bold devtools, the same type than tools like `ReactQuery`
- It can be used alone to fetch data, caching, debugging, testing, ...
- It can handle complexity and scale with the application
- It is based on `Flux` architecture which standardized
- It is an opinionated approach, that means it is predictable and universal

**Challenges**

- This project propose an approach of using Redux in a way the project stays organized

### 2. Redux in react Rest API context

**Context & Problematic**

API means **side-effect**. And this comes with many questions and concerns as both `React` and `Redux` have their constraint regarding **side-effect**.
First, `Redux` i based on a concept called **Functional Programming**. That approach imposes rules about having **pure functions**. One of the rules of a pure function is to non have side-effect. For example, `reducer` is a pure function.
On the other hand, `React` has almost the same rules.
So the question arises about how and where to handle the API call side-effect?

**Challenges**

- Propose a scalable, flexible and ...

### 3. Redux in the context of TypeScript

**Context & Problematic**

Just like for `Redux`, `TypeScript` is another sensitive topic in the Javascript community.
People who loves it will emphasize the ability to create a clean code, provide relevancy on the team, detect error earlier, ...
Other will decry the boilerplate, the difficulty to integrate dependency as if a dependency is not properly thought in terms of typing, you end up with trouble. Some libraries overuse generic making the understanding very tough, etc...

**Challenges**

- Provide a typed-clean code based

### 4. Redux middlewares

**Context & Problematic**

Redux middleware are very interesting. But can be challenging, especially in the context of TypeScript.
One of the challenges is to avoid cycling cases.

## Project structure

```
├── client
├── Makefile
└── server
```

#### Client

A **React** application using **RTK**, written in **TypeScript**.
The React application is based on **ViteJS**.

**Store**

The store is organized by "domain".
There is only one domain so far: entities.
There are 3 entities: `User`, `Project`, and `Bug`.

#### Server

An **ExpressJS** application written in TypeScript

## Improvements

### Workspace

As it might look, the project structure looks like a monorepo.
We could then choose to use Workspace to at least facilitate the development.

**Benefits**

- No more need to go on the right folder to perform `npm` operation
- Replace make but `npm scripts`
- Share configuration

## Troubleshoot

#### Make script triggers an error

The make script has been designed to be as idempotent as possible.
However, some unexpected errors still arise.

If you are encountering an error, **relaunch the script**, it should solve the issue.

## License

See License
