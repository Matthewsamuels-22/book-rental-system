import React from 'react'
import { PieChart } from './PieChart'
import { BarChart } from './BarChart'
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import './DashBoard.css'

export function DashBoard  () {
  return (
    <div className='dashboard'>
        <div className='sidebar'>
          Sidebar
          <button onClick={()=>signOut(auth)}>Sign Out</button>
          </div>
        <div className='content'>
        <div className='top'>
        <div className='students'>Total Student</div>
          <div className='books'>Total Books</div>
          <div className='issued'>Total Issued Books</div>
        </div>
        <div className='charts'>
            <PieChart/>
            <BarChart/>
        </div>   
        </div>
    </div>
  )
}
