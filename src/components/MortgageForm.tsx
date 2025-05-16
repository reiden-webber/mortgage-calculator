import React, { useState, useEffect } from 'react';
import { MortgageFormInputs } from '@/types';

interface MortgageFormProps {
  initialValues: Partial<MortgageFormInputs>; // Allow partial initial values
  onSubmit: (values: MortgageFormInputs) => void;
}

const defaultInitialValues: MortgageFormInputs = {
  transactionType: 'Purchase',
  purchasePrice: '',
  downPaymentPercentage: '20%',
  interestRate: '6.875',
  county: 'Los Angeles County',
  hoaDues: '',
  propertyTaxPerMonth: '',
  homeownersInsurancePerMonth: '',
  propertyTaxAmount: '',
  homeInsuranceAmount: '',
  mortgageInsurance: '',
  principalInterest: '',
  propertyTaxes: '',
  homeInsurance: '',
  creditScore: '',
  pmiPerMonth: '',
};

const MortgageForm: React.FC<MortgageFormProps> = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState<MortgageFormInputs>({
    ...defaultInitialValues,
    ...initialValues,
  });

  useEffect(() => {
    setFormData(prevData => ({
      ...defaultInitialValues,
      ...initialValues,
      transactionType: initialValues.transactionType || defaultInitialValues.transactionType,
    }));
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const downPaymentOptions = ["20%", "10%", "5%", "3.5%"];
  const countyOptions = [
    "Los Angeles County",
    "Orange County",
    "San Bernadino County",
    "Riverside County",
    "San Diego County",
    "Ventura County"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-md rounded-lg">
      <div>
        <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 mb-1">
          Are you doing a purchase or refinance?
        </label>
        <select
          name="transactionType"
          id="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        >
          <option value="Purchase">Purchase</option>
          <option value="Refinance">Refinance</option>
        </select>
      </div>

      {formData.transactionType === 'Purchase' && (
        <>
          <div>
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Price ($)
            </label>
            <input
              type="number"
              name="purchasePrice"
              id="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="downPaymentPercentage" className="block text-sm font-medium text-gray-700 mb-1">
              Downpayment
            </label>
            <select
              name="downPaymentPercentage"
              id="downPaymentPercentage"
              value={formData.downPaymentPercentage}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              {downPaymentOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              id="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              step="0.125"
              className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              // placeholder="7.25"
            />
          </div>

          <div>
            <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-1">
              County
            </label>
            <select
              name="county"
              id="county"
              value={formData.county}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              {countyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="hoaDues" className="block text-sm font-medium text-gray-700 mb-1">
              HOA Dues / month ($)
            </label>
            <input
              type="number"
              name="hoaDues"
              id="hoaDues"
              value={formData.hoaDues}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="propertyTaxPerMonth" className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Property Tax / month ($)
            </label>
            <input
              type="number"
              name="propertyTaxPerMonth"
              id="propertyTaxPerMonth"
              value={formData.propertyTaxPerMonth}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="homeownersInsurancePerMonth" className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Homeowners Insurance / month ($)
            </label>
            <input
              type="number"
              name="homeownersInsurancePerMonth"
              id="homeownersInsurancePerMonth"
              value={formData.homeownersInsurancePerMonth}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="0"
            />
          </div>
        </>
      )}

      {formData.transactionType === 'Refinance' && (
        <div className="text-center py-4">
          <p className="text-gray-500">Refinance options coming soon.</p>
        </div>
      )}
      
      <button type="submit" className="w-full bg-blue-600 text-white rounded p-3 font-semibold hover:bg-blue-700 transition duration-150">
        Calculate
      </button>
    </form>
  );
};

export default MortgageForm;