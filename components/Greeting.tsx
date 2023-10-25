"use client"

import { useAppSelector } from '@/app/redux/store';
import React from 'react'

export default function Greeting() {
  const username = useAppSelector(state => state.authReducer.username);

  return (
    <h1 className="text-xl">Hello, <span className="font-semibold">{username}</span></h1>
  )
}