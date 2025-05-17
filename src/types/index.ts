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