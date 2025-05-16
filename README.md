# My Mortgage Calculator App

## Overview
This project is a mortgage calculator application built with Next.js. It allows users to input various mortgage-related data and provides a breakdown of their mortgage payments, including a dynamic pie chart for visual representation.

## Features
- Input forms for:
  - Mortgage insurance
  - Principal & interest
  - Property taxes
  - Home insurance
  - HOA fees
  - Credit score
  - Property tax per month
  - Homeowner's insurance per month
  - PMI per month
- Dynamic pie chart displaying the breakdown of the mortgage payments.
- Responsive design using Tailwind CSS.

## Project Structure
```
mortgage-calculator
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── MortgageForm.tsx
│   │   ├── PieChart.tsx
│   │   └── BreakdownDisplay.tsx
│   ├── lib
│   │   └── mortgageUtils.ts
│   └── types
│       └── index.ts
├── public
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-mortgage-calculator-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To run the application in development mode, use:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.