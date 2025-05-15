export interface MortgageFormInputs {
  mortgageInsurance: string; // Keep as string for form handling, convert to number later
  principalInterest: string;
  propertyTaxes: string;
  homeInsurance: string;
  hoaFees: string;
  creditScore: string;
  propertyTaxPerMonth: string;
  homeownersInsurancePerMonth: string;
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
    hoaFees?: number;
    pmi?: number;
  };
}

export interface PieChartData {
  labels: string[];
  values: number[];
}