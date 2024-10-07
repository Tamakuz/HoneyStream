import dynamic from 'next/dynamic';

// Usage example:
export const DynamicComponent = (componentPath: string) => {
  return dynamic(() => import(componentPath));
};

