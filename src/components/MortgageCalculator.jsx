import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const MortgageCalculator = () => {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = () => {
    const principal = price - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  const chartData = {
    labels: Array.from({ length: loanTerm * 12 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Payment',
        data: Array(loanTerm * 12).fill(monthlyPayment),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Mortgage Calculator</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Property Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Down Payment"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Loan Term (years)"
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded"
        />
        <button onClick={calculateMortgage} className="w-full bg-blue-600 text-white py-2 rounded">Calculate</button>
      </div>
      {monthlyPayment && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Monthly Payment: ${monthlyPayment}</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
