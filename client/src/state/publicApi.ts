// export const fetchMindicadorData = async (): Promise<any> => {
//     const url = 'https://mindicador.cl/api';
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data, status ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;
//     }
// };

// (async () => {
//     const {uf} = await fetchMindicadorData();
//     return uf.valor; 
// })();


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
