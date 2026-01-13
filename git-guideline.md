# Git & GitLab Guideline

This guide covers Git setup, GitLab configuration, and version control workflows.

## Prerequisites

- Git installed on your system
- A GitLab account

## 1. Git Setup

### Initialize Git Repository

```bash
# Initialize git (if not already done by create-next-app)
git init

# Check status
git status
```

### Configure Git

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### Create .gitignore

The Next.js template includes a `.gitignore` file. Verify it includes:

```
# dependencies
node_modules/
.pnp/

# testing
coverage/

# next.js
.next/
out/
build/
dist/

# production
.env*.local
.env

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
```

## 2. GitLab Setup

### Create GitLab Repository

1. Log in to GitLab (https://gitlab.com)
2. Click "New Project"
3. Choose "Create blank project"
4. Enter project name and description
5. Set visibility level (Private/Internal/Public)
6. Click "Create project"

### Configure SSH (Recommended)

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add the key to GitLab:
# Go to GitLab → Settings → SSH Keys → Paste key → Add key
```

### Or Use HTTPS

You can use HTTPS with a Personal Access Token:
1. GitLab → Settings → Access Tokens
2. Create token with `write_repository` scope
3. Save the token securely

## 3. Connect Local Repository to GitLab

### Add Remote Repository

```bash
# Using SSH (recommended)
git remote add origin git@gitlab.com:username/my-nextjs-app.git

# Or using HTTPS
git remote add origin https://gitlab.com/username/my-nextjs-app.git

# Verify remote
git remote -v
```

## 4. Commit and Push Code

### Initial Commit

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Next.js project setup

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to GitLab
git push -u origin main
```

### Regular Workflow

```bash
# Check what changed
git status

# Add specific files
git add src/app/page.tsx

# Or add all changes
git add .

# Commit with message
git commit -m "Add responsive header component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to remote
git push
```

## 5. Branch Strategy

```bash
# Create feature branch
git checkout -b feature/new-feature

# Work on feature with Claude
# Commit changes

# Push feature branch
git push -u origin feature/new-feature

# Create merge request on GitLab
```

## 6. GitLab CI/CD (Optional)

Create `.gitlab-ci.yml` for automated testing and deployment:

```yaml
image: node:18

stages:
  - test
  - build
  - deploy

cache:
  paths:
    - node_modules/

test:
  stage: test
  script:
    - npm ci
    - npm run lint
    - npm run test

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
    expire_in: 1 hour

deploy:
  stage: deploy
  script:
    - echo "Deploy to your hosting platform"
  only:
    - main
```

## 7. Best Practices

### Git Commits

- Make small, focused commits
- Write clear commit messages
- Commit frequently
- Don't commit sensitive data (.env files)

## 8. Commands Reference

```bash
git status             # Check status
git add .              # Stage all changes
git commit -m "msg"    # Commit changes
git push               # Push to remote
git pull               # Pull from remote
git checkout -b name   # Create new branch
git branch             # List branches
```

## 9. Troubleshooting

### Git Push Issues
- Verify remote URL: `git remote -v`
- Check authentication (SSH key or access token)
- Pull before push if behind: `git pull --rebase`

## Resources

- [GitLab Documentation](https://docs.gitlab.com)
- [Git Documentation](https://git-scm.com/doc)
