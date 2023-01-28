
# Devrev Kanban

This is an assignment project where the end goal is to create the kanban board.

![Demo](https://user-images.githubusercontent.com/24988127/214857020-37d8d3b5-a0d0-4c52-a439-22dd922ddb82.gif)

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

## Libraries used

Project uses alot of interesting libraries from frontend ecosystem. I'll list them just for reference here,
- [Vite.js](https://vitejs.dev/) - Modern, Superfast bundler
- [TypeScript](https://www.typescriptlang.org/) - Compile time type safety across app
- [Tailwind](https://tailwindcss.com/) - CSS-Utility class library
- [HeadlessUI](https://headlessui.com/) - Fully accessible unstyled components (used for modals and dropdowns)
- [redux-toolkit](https://redux-toolkit.js.org/) - state management
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) - drag and drop lib (maintained fork of famous react-beautiful-dnd lib)
- [react-hook-form](https://react-hook-form.com/) - form validation
- [zod](https://zod.dev/) - Runtime typescript based schema validation (used to validate form data)

## Deployment

Project is deployed to [Vercel](https://vercel.com/) with every commit/PR created.

## Demo

You can check the project live [here.](https://devrev-kanban.vercel.app/) 🚀


## Tests

I only performed sanity check on this project.

Unfortunately, I could not add any tests as it took more than 2 days for me complete this whole project. Which is already a lot for assignment project and considering my current priorities.

## 🚀 About Me
You can find about me here,

https://www.indrajeet.me/

