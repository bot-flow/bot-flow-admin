# bot-flow Admin

The web administration interface for bot-flow. It provides operational dashboards and a visual BPMN workflow editor backed by the bot-flow API.

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4 and TailGrids components
- BPMN modeling with `bpmn-js`
- TanStack Query and TanStack Table
- Recharts and FullCalendar

## Prerequisites

- Node.js 20.9 or later
- npm
- A running bot-flow API instance

## Getting started

Install dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

The default API URL is:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Main features

- Responsive admin dashboard with light and dark themes
- Analytics cards, charts, tables, forms, and calendar views
- Visual BPMN workflow modeling
- Workflow validation, saving, publishing, and execution
- User-task completion from the workflow execution panel

## Project structure

```text
src/
├── app/                    # App Router pages, layouts, and global styles
├── components/             # Shared UI and application-shell components
├── hooks/                  # Reusable React hooks
├── services/api/           # API client and feature-specific API modules
├── types/                  # Shared TypeScript declarations
└── utils/                  # Formatting and UI utilities
```

The workflow editor is located under `src/app/(with-layouts)/(dashboard)/workflow-editor`, and its API integration is under `src/services/api/workflows`.

## Production

Build and start the optimized application:

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_API_BASE_URL` to the public URL of the deployed API before building the application.

