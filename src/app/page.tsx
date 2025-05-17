"use client";

import React, { useState } from 'react';
import MortgageForm from '@/components/MortgageForm';
import BreakdownDisplay from '@/components/BreakdownDisplay';
import { FormCalculatedData, MortgageFormInputs } from '@/types';

const initialFormValues: MortgageFormInputs = {
  transactionType: 'Purchase',

  // Fields for purchase
  purchasePrice: '550000',
  downPaymentPercentage: '20%',
  interestRate: '6.875',
  county: 'Los Angeles County',
  hoaDues: '',

  // Fields for refinance
  loanBalance: '300000',
  estimatedPropertyValue: '550000',
};

const countyTaxPercentages = new Map<string, number>([
    ["Los Angeles County", 1.25],
    ["Orange County", 1.2],
    ["San Bernadino County", 1.1],
    ["Riverside County", 1.15],
    ["San Diego County", 1.2],
    ["Ventura County", 1.3]
  ])


export default function Home() {
  const [breakdownData, setBreakdownData] = useState<FormCalculatedData | null>(null);

  const handleFormUpdate = (values: MortgageFormInputs) => {
    const annualInterestRate = parseFloat(values.interestRate) || 0;
    const hoaFees = parseFloat(values.hoaDues) || 0;
    const loanTermYears = 30;
    const numberOfPayments = loanTermYears * 12;

    let loanAmount = 0;
    // Property tax and home insurance are no longer calculated here

    if (values.transactionType === 'Purchase') {
      const purchasePrice = parseFloat(values.purchasePrice) || 0;
      const downPaymentPercent = parseFloat(values.downPaymentPercentage.replace('%', '')) || 0;
      const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
      loanAmount = purchasePrice - downPaymentAmount;
      // propertyTaxesMonthly and homeInsuranceMonthly removed
    } else { // Refinance
      loanAmount = parseFloat(values.loanBalance) || 0;
      // annualPropertyTax, annualHomeInsurance, propertyTaxesMonthly, homeInsuranceMonthly removed
    }
    
    let calculatedPrincipalAndInterest = 0;

    if (loanAmount > 0 && numberOfPayments > 0) {
      if (annualInterestRate === 0) {
        calculatedPrincipalAndInterest = loanAmount / numberOfPayments;
      } else {
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
        calculatedPrincipalAndInterest = 
          loanAmount * (monthlyInterestRate * factor) / (factor - 1);
      }
    }
    
    calculatedPrincipalAndInterest = 
      Math.max(0, isFinite(calculatedPrincipalAndInterest) ? 
      calculatedPrincipalAndInterest : 0);

    const propertyTaxRate = countyTaxPercentages.get(values.county) || 1.25;
    const propertyTaxMonthly = (parseFloat(values.purchasePrice) || 0) * (propertyTaxRate / 100) / 12;
    const homeInsuranceMonthly = (parseFloat(values.purchasePrice) || 0) * (0.002 / 12); //Example rate

    const newCalculationResult: FormCalculatedData = {
      principalAndInterest: calculatedPrincipalAndInterest,
      propertyTaxes: propertyTaxMonthly,
      homeInsurance: homeInsuranceMonthly,
      hoaFees: hoaFees,
    };
    setBreakdownData(newCalculationResult);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Mortgage Calculator</h1>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          <MortgageForm initialValues={initialFormValues as Partial<MortgageFormInputs>} onSubmit={handleFormUpdate} />
        </div>
        <div className="md:col-span-1">
          <BreakdownDisplay formCalculatedData={breakdownData} />
        </div>
      </main>
      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Mortgage Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
}
