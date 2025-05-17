"use client";

import React, { useState } from 'react';
import MortgageForm from '@/components/MortgageForm';
import BreakdownDisplay from '@/components/BreakdownDisplay';
import { MortgageFormInputs, MortgageBreakdown } from '@/types';

const initialFormValues: MortgageFormInputs = {
  transactionType: 'Purchase',

  // Fields for purchase
  purchasePrice: '',
  downPaymentPercentage: '20%',
  interestRate: '6.875',  // TODO: User wants to conviently change the interestRate
  county: 'Los Angeles County',
  hoaDues: '',
  propertyTaxPerMonth: '',
  homeownersInsurancePerMonth: '',

  // Fields for refinance
  loanBalance: '300000',
  estimatedPropertyValue: '550000',
  annualPropertyTaxEst: '6250',
  annualHomeInsuranceEst: '1200',
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
        // PrincipalAndInterest = P * (r(1+r)^n) / ((1+r)^n - 1)
        // where P = principal, r = monthly interest rate, n = number of payments
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
        calculatedPrincipalAndInterest = 
          loanAmount * (monthlyInterestRate * factor) / (factor - 1);
      }
    }
    
    // Ensure calculated P&I is a non-negative finite number
    calculatedPrincipalAndInterest = 
      Math.max(0, isFinite(calculatedPrincipalAndInterest) ? 
      calculatedPrincipalAndInterest : 0);

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
