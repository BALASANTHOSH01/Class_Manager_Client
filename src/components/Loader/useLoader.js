import { useState, useEffect } from 'react';

const useLoader = (asyncFunction) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  return { loading,setLoading, data,setData };
};

export default useLoader;
