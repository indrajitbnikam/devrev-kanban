
# Devrev Kanban

This is an assignment project where the end goal is to create the kanban board.

https://user-images.githubusercontent.com/24988127/214856284-be35639b-7c8b-4584-b1dc-df307e8bdb06.mov

## Run Locally

Clone the project

```bash
  git clone git@github.com:indrajitbnikam/devrev-kanban.git
```

Go to the project directory

```bash
  cd devrev-kanban
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

If, you want to run prettier

```bash
  npx prettier --write .
```


## Features

Project is pretty basic. It supports following actions,

- Create task lane with user-specified title.
- Create task for any existing lanes with user-specified title and following types
    - FEATURE
    - BUG
    - REQUEST
- Move task to any lane or change order in same lane
- Delete any lane
- Delete any task
- State is persisted with every change in app. Even if you restart your machine.


## Deployment

Project is deployed to [Vercel](https://vercel.com/) with every commit/PR created.



## Demo

You can check the project live [here.](https://devrev-kanban.vercel.app/) 🚀


## Tests

I only performed sanity check on this project.

Unfortunately, I could not add any tests as it took more than 2 days for me complete this whole project. Which is already a lot for assignment project and my current priorities.
## 🚀 About Me
You can find about me here,

https://www.indrajeet.me/

