'use client';

import dynamic from 'next/dynamic';
import FileUpload from '@/app/components/FileUpload';
const AnalysisDashboard = dynamic(() => import('@/app/components/Ananlysis'), { ssr: false });

export default function Home() {
  return (
    <>
      <FileUpload />
      {/* <AnalysisDashboard
        data={{}}
      /> */}
    </>
  );
}