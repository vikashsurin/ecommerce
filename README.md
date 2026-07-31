# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```

## To start the dev server

Execute this code in the root of the project.
 ```bash
bun install  
bun run dev
 ```

#### Requirements

- postgresql server should up and running.
- env variables to be set:
  -  DATABASE_URL (in root or packages/db),
  -  RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET(in apps/api or project root),
  -  NEXT_PUBLIC_RAZORPAY_KEY_ID(in apps/web or project root),

## Project Structure

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

