# AI Development Rules - Meu Ateliê de Pequenas Vitórias

## Tech Stack
- **Framework**: React 18 with Vite for fast development and bundling.
- **Language**: TypeScript for type safety and better developer experience.
- **Styling**: Tailwind CSS for utility-first styling and responsive design.
- **UI Components**: shadcn/ui (built on Radix UI) for accessible, unstyled components.
- **Icons**: Lucide React for a consistent and lightweight icon set.
- **Routing**: React Router DOM (v6) for client-side navigation.
- **Data Fetching**: TanStack Query (React Query) for server state management.
- **Backend & Auth**: Supabase for database, authentication, and real-time features.
- **Forms**: React Hook Form combined with Zod for schema-based validation.
- **Animations**: Framer Motion for smooth transitions and micro-interactions.

## Library Usage Rules

### 1. UI & Styling
- **shadcn/ui**: Always check if a component exists in `src/components/ui/` before creating a new one. Use these as the foundation for all UI elements.
- **Tailwind CSS**: Use utility classes for all styling. Avoid writing custom CSS unless absolutely necessary (e.g., complex animations or third-party overrides).
- **Icons**: Use `lucide-react` exclusively. Do not install other icon libraries.

### 2. State & Data
- **Server State**: Use `useQuery` and `useMutation` from `@tanstack/react-query` for all API interactions with Supabase.
- **Local State**: Use standard React `useState` or `useReducer`. For complex global UI state, consider a lightweight solution or context, but prefer keeping state local.
- **Supabase**: Use the generated client in `src/integrations/supabase/client.ts` for all database and auth operations.

### 3. Forms & Validation
- **React Hook Form**: Use for all forms to manage state and submission.
- **Zod**: Define schemas for all form data and API responses to ensure runtime type safety.

### 4. Navigation
- **React Router**: Use `<Link>` or `useNavigate` for internal navigation. Keep all route definitions in `src/App.tsx`.

### 5. Code Structure
- **Components**: Keep components small and focused. Place reusable UI in `src/components/ui/`, feature-specific components in `src/components/app/` or `src/components/sections/`.
- **Hooks**: Extract complex logic into custom hooks in `src/hooks/`.
- **Pages**: All top-level routes should reside in `src/pages/`.

### 6. Design Principles
- **Responsiveness**: Every component must be mobile-first and fully responsive.
- **Accessibility**: Ensure all interactive elements have proper ARIA labels and keyboard navigation support (leveraging Radix UI).
- **Performance**: Use `lazy` loading for routes and heavy components where appropriate.