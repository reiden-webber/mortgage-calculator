"use client"; // Required for useState and event handlers

import React, { useState } from 'react';
import MortgageForm from '@/components/MortgageForm';
import BreakdownDisplay from '@/components/BreakdownDisplay';
import { MortgageFormInputs, MortgageBreakdown } from '@/types';

const initialFormValues: MortgageFormInputs = {
  transactionType: 'Purchase',
  purchasePrice: '500000', // Example value
  downPaymentPercentage: '20%',
  interestRate: '6.875', // Example interest rate
  county: 'Los Angeles County',
  hoaDues: '0', // Example HOA dues
  propertyTaxPerMonth: '520', // Example property tax (approx 1.25% of 500k / 12)
  homeownersInsurancePerMonth: '100', // Example home insurance

  // Fields for refinance
  loanBalance: '300000', // Example value
  estimatedPropertyValue: '550000', // Example value
  annualPropertyTaxEst: '6250', // Example value (approx 1.25% of 500k)
  annualHomeInsuranceEst: '1200', // Example value

  // The following fields might be part of a broader MortgageFormInputs type definition.
  // Provide empty strings or default values if they are required by the type,
  // even if not directly used by the 'Purchase' form's primary calculation path.
  mortgageInsurance: '', 
  principalInterest: '', // This will be calculated, not taken from form input directly for P&I calculation
  propertyTaxes: '',     // Corresponds to propertyTaxPerMonth for input
  homeInsurance: '',     // Corresponds to homeownersInsurancePerMonth for input
  creditScore: '',
  pmiPerMonth: '',
  propertyTaxAmount: '', // Potentially redundant with propertyTaxPerMonth
  homeInsuranceAmount: '', // Potentially redundant with homeownersInsurancePerMonth
};

export default function Home() {
  const [breakdownData, setBreakdownData] = useState<MortgageBreakdown | null>(null);

  const handleFormUpdate = (values: MortgageFormInputs) => {
    const annualInterestRate = parseFloat(values.interestRate) || 0;
    const hoaFeesMonthly = parseFloat(values.hoaDues) || 0;
    const loanTermYears = 30;
    const numberOfPayments = loanTermYears * 12;

    let loanAmount = 0;
    let propertyTaxesMonthly = 0;
    let homeInsuranceMonthly = 0;

    if (values.transactionType === 'Purchase') {
      const purchasePrice = parseFloat(values.purchasePrice) || 0;
      const downPaymentPercent = parseFloat(values.downPaymentPercentage.replace('%', '')) || 0;
      const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
      loanAmount = purchasePrice - downPaymentAmount;
      propertyTaxesMonthly = parseFloat(values.propertyTaxPerMonth) || 0;
      homeInsuranceMonthly = parseFloat(values.homeownersInsurancePerMonth) || 0;
    } else { // Refinance
      loanAmount = parseFloat(values.loanBalance) || 0;
      const annualPropertyTax = parseFloat(values.annualPropertyTaxEst) || 0;
      const annualHomeInsurance = parseFloat(values.annualHomeInsuranceEst) || 0;
      propertyTaxesMonthly = annualPropertyTax > 0 ? annualPropertyTax / 12 : 0;
      homeInsuranceMonthly = annualHomeInsurance > 0 ? annualHomeInsurance / 12 : 0;
    }
    
    let calculatedPrincipalAndInterest = 0;

    if (loanAmount > 0 && numberOfPayments > 0) {
      if (annualInterestRate === 0) {
        calculatedPrincipalAndInterest = loanAmount / numberOfPayments;
      } else {
        // P * (r(1+r)^n) / ((1+r)^n - 1)
        // where P = principal, r = monthly interest rate, n = number of payments
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
        calculatedPrincipalAndInterest = 
          loanAmount * (monthlyInterestRate * factor) / (factor - 1);
      }
    }
    
    // Ensure calculated P&I is a non-negative finite number
    calculatedPrincipalAndInterest = Math.max(0, isFinite(calculatedPrincipalAndInterest) ? calculatedPrincipalAndInterest : 0);

    // Total monthly payment for the pie chart (P&I + Tax + Insurance + HOA)
    let totalMonthlyPaymentForPieChart = 
      calculatedPrincipalAndInterest + 
      propertyTaxesMonthly + 
      homeInsuranceMonthly;

    if (hoaFeesMonthly > 0) {
      totalMonthlyPaymentForPieChart += hoaFeesMonthly;
    }

    const newBreakdown: MortgageBreakdown = {
      totalMonthlyPayment: totalMonthlyPaymentForPieChart,
      breakdown: {
        principalAndInterest: calculatedPrincipalAndInterest,
        propertyTaxes: propertyTaxesMonthly,
        homeInsurance: homeInsuranceMonthly,
        hoaFees: hoaFeesMonthly, 
        // mortgageInsurance and pmi can be added here if calculated/provided
      },
    };
    setBreakdownData(newBreakdown);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Mortgage Calculator</h1>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          <MortgageForm initialValues={initialFormValues} onSubmit={handleFormUpdate} />
        </div>
        <div className="md:col-span-1">
          <BreakdownDisplay data={breakdownData} />
        </div>
      </main>
      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Mortgage Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
}
