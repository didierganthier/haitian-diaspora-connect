// components/Initials.tsx
import { getInitials } from '@/utils/getInitials';
import React from 'react';


const Initials = ({ name }: { name: string }) => {
  const initials = getInitials(name);
  return <div>{initials}</div>;
};

export default Initials;
