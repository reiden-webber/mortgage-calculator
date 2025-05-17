import React from 'react';
import PieChart from './PieChart';
import { MortgageBreakdown } from '@/types';

interface BreakdownDisplayProps {
  data: MortgageBreakdown | null;
}

const BreakdownDisplay: React.FC<BreakdownDisplayProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Monthly payment breakdown</h2>
        <p className="text-gray-500">Enter values in the form to see the breakdown.</p>
      </div>
    );
  }

  const { totalMonthlyPayment, breakdown } = data;

  const pieChartData = {
    labels: ['Principal & Interest', 'Property Tax', "Homeowner's Insurance"],
    values: [
      breakdown.principalAndInterest,
      breakdown.propertyTaxes,
      breakdown.homeInsurance,
    ],
  };

  // Helper to format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-1 text-gray-800">Monthly payment breakdown</h2>
      <p className="text-sm text-gray-500 mb-6">Based on provided values</p>
      
      <div className="relative mx-auto mb-6 w-48 h-48 sm:w-56 sm:h-56">
        <PieChart data={pieChartData} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl sm:text-3xl font-bold text-gray-700">
            {formatCurrency(totalMonthlyPayment)}
          </span>
          <span className="text-xs text-gray-500">/mo</span>
        </div>
      </div>

      <ul className="space-y-3">
        <li className="flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-blue-500 mr-3"></span>
            <span className="text-gray-700">Principal & interest</span>
          </div>
          <span className="font-medium text-gray-800">{formatCurrency(breakdown.principalAndInterest)}</span>
        </li>
        <li className="flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-500 mr-3"></span>
            <span className="text-gray-700">Estimated Property tax</span>
          </div>
          <span className="font-medium text-gray-800">{formatCurrency(breakdown.propertyTaxes)}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-purple-500 mr-3"></span>
            <span className="text-gray-700">Homeowner&#39;s insurance</span>
          </div>
          <span className="font-medium text-gray-800">{formatCurrency(breakdown.homeInsurance)}</span>
        </li>
      </ul>
    </div>
  );
};

export default BreakdownDisplay;