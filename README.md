# 🧪 SauceDemo Playwright Test Automation Framework  

This repository contains an **end-to-end UI automation framework** for the [SauceDemo](https://www.saucedemo.com/) web application.  
It is built using **Playwright + TypeScript** with a clean **Page Object Model (POM)** structure.  

The framework is designed to:  
- Automate **critical user flows**: Login, Cart, Checkout, Logout.  
- Support **manual execution** with a traditional test plan.  
- Provide **scalable, data-driven automation** using JSON test data.  

---

## 📂 Project Structure 
```
├── pages/ # Page Object Models
│ ├── LoginPage.ts
│ ├── InventoryPage.ts
│ ├── CartPage.ts
│ ├── CheckoutInfoPage.ts
│ ├── CheckoutOverviewPage.ts
│ ├── CheckoutCompletePage.ts
│ └── MenuPage.ts
│
├── tests/
│ ├── e2e/ # End-to-end happy path flows
│ │ └── checkout-flow.spec.ts
│ └── features/ # Feature-based test suites
│ ├── login.spec.ts
│ ├── inventory.spec.ts
│ ├── cart.spec.ts
│ ├── checkout-info.spec.ts
│ ├── checkout-overview.spec.ts
│ ├── checkout-complete.spec.ts
│ └── menu.spec.ts
│
├── test-data/ # Externalized test data
│ ├── users.json
│ ├── products.json
│ └── checkout.json
│
├── docs/
│ └── SauceDemo_TestPlan.pdf # Traditional test plan & cases
│
├── playwright.config.ts # Playwright configuration
├── tsconfig.json # TypeScript configuration
├── package.json
└── README.md
```
---

## 🚀 Getting Started  

### 1️⃣ Install dependencies  

```bash
npm install

### 2️⃣ Run all tests
npx playwright test
npx playwright show-report



