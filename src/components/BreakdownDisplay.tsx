import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';

interface FormCalculatedData {
  principalAndInterest: number;
  propertyTaxes: number;
  homeInsurance: number;
  hoaFees?: number; // Keep hoaFees optional
}

interface BreakdownDisplayProps {
  formCalculatedData: FormCalculatedData | null;
}

const BreakdownDisplay: React.FC<BreakdownDisplayProps> = ({ formCalculatedData }) => {
  const [propertyTaxInput, setPropertyTaxInput] = useState<string>('0');
  const [homeInsuranceInput, setHomeInsuranceInput] = useState<string>('0');

  useEffect(() => {
    if (formCalculatedData) {
      setPropertyTaxInput(formCalculatedData.propertyTaxes.toFixed(2));
      setHomeInsuranceInput(formCalculatedData.homeInsurance.toFixed(2));
    } else {
      // Reset tax and insurance inputs when form data is cleared.
      setPropertyTaxInput('0');
      setHomeInsuranceInput('0');
    }
  }, [formCalculatedData]);

  if (!formCalculatedData) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Monthly payment breakdown</h2>
        <p className="text-gray-500">Submit the form to complete the mortgage calculation.</p>
      </div>
    );
  }

  const { principalAndInterest, hoaFees = 0 } = formCalculatedData;
  const currentPropertyTaxes = parseFloat(propertyTaxInput) || 0;
  const currentHomeInsurance = parseFloat(homeInsuranceInput) || 0;

  const totalMonthlyPayment = principalAndInterest + currentPropertyTaxes + currentHomeInsurance + hoaFees;

  const pieChartLabels: string[] = ['Principal & Interest'];
  const pieChartValues: number[] = [principalAndInterest];

  if (currentPropertyTaxes > 0) {
    pieChartLabels.push('Property Tax');
    pieChartValues.push(currentPropertyTaxes);
  }
  if (currentHomeInsurance > 0) {
    pieChartLabels.push("Homeowner's Insurance");
    pieChartValues.push(currentHomeInsurance);
  }
  if (hoaFees > 0) {
    pieChartLabels.push('HOA Dues');
    pieChartValues.push(hoaFees);
  }
  
  // Ensure at least one segment if all are zero, to prevent pie chart errors
  // if (pieChartValues.length > 0 && pieChartValues.every(v => v === 0)) {
  //    pieChartLabels.push('N/A');
  //    pieChartValues.push(1); // Add a dummy value if all are zero
  // }


  const pieChartData = {
    labels: pieChartLabels,
    values: pieChartValues,
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-1 text-gray-800">Monthly payment breakdown</h2>
      <p className="text-sm text-gray-500 mb-6">Adjust tax and insurance below by clicking on the values.</p>
      
      {/* Removed separate input fields for property tax and home insurance */}

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
          <span className="font-medium text-gray-800">{formatCurrency(principalAndInterest)}</span>
        </li>
        {/* Property Tax made editable to match image */}
        <li className="flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-500 mr-3"></span>
            <label htmlFor="propertyTaxListItemInput" className="text-gray-700 cursor-pointer">Estimated Property tax</label>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">+</span>
            <div className="flex items-center border border-gray-300 rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <span className="pl-2 pr-1 text-gray-500">$</span>
              <input
                type="text"
                id="propertyTaxListItemInput"
                name="propertyTaxListItemInput"
                value={propertyTaxInput}
                onChange={(e) => {
                  const val = e.target.value;
                  // Allow only numbers and at most one decimal point, or empty string
                  if (/^\d*\.?\d*$/.test(val) || val === '') {
                    setPropertyTaxInput(val);
                  }
                }}
                className="font-medium text-gray-800 py-1 pr-2 w-20 text-right bg-transparent focus:outline-none appearance-none"
                placeholder="0"
              />
            </div>
          </div>
        </li>
        {/* Homeowner's Insurance made editable to match image */}
        <li className={`flex justify-between items-center py-2 ${hoaFees > 0 || currentPropertyTaxes > 0 ? 'border-b border-gray-200' : ''}`}>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-purple-500 mr-3"></span>
            <label htmlFor="homeInsuranceListItemInput" className="text-gray-700 cursor-pointer">Homeowner&#39;s insurance</label>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">+</span>
            <div className="flex items-center border border-gray-300 rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <span className="pl-2 pr-1 text-gray-500">$</span>
              <input
                type="text"
                id="homeInsuranceListItemInput"
                name="homeInsuranceListItemInput"
                value={homeInsuranceInput}
                onChange={(e) => {
                  const val = e.target.value;
                  // Allow only numbers and at most one decimal point, or empty string
                  if (/^\d*\.?\d*$/.test(val) || val === '') {
                    setHomeInsuranceInput(val);
                  }
                }}
                className="font-medium text-gray-800 py-1 pr-2 w-20 text-right bg-transparent focus:outline-none appearance-none"
                placeholder="0"
              />
            </div>
          </div>
        </li>
        {hoaFees > 0 && (
          <li className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-amber-500 mr-3"></span>
              <span className="text-gray-700">HOA Dues</span>
            </div>
            <span className="font-medium text-gray-800">{formatCurrency(hoaFees)}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default BreakdownDisplay;