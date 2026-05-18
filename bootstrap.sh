#!/usr/bin/env bash

# =============================================================================
# bootstrap.sh
# QA Automation Portfolio — Project Structure Setup
#
# Usage:
#   ./bootstrap.sh
#
# Safe to rerun — uses mkdir -p which never overwrites existing folders.
# Add new folders here and rerun to update the structure.
# =============================================================================

set -e

echo ""
echo "=============================================="
echo " QA Automation Portfolio — Bootstrap"
echo "=============================================="
echo ""

# ------------------------------------------------------------------------------
# Source layer — application code
# ------------------------------------------------------------------------------

echo "Creating src/ folders..."

mkdir -p src/config
mkdir -p src/pages/base
mkdir -p src/pages/sauceDemo
mkdir -p src/pages/theInternet
mkdir -p src/pages/restfulBooker
mkdir -p src/api/base
mkdir -p src/api/clients
mkdir -p src/api/handlers
mkdir -p src/api/schemas
mkdir -p src/ai
mkdir -p src/factories
mkdir -p src/builders
mkdir -p src/strategies
mkdir -p src/fixtures
mkdir -p src/db/repositories
mkdir -p src/db/migrations
mkdir -p src/db/seed
mkdir -p src/models
mkdir -p src/utils
mkdir -p src/reporting

echo "  src/ folders created"

# ------------------------------------------------------------------------------
# Test layer — all test specs
# ------------------------------------------------------------------------------

echo "Creating tests/ folders..."

mkdir -p tests/ui/sauceDemo
mkdir -p tests/ui/theInternet
mkdir -p tests/ui/restfulBooker
mkdir -p tests/api/reqres
mkdir -p tests/api/restfulBooker
mkdir -p tests/api/security
mkdir -p tests/api/graphql
mkdir -p tests/db
mkdir -p tests/accessibility
mkdir -p tests/performance

echo "  tests/ folders created"

# ------------------------------------------------------------------------------
# BDD layer — Gherkin feature files
# ------------------------------------------------------------------------------

echo "Creating features/ folders..."

mkdir -p features/ui/sauceDemo
mkdir -p features/ui/theInternet
mkdir -p features/ui/restfulBooker
mkdir -p features/api/reqres
mkdir -p features/api/restfulBooker
mkdir -p features/api/graphql

echo "  features/ folders created"

# ------------------------------------------------------------------------------
# BDD layer — Cucumber step definitions
# ------------------------------------------------------------------------------

echo "Creating step-definitions/ folders..."

mkdir -p step-definitions/ui
mkdir -p step-definitions/api

echo "  step-definitions/ folders created"

# ------------------------------------------------------------------------------
# Postman collections and environments
# ------------------------------------------------------------------------------

echo "Creating postman/ folders..."

mkdir -p postman/collections
mkdir -p postman/environments

echo "  postman/ folders created"

# ------------------------------------------------------------------------------
# Reports — generated output, git ignored
# ------------------------------------------------------------------------------

echo "Creating reports/ folders..."

mkdir -p reports/allure-results
mkdir -p reports/allure-report
mkdir -p reports/playwright-html
mkdir -p reports/newman

echo "  reports/ folders created"

# ------------------------------------------------------------------------------
# Database — git ignored
# ------------------------------------------------------------------------------

echo "Creating data/ folder..."

mkdir -p data

echo "  data/ folder created"

# ------------------------------------------------------------------------------
# Documentation
# ------------------------------------------------------------------------------

echo "Creating docs/ folders..."

mkdir -p docs/design/diagrams
mkdir -p docs/qa-lifecycle
mkdir -p docs/adr
mkdir -p docs/usability
mkdir -p docs/ai-integration
mkdir -p docs/sql-learning

echo "  docs/ folders created"

# ------------------------------------------------------------------------------
# GitHub workflows
# ------------------------------------------------------------------------------

echo "Creating .github/ folders..."

mkdir -p .github/workflows

echo "  .github/ folders created"

# ------------------------------------------------------------------------------
# Add .gitkeep to every empty folder so Git tracks them
# ------------------------------------------------------------------------------

echo ""
echo "Adding .gitkeep files to empty folders..."

find . -type d \
  -not -path '*/node_modules/*' \
  -not -path '*/.git/*' \
  -not -path '*/dist/*' \
  -empty \
  -exec touch {}/.gitkeep \;

echo "  .gitkeep files added"

# ------------------------------------------------------------------------------
# Done
# ------------------------------------------------------------------------------

echo ""
echo "=============================================="
echo " Bootstrap complete"
echo ""
echo " Folders created — safe to rerun at any time"
echo " To add new folders:"
echo "   1. Add mkdir -p lines to bootstrap.sh"
echo "   2. Run ./bootstrap.sh again"
echo "   3. Commit the changes"
echo "=============================================="
echo ""