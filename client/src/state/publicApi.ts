
import { useState, useEffect } from 'react';

export const chileanIndex = () => {
  const [exchangeData, setExchangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mindicador.cl/api');
        const data = await response.json();
        setExchangeData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { exchangeData, loading };
};
