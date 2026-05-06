import { createContext, useContext, useState, useEffect } from 'react';
import { getExchangeRates } from './api';

const CurrencyContext = createContext();

const SYMBOLS = { INR: '₹', USD: '$', EUR: '€' };

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'INR');
  const [rates, setRates] = useState({ INR: 1, USD: 0.012, EUR: 0.011 });

  useEffect(() => {
    getExchangeRates().then(res => setRates(res.data.rates)).catch(() => {});
  }, []);

  const changeCurrency = (c) => {
    setCurrency(c);
    localStorage.setItem('currency', c);
  };

  const format = (amountInINR) => {
    const converted = amountInINR * (rates[currency] || 1);
    return `${SYMBOLS[currency]}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, format, rates, SYMBOLS }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
