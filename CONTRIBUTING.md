# Contributing to WolfPort

Thank you for your interest in contributing to WolfPort! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

## 📜 Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/wolfport.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`

## 💻 Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Backend Setup

```bash
cd back-end
cp .env.example .env
# Edit .env with your configuration
npm install
npm run dev
```

### Frontend Setup

```bash
cd front-end
cp .env.example .env
# Edit .env with your configuration
npm install
npm run dev
```

## 🔧 Making Changes

1. Keep changes focused and atomic
2. Write clear, descriptive commit messages
3. Add tests for new features
4. Ensure all tests pass before submitting

### Commit Message Format

```
<type>(<scope>): <subject>

<body>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📤 Submitting Changes

1. Push your changes to your fork
2. Create a Pull Request against `main` branch
3. Fill out the PR template completely
4. Wait for code review

## 🎨 Style Guidelines

### JavaScript/JSX

- Use ES6+ syntax
- 2 spaces for indentation
- Use semicolons
- Single quotes for strings
- No unused variables

### React Components

- Functional components with hooks
- PropTypes for component props
- Clear component naming

### CSS

- Use CSS custom properties for theming
- Mobile-first responsive design
- BEM naming convention where appropriate

## 🧪 Testing

```bash
# Frontend tests
cd front-end
npm run test

# Backend tests
cd back-end
npm run test
```

## 📝 Additional Resources

- [GitHub Documentation](https://docs.github.com/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)

## ❓ Questions?

Feel free to open an issue for any questions or concerns.
