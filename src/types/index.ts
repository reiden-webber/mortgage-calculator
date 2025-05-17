export type TransactionType = 'Purchase' | 'Refinance' | '';

export interface MortgageFormInputs {
  transactionType: TransactionType;

  // Purchase specific inputs
  purchasePrice: string;
  downPaymentPercentage: string; // e.g., "20", "10", "5", "3.5"

  // Refinance specific inputs
  loanBalance: string;
  estimatedPropertyValue: string;

  // Common inputs
  interestRate: string; // Annual interest rate
  county: string;
  hoaDues: string; // Monthly HOA Dues
}

// Define a new type for the data passed to BreakdownDisplay
export interface FormCalculatedData {
  principalAndInterest: number;
  propertyTaxes: number;
  homeInsurance: number;
  hoaFees: number;
}

export interface MortgageBreakdown {
  totalMonthlyPayment: number;
  breakdown: {
    principalAndInterest: number;
    propertyTaxes: number;
    homeInsurance: number;
    // Optional: include others if needed for a more detailed internal model
    mortgageInsurance?: number;
    hoaFees?: number; // Add HOA to the breakdown model
    pmi?: number;
  };
}

export interface PieChartData {
  labels: string[];
  values: number[];
}