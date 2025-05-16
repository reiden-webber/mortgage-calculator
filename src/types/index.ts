export type TransactionType = 'Purchase' | 'Refinance' | '';

export interface MortgageFormInputs {
  transactionType: TransactionType;
  purchasePrice: string;
  downPaymentPercentage: string; // e.g., "20", "10", "5", "3.5"
  interestRate: string; // Annual interest rate
  county: string;
  hoaDues: string; // Monthly HOA Dues
  propertyTaxAmount: string; // User-defined monthly property tax
  homeInsuranceAmount: string; // User-defined monthly home insurance

  // Retaining old fields for completeness, though they might not be directly used in the new form logic
  // or could be removed if strictly adhering to the new field list.
  // For now, keeping them to avoid breaking existing references if any, but they are not primary.
  mortgageInsurance: string;
  principalInterest: string; // This will be calculated, not a direct input anymore
  propertyTaxes: string; // This is now covered by propertyTaxAmount
  homeInsurance: string; // This is now covered by homeInsuranceAmount
  creditScore: string;
  propertyTaxPerMonth: string; // Covered by propertyTaxAmount
  homeownersInsurancePerMonth: string; // Covered by homeInsuranceAmount
  pmiPerMonth: string;
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