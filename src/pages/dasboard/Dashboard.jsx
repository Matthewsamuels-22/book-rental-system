import React from 'react'
import 'chart.js/auto';

import Box from "@mui/material/Box"
import Stack from '@mui/material/Stack'

import { PieChart } from './PieChart'
import { BarChart } from './BarChart'

import './dashboard.css'

export function Dashboard() {
  return (
    <Stack className='dashboard' spacing={2}>
      <Box display='flex' justifyContent='space-evenly' flexWrap='wrap' gap={2}>
        <div className='students'>Total Student</div>
        <div className='books'>Total Books</div>
        <div className='issued'>Total Issued Books</div>
      </Box>
      <Box display='flex' justifyContent='space-evenly' flexWrap='wrap' gap={2}>
        <div className='chart-container flex-grow-1'><PieChart /></div>
        <div className='chart-container flex-grow-1'><BarChart /></div>
      </Box>
    </Stack>
  )
}
