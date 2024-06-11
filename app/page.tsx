'use client'
import Image from "next/image";
import PrayerCard from "./components/PrayerCard";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Home() {
  const prayerTime = [
    {
      title: "Fajr",
      time: "05:30 AM",
    },
    {
      title: "Dhuhr",
      time: "01:30 PM",
    },
    {
      title: "Asr",
      time: "05:30 PM",
    },
    {
      title: "Maghrib",
      time: "07:30 PM",
    },
    {
      title: "Isha",
      time: "09:30 PM",
    },
  ];
  const apiUrl = "https://prayer-times11.p.rapidapi.com/timingsByCity/2024-6-11?method=2&city=Baghdad&country=Iraq";

  const fetchProducts = async () => {
      const response = await axios.get(apiUrl);
      return response?.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['PrayerTimes'],
    queryFn: fetchProducts,
  });
  if (isLoading) {
      return <h1>Loading ....</h1>;
  }
  console.log(data)

  if (error) {
      return <p className="error">{error.message}</p>;
  }

  const updatedPrayerTime = prayerTime.map((prayer) => ({
    ...prayer,
    time:data?.data.timings[prayer.title] + " PM" || prayer.time
  }))
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-black">
      <section className="flex flex-row items-center justify-center gap-2 p-1">
        {updatedPrayerTime.map((prayer,index) => (
          <PrayerCard key={index}  title={prayer.title} time={prayer.time} />
        ))}
      </section>
    </main>
  );
}
