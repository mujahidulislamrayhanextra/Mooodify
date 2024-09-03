import Dashboard from '@/components/Dashboard';
import Login from '@/components/Login';
import Main from '@/components/Main';
import React from 'react';


export const metedata = {
    title : "Broodl . Dashbord ",
}

export default function page() {
    const isAuthenticated = false;
    let children = (
       <Login/>
    )
    if(isAuthenticated) {
        children = (
            <Dashboard/>
        )
    }
  return (
    <Main>
      {children}
    </Main>
  )
}
