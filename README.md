# Requirements

1. rustFS server up and running
  ```bash
  cd ~/rustfs
  make start
  ```
2. postgres server up and running
  ```bash
    brew services start
  ```
3. Env :
  - DATABASE_URL (in root or packages/db),
  - COOKIE_NAME(apps/api)
  - RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET(in apps/api or project root),
  - NEXT_PUBLIC_RAZORPAY_KEY_ID(in apps/web or project root),

# Start Dev Server

This is a monorepo project based on Turbo-repo.
Execute this code in the root of the project to start all the dev servers:

```bash
bun install
bun run dev
```

---

# Shadcn Component Library

## Adding Shadcn Components

To add components to your app, run the following command at the root of your `web` app: for example, to add a button component:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```

### Project Structure

This is a monorepo project based on Turbo-repo. Using vertical slice architecture.

```bash
root --/
      apps/ -- /
            api/ (backend)
            web/ (frontend - for users )
            admin/ (frontend - for admins )
            packages/ --/
                      db/ (database config, schemas)
                      ui/ (component library)

```
