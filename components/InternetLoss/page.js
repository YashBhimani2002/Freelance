import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageOfConnection from "./connectionLost.jpg"
import { Inter } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const InternetLoss = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            document.body.classList.remove("overflow-hidden");
        };

        const handleOffline = () => {
            setIsOnline(false);
            document.body.classList.add("overflow-hidden");
        };

        // Listen for connection status changes
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check the initial status
        if (!navigator.onLine) {
            handleOffline();
        }

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOnline) return null;
    return (
        <div className="fixed bg-[#00000080] top-0 bottom-0 left-0 right-0 z-[99999999] flex justify-center items-center">
            <div className="bg-white w-auto h-auto rounded-md p-5 md:p-12 flex justify-center items-center flex-col">
                <p className='text-[42px] text-[#9a2222]'>⚠️</p>
                <FontAwesomeIcon/>
                {/* <Image src={ImageOfConnection} className='w-[16rem] h-[12rem] md:w-[23rem] md:h-[17rem] lg:w-[29rem] lg:h-[21rem]' /> */}
                <p className={`text-center ${inter600.className}`}>Internet connection lost. </p>
                <p className={`text-center ${inter600.className}`}>Please check your network.</p>
                </div>
        </div>
    )
}

export default InternetLoss;