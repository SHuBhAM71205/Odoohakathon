import React from 'react'
import UserNav from './UserNav'
import UserTripData from './UserTripData'

export default function UserDashboard() {
  return (
    <div className='flex'>
      <UserNav/>
      <UserTripData/>
    </div>
  )
  
}

