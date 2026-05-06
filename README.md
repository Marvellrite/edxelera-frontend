# EdXelera Frontend

EdXelera Frontend is the Next.js application for the EdXelera LMS platform. It is intended to
provide the public site, authentication flows, student learning experience, instructor tools, and
admin dashboard.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local Next.js development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |

## Project Structure

The project keeps application code in `src/` and framework configuration files at the repository
root.

```txt
edxelera-frontend/
├── docs/
│   └── folder-structure.md
├── public/
├── src/
│   └── app/
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

For the full architecture and folder structure guide, see
[docs/folder-structure.md](./docs/folder-structure.md).

## Development Notes

- Use `@/` imports for source files. The alias maps to `./src/*` in `tsconfig.json`.
- Keep route files in `src/app` thin and move feature logic into feature modules as the app grows.
- Keep static assets in `public/`.
- Keep global styles imported by the root layout in `src/app/globals.css`.

## Documentation

- [Folder structure](./docs/folder-structure.md)
