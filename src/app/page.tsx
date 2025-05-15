"use client"; // Required for useState and event handlers

import React, { useState } from 'react';
import MortgageForm from '@/components/MortgageForm';
import BreakdownDisplay from '@/components/BreakdownDisplay';
import { MortgageFormInputs, MortgageBreakdown } from '@/types';

const initialFormValues: MortgageFormInputs = {
  mortgageInsurance: '',
  principalInterest: '',
  propertyTaxes: '', // This field was in original type, but not used in new form. Keeping for type consistency.
  homeInsurance: '', // ditto
  hoaFees: '',
  creditScore: '',
  propertyTaxPerMonth: '',
  homeownersInsurancePerMonth: '',
  pmiPerMonth: '',
};

export default function Home() {
  const [breakdownData, setBreakdownData] = useState<MortgageBreakdown | null>(null);

  const handleFormUpdate = (values: MortgageFormInputs) => {
    const principalInterest = parseFloat(values.principalInterest) || 0;
    const propertyTaxes = parseFloat(values.propertyTaxPerMonth) || 0;
    const homeInsurance = parseFloat(values.homeownersInsurancePerMonth) || 0;
    
    // Other values from the form, can be included if the breakdown logic expands
    const mortgageInsurance = parseFloat(values.mortgageInsurance) || 0;
    const hoaFees = parseFloat(values.hoaFees) || 0;
    const pmi = parseFloat(values.pmiPerMonth) || 0;

    // For this example, totalMonthlyPayment is the sum of the three main components displayed
    // More complex calculations would go here in a real scenario
    const totalMonthlyPayment = principalInterest + propertyTaxes + homeInsurance;

    const newBreakdown: MortgageBreakdown = {
      totalMonthlyPayment,
      breakdown: {
        principalAndInterest: principalInterest,
        propertyTaxes,
        homeInsurance,
        // Optionally include these if they are part of the model, even if not primary display
        mortgageInsurance, 
        hoaFees,
        pmi,
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
