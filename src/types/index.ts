export type TransactionType = 'Purchase' | 'Refinance' | '';

export interface MortgageFormInputs {
  transactionType: TransactionType;

  // Purchase specific inputs
  purchasePrice: string;
  downPaymentPercentage: string; // e.g., "20", "10", "5", "3.5"
  propertyTaxPerMonth: string; // Estimated monthly property tax for purchase
  homeownersInsurancePerMonth: string; // Estimated monthly homeowners insurance for purchase

  // Refinance specific inputs
  loanBalance: string;
  estimatedPropertyValue: string;
  annualPropertyTaxEst: string; // Estimated annual property tax for refinance
  annualHomeInsuranceEst: string; // Estimated annual home insurance for refinance

  // Common inputs
  interestRate: string; // Annual interest rate
  county: string;
  hoaDues: string; // Monthly HOA Dues

  // Other fields included in the form state (e.g., from defaultInitialValues),
  // potentially for future features, internal calculations, or legacy reasons.
  creditScore: string;
  mortgageInsurance: string; // Placeholder for mortgage insurance details/type
  pmiPerMonth: string;       // Placeholder for PMI amount per month

  // These fields are in defaultInitialValues but their direct usage as form inputs might be limited
  // or they might be legacy. Review for cleanup if not actively used.
  propertyTaxAmount: string;     // Potentially another way to input property tax
  homeInsuranceAmount: string;   // Potentially another way to input home insurance

  // These fields are named like calculated outputs but are present as strings in defaultInitialValues.
  // Their presence in form input state should be reviewed.
  // Actual calculated numerical values are typically part of MortgageBreakdown.
  principalInterest: string;
  propertyTaxes: string;
  homeInsurance: string;
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