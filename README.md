# ConduitAI

The core idea is an AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ZeroMerge/ConduitAI.git
cd ConduitAI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up the database
npx prisma migrate dev
npx prisma generate

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📋 Features

- 🎯 **Next.js 14** with App Router
- 🎨 **TypeScript** for type safety
- 🗄️ **Prisma** for database ORM with PostgreSQL
- 🧪 **Jest & React Testing Library** for testing
- 🔒 **Security** features (CSP, rate limiting, SQL injection prevention)
- 📊 **Monitoring** with Sentry and PostHog
- 🚀 **CI/CD** with GitHub Actions
- 📦 **Automatic deployments** to Vercel
- 🔄 **Automated dependency updates**

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run analyze` - Analyze bundle size

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - How to deploy to production
- [Testing Guide](./TESTING.md) - How to write and run tests
- [Security Documentation](./SECURITY.md) - Security features and best practices

## 🏗️ Project Structure

```
├── .github/workflows/    # GitHub Actions workflows
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── lib/            # Utility functions and configurations
│   ├── middleware.ts   # Next.js middleware (rate limiting, etc.)
│   ├── mocks/          # MSW mocks for testing
│   └── __tests__/      # Test files
├── .env.example        # Environment variables template
├── jest.config.js      # Jest configuration
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── vercel.json         # Vercel deployment configuration
```

## 🔐 Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for session encryption
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN for error tracking
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API key for analytics

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

See [TESTING.md](./TESTING.md) for more details.

## 🚀 Deployment

This project is configured for deployment on Vercel with automatic preview deployments for pull requests.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🔒 Security

This project implements multiple security features:

- Content Security Policy (CSP) headers
- Rate limiting on API routes
- SQL injection prevention via Prisma
- Secure error handling with Sentry
- HTTPS enforcement

See [SECURITY.md](./SECURITY.md) for more details.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
