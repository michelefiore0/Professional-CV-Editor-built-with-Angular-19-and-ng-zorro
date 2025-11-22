# Contributing to CV Editor Angular

## 🚀 Development Workflow

### Commit Convention
Usa **Conventional Commits** per versioning automatico:

```bash
# Features
feat: add new CV template
feat(editor): implement photo upload

# Bug fixes  
fix: resolve PDF export issue
fix(templates): correct responsive layout

# Documentation
docs: update README with new features

# Refactoring
refactor: optimize template service

# Performance
perf: improve PDF generation speed

# Tests
test: add unit tests for editor component
```

### Branch Strategy
- **master**: Production-ready code
- **develop**: Development branch
- **feature/**: New features (`feature/new-template`)
- **fix/**: Bug fixes (`fix/pdf-export`)
- **hotfix/**: Critical fixes (`hotfix/security-patch`)

### Development Setup
```bash
# Clone and setup
git clone <repo-url>
cd cv-editor-angular
npm install

# Start development
npm start

# Run tests
npm test

# Lint code
npm run lint

# Commit with conventional format
npm run commit
```

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes with conventional commits
3. Run tests and linting
4. Create PR to `develop`
5. After review, merge to `develop`
6. Release from `develop` to `master`

### Versioning
- **patch**: Bug fixes (1.0.1)
- **minor**: New features (1.1.0) 
- **major**: Breaking changes (2.0.0)

Automatic versioning via semantic-release on master push.