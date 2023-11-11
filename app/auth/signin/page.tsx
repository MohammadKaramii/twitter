"use client"
import { getProviders, signIn } from 'next-auth/react'
import twitterLogo from "@/public/icons/twitter-logo.png" 
import Image from 'next/image'

import { useEffect, useState } from 'react';

async function fetchData() {
  const providers = await getProviders();
  return providers;
}





export default function SginIn () {
  
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const data : any = await fetchData();
      setProviders(data);
    };

    fetchDataAndSetState();
  }, []);
  return (
    <div className="flex justify-center mt-20 space-x-4">
      <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image inside a phone"
        className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
      />
      <div>
      {Object.values(providers).map((provider: any) => (
  <div className="flex flex-col items-center">
    <Image
      src={twitterLogo}
      alt="twitter-logo"
      className="w-36 object-cover"
      priority
    />
    <p className="text-center text-sm italic my-10">
    This app is created for practice purposes</p>
    <button onClick={() => signIn(provider.id, {callbackUrl:"/"})} className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">Sign In with {provider.name}</button>
  </div>
))}
      </div>
    </div>
  )
}




