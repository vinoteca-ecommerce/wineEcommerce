import React from 'react';
import { DashboardTable } from '../AdminDashboard/TableDashboard';


export const Dashboard=()=> {
  return (
      <div component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DashboardTable/>
      </div>
  
  );
}