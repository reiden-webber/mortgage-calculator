import React, { useState } from 'react';
import { MortgageFormInputs } from '@/types';

interface MortgageFormProps {
  initialValues: MortgageFormInputs;
  onSubmit: (values: MortgageFormInputs) => void;
}

const MortgageForm: React.FC<MortgageFormProps> = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState<MortgageFormInputs>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputFields = [
    { name: 'principalInterest', label: 'Principal & Interest ($)' },
    { name: 'propertyTaxPerMonth', label: 'Property Tax / month ($)' },
    { name: 'homeownersInsurancePerMonth', label: 'Homeowners Insurance / month ($)' },
    { name: 'mortgageInsurance', label: 'Mortgage Insurance ($)' },
    { name: 'hoaFees', label: 'HOA Fees ($)' },
    { name: 'pmiPerMonth', label: 'PMI / month ($)' },
    { name: 'creditScore', label: 'Credit Score' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-lg">
      {inputFields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type="number"
            name={field.name}
            id={field.name}
            value={formData[field.name as keyof MortgageFormInputs]}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-600 text-white rounded p-3 font-semibold hover:bg-blue-700 transition duration-150">
        Update
      </button>
    </form>
  );
};

export default MortgageForm;