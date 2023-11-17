
import { Spinner } from 'flowbite-react';
import React from 'react';

const LoadingPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <Spinner size="xl" />
      </div>
    </div>
  );
};

export default LoadingPage;