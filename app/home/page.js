"use client";
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { isLoggedIn } from '../utils/auth';

export default function Home(){
    const router = useRouter();
    const [canRender, setCanRender] = useState(false);

    useLayoutEffect(() => {
        if (!isLoggedIn()) {
            router.replace('/login');
            return;
        }
        setCanRender(true);
    }, [router]);
    if (!canRender) return null;

    return(<>
    <div className="bg-slate-200 h-screen w-screen">
    
    </div>
    </>)
}


