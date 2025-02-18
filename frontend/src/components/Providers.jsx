"use client"

import { Suspense, useEffect} from 'react';
import { AxiosInterceptor } from '@/utils/Axiosinterceptor';

export default function Providers({ children }) {
  useEffect(()=>{
    AxiosInterceptor.initialize();
  },[])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
} 