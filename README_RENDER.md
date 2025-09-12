# Deploy to Render with Docker (Static Site)

This site is a static portfolio served by Nginx in a Docker container. Follow these steps to push to GitHub and deploy on Render.

## 1) Push to GitHub

1. Initialize git (if not already):
```bash
git init
git add .
git commit -m "Initial commit: static site + Dockerfile"
git branch -M main
git remote add origin https://github.com/PROSSYNABBONA/Gonzaga-portifolio.git
git push -u origin main
```

Note: Make sure the repo exists and is empty or ready to receive this push.

## 2) Render deployment (Docker)

1. Sign in to Render and click "New +" → "Web Service".
2. Connect your GitHub account and pick the repo `PROSSYNABBONA/Gonzaga-portifolio`.
3. In the service settings:
   - Name: `gonzaga-portfolio` (or your choice)
   - Runtime: `Docker`
   - Region: nearest to your users
   - Branch: `main`
   - Root Directory: `/` (project root)
   - Auto-Deploy: `Yes`
4. Create Web Service.

Render will build using the `Dockerfile`, then run Nginx on port 80. Render automatically maps it to the public URL.

## Local test (optional)

```bash
# Build
docker build -t gonzaga-portfolio .
# Run
docker run -p 8080:80 gonzaga-portfolio
# Open http://localhost:8080
```

## Files added
- `Dockerfile`: Nginx-based static hosting
- `nginx.conf`: Production Nginx config (caching, security headers)
- `.dockerignore`: Smaller image by ignoring dev files
