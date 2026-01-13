# Next.js Development Guideline with Claude CLI

This guide covers the complete workflow from installing Claude CLI to pushing your Next.js application to GitLab.

## Prerequisites

- Node.js (v18 or higher)
- Git installed on your system
- A GitLab account
- npm or yarn package manager

## 1. Install Claude CLI

### Installation Steps

```bash
# Install Claude CLI globally using npm
npm install -g @anthropic-ai/claude-code

# Or using npx (no installation required)
npx @anthropic-ai/claude-code
```

### Verify Installation

```bash
claude --version
```

### Authentication

```bash
# Start Claude CLI
claude

# Follow the authentication prompts to connect your Anthropic account
```

## 2. Create Next.js Project

### Using create-next-app

```bash
# Create a new Next.js app
npx create-next-app@latest my-nextjs-app

# Navigate to project directory
cd my-nextjs-app
```

### Configuration Options

During setup, you'll be asked:
- TypeScript: Yes (recommended)
- ESLint: Yes
- Tailwind CSS: Yes (optional)
- `src/` directory: Yes (optional)
- App Router: Yes (recommended)
- Import alias: Yes (@/*)

## 3. Development with Claude CLI

### Start Claude in Your Project

```bash
# Navigate to your project directory
cd my-nextjs-app

# Start Claude CLI
claude
```

### Common Claude Commands

```bash
# Get help
/help

# Clear conversation
/clear

# View tasks
/tasks
```

### Example Workflows with Claude

**Creating a new component:**
```
Create a responsive Header component with navigation links for Home, About, and Contact
```

**Adding features:**
```
Add a contact form with validation using react-hook-form and zod
```

**Code review:**
```
Review the code in src/app/page.tsx for best practices and performance
```

**Bug fixes:**
```
There's an error in the UserProfile component where the avatar isn't loading properly
```

## 4. Git Setup

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

## 5. GitLab Setup

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

## 6. Connect Local Repository to GitLab

### Add Remote Repository

```bash
# Using SSH (recommended)
git remote add origin git@gitlab.com:username/my-nextjs-app.git

# Or using HTTPS
git remote add origin https://gitlab.com/username/my-nextjs-app.git

# Verify remote
git remote -v
```

## 7. Commit and Push Code

### Initial Commit

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Next.js project setup

🤖 Generated with [Claude Code](https://claude.com/claude-code)

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

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to remote
git push
```

### Using Claude for Git Operations

You can ask Claude to help with git operations:

```
Create a commit with all my changes with a descriptive message
```

```
Create a new branch called feature/user-authentication and switch to it
```

## 8. Development Workflow

### Recommended Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Work with Claude CLI**
   - Open a new terminal
   - Run `claude` in your project directory
   - Ask Claude to implement features, fix bugs, or refactor code

3. **Test Changes**
   - Review Claude's changes in your editor
   - Test in browser (http://localhost:3000)
   - Run tests: `npm test`

4. **Commit Changes**
   - Ask Claude: "Create a commit with these changes"
   - Or manually: `git add . && git commit -m "message"`

5. **Push to GitLab**
   ```bash
   git push
   ```

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/new-feature

# Work on feature with Claude
# Commit changes

# Push feature branch
git push -u origin feature/new-feature

# Create merge request on GitLab
```

## 9. GitLab CI/CD (Optional)

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

## 10. Best Practices

### With Claude CLI

- Be specific in your requests
- Ask Claude to explain code before making changes
- Review all changes before committing
- Use Claude for code reviews: "Review this component for best practices"

### Git Commits

- Make small, focused commits
- Write clear commit messages
- Commit frequently
- Don't commit sensitive data (.env files)

### Next.js Development

- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Optimize images with next/image
- Use environment variables for configuration
- Keep components small and focused

## 11. Common Commands Reference

### Claude CLI
```bash
claude                  # Start Claude
/help                   # Get help
/clear                  # Clear conversation
/tasks                  # View background tasks
```

### Next.js
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
```

### Git
```bash
git status             # Check status
git add .              # Stage all changes
git commit -m "msg"    # Commit changes
git push               # Push to remote
git pull               # Pull from remote
git checkout -b name   # Create new branch
git branch             # List branches
```

## 12. Troubleshooting

### Claude CLI Issues
- Ensure you're authenticated: restart `claude` and follow prompts
- Check internet connection
- Update CLI: `npm update -g @anthropic-ai/claude-code`

### Git Push Issues
- Verify remote URL: `git remote -v`
- Check authentication (SSH key or access token)
- Pull before push if behind: `git pull --rebase`

### Next.js Issues
- Clear cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Claude CLI Documentation](https://github.com/anthropics/claude-code)
- [GitLab Documentation](https://docs.gitlab.com)
- [Git Documentation](https://git-scm.com/doc)

---

**Happy coding with Claude and Next.js!**
