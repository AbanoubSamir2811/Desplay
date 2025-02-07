import  { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './Firebase/configs'; // Ensure this path is correct
import 'animate.css';
import logo1 from "./assets/logo1.png";

// Import images
import part1 from './assets/1.png';
import part2 from './assets/2.png';
import part3 from './assets/3.png';
import part4 from './assets/4.png';
import part5 from './assets/5.png';
import part6 from './assets/6.png';
import part7 from './assets/7.png';
import part8 from './assets/8.png';
import part9 from './assets/9.png';
import part10 from './assets/10.png';
import part11 from './assets/11.png';
import part12 from './assets/12.png';
import part13 from './assets/13.png';
import part14 from './assets/14.png';

function Display() {
    const [nums, setNums] = useState(Array(14).fill(null)); // Initialize with null values
    const [motion, setMotion] = useState(false);

    // Fetch data from Firestore
    useEffect(() => {
        const unsubscribes = Array.from({ length: 14 }, (_, i) => {
            const docRef = doc(db, "user", `number${i + 1}`);
            return onSnapshot(docRef, (docSnapshot) => {
                setNums((prevNums) => {
                    const newNums = [...prevNums];
                    newNums[i] = docSnapshot.exists() ? docSnapshot.data().id : null;
                    return newNums;
                });
            });
        });

        // Cleanup the listeners on component unmount
        return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
    }, []);

    // Trigger motion effect when all documents are loaded
    useEffect(() => {
        if (nums.every((num) => num !== null)) {
            setTimeout(() => {
                setMotion(true);
            }, 1000);
        } else {
            setMotion(false);
        }
    }, [nums]);

    // Check if any num is not null
    const hasValidNums = nums.some((num) => num !== null);

    return (
        <>
            {hasValidNums ? (
                <div className="w-[100vw] flex justify-center items-center" id="allLogo">
                    {/* Text element with motion effect */}
                    <div className={motion ? 'h-[50vh] w-[30px] absolute top-[30vh] right-[65vw] text-5xl text-justify animate__animated animate__flash' : 'hidden'}>
                        <p className='text-wrap text-justify leading-[70px] mb-4'>مــــــجــــــلــــــــس الجمعيات الأهـــــــلــــــيـــــــة</p>
                        <p className='text-nowrap text-2xl font-bold text-justify'>Council Of CSA</p>
                    </div>
                    <div className={motion ? 'w-full relative transition ease-in-out -translate-x-[-100px]' : 'w-full relative transition'} id='logo'>
                        {/* Render images conditionally based on the nums state */}
                        {nums.map((num, index) => {
                            const partImages = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10, part11, part12, part13, part14];
                            const animations = [
                                'animate__bounceInDown',
                                'animate__bounceInUp',
                                'animate__fadeInTopRight',
                                'animate__fadeInBottomLeft',
                                'animate__fadeInTopLeft',
                                'animate__rotateInDownRight',
                                'animate__zoomInDown',
                                'animate__slideInLeft',
                                'animate__zoomInLeft',
                                'animate__slideInRight',
                                'animate__zoomInUp',
                                'animate__zoomInUp',
                                'animate__flipInX',
                                'animate__jackInTheBox',
                            ];
                            return (
                                num !== null && (
                                    <img
                                        key={index}
                                        src={partImages[index]}
                                        className={`h-[50vh] w-auto absolute top-[25vh] right-[40vw] animate__animated ${animations[index]}`}
                                        alt={`part${index + 1}`}
                                    />
                                )
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex w-screen min-h-screen flex-col items-center justify-center bg-[#06878E] pb-[50px] md:pb-0 px-4">
                    <img src={logo1} alt="Flowbite Logo" className="h-56 w-auto" />
                </div>
            )}
        </>
    );
}

export default Display;
