# 🐺 WolfPort - Full-Stack Developer Portfolio

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://wolfport.vercel.app)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![DeepSeek AI](https://img.shields.io/badge/Powered%20by-DeepSeek-000000?logo=openai)](https://deepseek.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![CI](https://github.com/wolfras/wolfport/actions/workflows/ci.yml/badge.svg)](https://github.com/wolfras/wolfport/actions)

## ✨ Live Demo

**Visit the live portfolio:** [https://wolfport.vercel.app](https://wolfport.vercel.app)

---

## 📖 About This Project

WolfPort is my personal portfolio website showcasing my skills, projects, and experience as a Full-Stack Developer. Built with React and hosted on Vercel, it features an AI-powered chatbot using DeepSeek API that can answer questions about my work, web development, and general knowledge.

### 🎯 Purpose

- Showcase my professional work and projects
- Demonstrate technical skills in modern web development
- Provide an interactive experience with AI chatbot
- Serve as a central hub for professional contact

---

## 🚀 Quick Start

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

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Custom Theme** | Red/yellow color scheme with dark/light mode toggle |
| 🤖 **AI Chatbot** | Kevin The Cyber Coder powered by DeepSeek API |
| 📱 **Responsive Design** | Works perfectly on desktop, tablet, and mobile |
| 📝 **System Stream** | Visitors can leave messages that appear in real-time |
| 🚀 **Performance** | Optimized for 95+ PageSpeed score |
| 🔍 **SEO Optimized** | Meta tags, sitemap, and structured data for search engines |
| 🌓 **Dark/Light Mode** | User preference saved to localStorage |
| 📊 **Project Showcase** | Grid layout highlighting my best work |
| ✅ **CI/CD** | Automated testing and deployment |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool and dev server |
| **CSS3** | Custom styling with no external dependencies |
| **Vitest** | Unit testing |

### Backend & AI
| Technology | Purpose |
|------------|---------|
| **Express.js** | API server |
| **DeepSeek API** | AI chatbot intelligence |
| **Nodemailer** | Email notifications |

### Deployment & Tools
| Tool | Purpose |
|------|---------|
| **Vercel** | Hosting and deployment |
| **GitHub Actions** | CI/CD pipeline |
| **Git** | Version control |

---

## 🧪 Testing

```bash
# Frontend tests
cd front-end && npm test

# Backend tests
cd back-end && npm test
```

---

## 📁 Project Structure

```
wolfport/
├── back-end/           # Express.js backend server
│   ├── config/          # API configurations
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── server.js        # Server entry point
├── front-end/          # React frontend
│   ├── api/             # Vercel serverless functions
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── data/        # Static data
│   │   └── test/        # Test files
│   └── vite.config.js   # Vite configuration
├── .github/             # GitHub workflows
├── CONTRIBUTING.md      # Contribution guidelines
├── DEPLOYMENT.md        # Deployment instructions
└── README.md
```

---

## 📚 Additional Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Mukeshimana Kevin (Kevin The Cyber Coder)](https://github.com/wolfras)
