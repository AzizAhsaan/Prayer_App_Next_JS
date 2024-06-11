'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import moment from 'moment';
type Props = {
  title:string;
  time:string;
}

const PrayerCard = (props: Props) => {
  const [time,setTime] = useState(() => moment().format('hh:mm:ss A'))
  const calculateTimeLeft = () => {
    const now = moment();
    const end = moment(props.time, 'hh:mm:ss A');
    const duration = moment.duration(end.diff(now));
    const hours = Math.abs(duration.hours());
    const minutes = Math.abs(duration.minutes());
    const seconds = Math.abs(duration.seconds());
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${duration.asHours() < 0 ? 'past' : 'left'}`;
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format('hh:mm:ss A'))
      setTimeLeft(calculateTimeLeft())
     
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  },[])


  
  return (
    <Card className='h-[500px] w-[290px] gap-4 bg-white rounded-xl flex items-center flex-col'>
      <h1 className='text-2xl font-semibold'>{props.title}</h1>
      <h1 className='text-2xl font-semibold'>({timeLeft})</h1>
    </Card>
  )
}

export default PrayerCard