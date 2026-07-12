# Deployment Guide

This guide covers how to deploy WolfPort to production.

## 🌐 Vercel (Recommended)

### Prerequisites

1. A [Vercel](https://vercel.com) account
2. GitHub repository connected to Vercel

### Environment Variables

Set these in Vercel project settings:

| Variable | Description |
|----------|-------------|
| `DEEPSEEK_API_KEY` | Your DeepSeek API key for the chatbot |
| `FORMSPREE_ENDPOINT` | Your FormSpree endpoint URL |

### Deploy Steps

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables
5. Deploy!

### Automatic Deployments

Vercel automatically deploys on every push to `main` branch when configured.

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t wolfport-backend -f back-end/Dockerfile back-end/
```

### Run Container

```bash
docker run -p 3001:3001 --env-file back-end/.env wolfport-backend
```

## ☁️ Other Cloud Platforms

### Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
heroku config:set DEEPSEEK_API_KEY=your_key
git push heroku main
```

### Railway

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

## 🔒 Production Checklist

- [ ] All environment variables configured
- [ ] API keys secured (not in code)
- [ ] HTTPS enabled
- [ ] Rate limiting tested
- [ ] Error handling verified
- [ ] Performance optimized

## 📊 Monitoring

Consider adding monitoring services:

- [Sentry](https://sentry.io) - Error tracking
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

## 🆘 Troubleshooting

### Common Issues

**Build fails**
- Check Node.js version matches local development
- Verify all dependencies installed

**API not responding**
- Check environment variables are set
- Verify server is running on correct port

**Chat not working**
- Verify DeepSeek API key is valid
- Check API quota/limits

## 📞 Support

For deployment issues, open an issue on GitHub.
