# Git & Version Control Best Practices

**Last Updated:** February 2026
**Status:** Enforced for all contributors

---

## 1. Atomic Commits

Every commit must do **one thing** only.

### Rules:
- ❌ **DO NOT** mix refactoring with feature work
- ❌ **DO NOT** mix styling changes with logic changes
- ❌ **DO NOT** combine multiple unrelated fixes in one commit
- ✅ **DO** break large tasks into logical sub-commits

### Example:
**Bad:**
```bash
git commit -m "feat: add user dashboard, fix login bug, update README"
```

**Good:**
```bash
git commit -m "feat: add user dashboard UI components"
git commit -m "fix: resolve login redirect issue"
git commit -m "docs: update README with dashboard usage"
```

### Multi-Step Features:
If a task is large, break it into logical sub-commits:

```bash
git commit -m "feat(db): add user_preferences schema"
git commit -m "feat(api): implement preferences repository layer"
git commit -m "feat(ui): add preferences settings page"
```

---

## 2. Conventional Commits Standard

All commit messages **must** follow the Conventional Commits format:

### Format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types:

| Type | Description | Example |
|------|-------------|---------|
| **feat** | A new feature | `feat(auth): add Apple Sign-in` |
| **fix** | A bug fix | `fix(db): resolve postgres connection leak` |
| **docs** | Documentation only | `docs: update API reference` |
| **style** | Formatting, white-space | `style: fix indentation in Header.tsx` |
| **refactor** | Code restructuring | `refactor(api): simplify error handling` |
| **perf** | Performance improvement | `perf: optimize image loading` |
| **test** | Add/update tests | `test: add unit tests for auth service` |
| **build** | Build system changes | `build: update webpack config` |
| **ci** | CI/CD changes | `ci: add GitHub Actions workflow` |
| **chore** | Maintenance tasks | `chore: update dependencies` |
| **revert** | Revert previous commit | `revert: feat(auth): add Apple Sign-in` |

### Scope (Optional but Recommended):
Indicates the affected component or module:
- `feat(auth): ...`
- `fix(payment): ...`
- `perf(images): ...`
- `docs(api): ...`

---

## 3. The "Imperative" Rule

### Write commit messages in the imperative mood:

✅ **Correct:**
```bash
"Add feature"
"Fix bug"
"Update documentation"
"Refactor database layer"
```

❌ **Incorrect:**
```bash
"Added feature"      # Past tense
"Adds feature"       # Present tense
"Adding feature"     # Gerund
"Feature added"      # Passive voice
```

### Why?
Commits represent **instructions** to the codebase: "If applied, this commit will **[your subject line]**"

### Subject Line Rules:
- **50 characters or less**
- Capitalize first word
- No period at the end
- Be concise and descriptive

### Examples:
```bash
✅ feat(api): add user authentication endpoint
✅ fix: resolve memory leak in image cache
✅ docs: update deployment guide for Vercel
✅ refactor: simplify product showcase logic

❌ feat(api): added user authentication endpoint (past tense)
❌ fix: resolves memory leak in image cache (present tense)
❌ Updated deployment guide for Vercel. (capitalized wrong, has period)
```

---

## 4. Branching Strategy

### Branch Naming Convention:

```
<type>/<description>
```

### Branch Types:

| Branch | Purpose | Naming Pattern | Example |
|--------|---------|----------------|---------|
| **main** | Production-ready code | `main` | `main` |
| **develop** | Integration branch | `develop` | `develop` |
| **feature/** | New features | `feature/<short-description>` | `feature/user-dashboard` |
| **fix/** | Bug fixes | `fix/<issue-description>` | `fix/login-redirect` |
| **refactor/** | Code refactoring | `refactor/<component>` | `refactor/api-layer` |
| **docs/** | Documentation | `docs/<topic>` | `docs/api-reference` |
| **perf/** | Performance | `perf/<optimization>` | `perf/image-loading` |
| **test/** | Testing | `test/<test-type>` | `test/unit-auth` |

### Examples:
```bash
feature/track-rvu-ui
feature/ios-notification-logic
fix/critical-login-crash
fix/postgres-connection-leak
refactor/authentication-flow
docs/deployment-guide
perf/lazy-load-images
test/integration-payment
```

### Branch Lifecycle:

1. **Create branch from main/develop:**
   ```bash
   git checkout main
   git pull
   git checkout -b feature/new-feature
   ```

2. **Work on branch:**
   ```bash
   git add <files>
   git commit -m "feat: add new feature"
   ```

3. **Keep branch updated:**
   ```bash
   git checkout main
   git pull
   git checkout feature/new-feature
   git merge main
   ```

4. **Create Pull Request**
5. **Merge to main/develop**
6. **Delete branch:**
   ```bash
   git branch -d feature/new-feature
   git push origin --delete feature/new-feature
   ```

---

## 5. Agent-Specific Instructions

When working with AI agents (Claude Code, GitHub Copilot, etc.):

### Pre-Commit Validation:

1. **Build Verification:**
   ```bash
   # Before committing, always build
   npm run build          # Node.js/Next.js
   swift build            # Swift/iOS
   go build              # Go
   cargo build           # Rust
   ```

2. **Test Execution:**
   ```bash
   # Run tests related to modified scope
   npm test              # All tests
   npm test auth         # Specific scope
   pytest tests/auth/    # Python
   ```

3. **Linting:**
   ```bash
   npm run lint          # ESLint
   cargo clippy          # Rust
   golangci-lint run     # Go
   ```

### Database Changes:

If a commit changes the database schema (PostgreSQL, MySQL, etc.):
- **ALWAYS** include a migration file in the same commit
- Migration file naming: `YYYYMMDD_HHMMSS_description.sql`
- Example:
  ```bash
  git add migrations/20260222_143000_add_user_preferences.sql
  git add src/models/user_preferences.ts
  git commit -m "feat(db): add user preferences schema"
  ```

### Multi-File Changes:

When a feature touches multiple files:
- Group related changes logically
- One commit per logical unit
- Example:
  ```bash
  # Commit 1: Data layer
  git add src/models/ src/repositories/
  git commit -m "feat(db): add preferences data layer"

  # Commit 2: Business logic
  git add src/services/
  git commit -m "feat(api): implement preferences service"

  # Commit 3: UI
  git add src/components/ src/pages/
  git commit -m "feat(ui): add preferences settings page"
  ```

---

## 6. Execution & Safety Constraints

### 🚨 CRITICAL RULES FOR AI AGENTS 🚨

#### NO COMMIT:
**You are strictly forbidden from executing `git commit`.**

- ✅ **ALLOWED:** Stage changes using `git add`
- ✅ **ALLOWED:** Check status with `git status`
- ✅ **ALLOWED:** Review diff with `git diff`
- ❌ **FORBIDDEN:** Execute `git commit`
- ❌ **FORBIDDEN:** Execute `git commit -m "..."`
- ❌ **FORBIDDEN:** Execute `git commit --amend`

#### NO PUSH:
**You are strictly forbidden from executing `git push`.**

- ❌ **FORBIDDEN:** Execute `git push`
- ❌ **FORBIDDEN:** Execute `git push origin <branch>`
- ❌ **FORBIDDEN:** Execute `git push --force`

#### Pre-Commit Validation Process:

Instead of committing, **ALWAYS** provide:

1. **Summary of Changes:**
   ```
   Files modified:
   - src/components/Header.tsx (added navigation)
   - src/styles/globals.css (updated header styles)
   - README.md (updated setup instructions)
   ```

2. **Suggested Commit Message:**
   ```
   feat(ui): add navigation to header component

   - Add responsive navigation menu
   - Update header styles for mobile
   - Document setup in README
   ```

3. **Validation Checklist:**
   ```
   ✅ Build passes: npm run build
   ✅ Linting passes: npm run lint
   ✅ Tests pass: npm test
   ✅ Changes are atomic (single feature/fix)
   ✅ Conventional commit format
   ✅ Imperative mood
   ```

4. **Ask for Review:**
   ```
   Please review the staged changes and execute the commit if approved:

   git commit -m "feat(ui): add navigation to header component"
   ```

#### Exception Handling:

**ONLY in these scenarios may the human user override and allow commits:**
- Pair programming sessions with explicit permission
- Automated CI/CD workflows (not interactive sessions)
- Emergency hotfixes with explicit authorization

**Even then, the agent must:**
- Log the commit action
- Provide full context
- Request confirmation before pushing

---

## 7. Pull Request Guidelines

### PR Title Format:
Follow the same Conventional Commits format:
```
feat(auth): Add Apple Sign-in support
fix(db): Resolve connection pool leak
docs: Update API documentation
```

### PR Description Template:
```markdown
## 🎯 Overview
[Brief description of what this PR does]

## 📋 Changes
- Change 1
- Change 2
- Change 3

## 🧪 Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## 📸 Screenshots (if applicable)
[Add screenshots for UI changes]

## ✅ Checklist
- [ ] Code follows project conventions
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No console errors
- [ ] Reviewed own code

## 🔗 Related Issues
Closes #123
```

---

## 8. Common Mistakes to Avoid

### ❌ Bad Practices:

```bash
# Vague commit messages
git commit -m "fix bug"
git commit -m "update files"
git commit -m "changes"

# Mixed concerns
git commit -m "add feature X, fix bug Y, update docs"

# Wrong tense
git commit -m "added feature"
git commit -m "fixes bug"

# Too long subject
git commit -m "feat: add a really long feature description that exceeds 50 characters and is hard to read"

# Missing type
git commit -m "implement user authentication"
```

### ✅ Good Practices:

```bash
# Clear, specific, atomic
git commit -m "feat(auth): add JWT token validation"
git commit -m "fix(api): resolve race condition in cache"
git commit -m "docs: update deployment guide"

# Proper scope and format
git commit -m "refactor(db): simplify query builder"
git commit -m "perf(images): implement lazy loading"
git commit -m "test(auth): add integration tests"
```

---

## 9. Commit Body & Footer (Optional)

For complex changes, use the commit body:

```bash
git commit -m "feat(api): add rate limiting

Implement token bucket algorithm for API rate limiting.
Supports per-user and per-IP limits. Configurable via
environment variables.

Breaking change: API now returns 429 status code when
rate limit exceeded.

Closes #123"
```

### Body Rules:
- Wrap at 72 characters
- Explain **what** and **why**, not **how**
- Reference related issues

### Footer Types:
- `Closes #123` - Closes issue
- `Fixes #456` - Fixes bug
- `Breaking change:` - Breaking API changes
- `Co-Authored-By:` - Multiple authors

---

## 10. Git Workflow Summary

### Daily Workflow:

```bash
# 1. Start work
git checkout main
git pull
git checkout -b feature/new-feature

# 2. Make changes
[edit files]

# 3. Stage changes
git add src/components/NewFeature.tsx
git status

# 4. Get AI agent's suggested commit message
[Agent provides: "feat(ui): add new feature component"]

# 5. Commit (human only)
git commit -m "feat(ui): add new feature component"

# 6. Push
git push -u origin feature/new-feature

# 7. Create PR
gh pr create --title "feat(ui): Add new feature component"

# 8. After merge, clean up
git checkout main
git pull
git branch -d feature/new-feature
```

---

## 11. Enforcement

These rules are **mandatory** for:
- ✅ All human contributors
- ✅ All AI agents (Claude Code, GitHub Copilot, etc.)
- ✅ All automated systems
- ✅ All pull requests

**Violations will result in:**
- PR rejection
- Request for rebase/squash
- Git history cleanup

---

## 12. Quick Reference Card

```bash
# COMMIT FORMAT
<type>(<scope>): <description>

# TYPES
feat, fix, docs, style, refactor, perf, test, build, ci, chore

# BRANCH FORMAT
<type>/<description>

# EXAMPLES
feat(auth): add OAuth2 support
fix(db): resolve connection leak
docs: update API reference
feature/oauth-integration
fix/login-bug
```

---

**Questions?** Review the [Conventional Commits specification](https://www.conventionalcommits.org/)

**Need help?** Check existing commits in the repo for examples:
```bash
git log --oneline --all -20
```

---

**Document Version:** 1.0
**Last Updated:** February 2026
**Enforced By:** All contributors + AI agents
