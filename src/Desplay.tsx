import  { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './Firebase/configs'; // Ensure this path is correct
import 'animate.css';
import logo1 from "./assets/logo1.png";
import logo from './assets/Untitlvved-1-29.png';
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
import { useNavigate } from 'react-router-dom';

function Display() {
    const [nums, setNums] = useState(Array(13).fill(null)); // Initialize with null values
    const [motion, setMotion] = useState(false);
    const [zoomIn, setZoomIn] = useState(false);
    const [zoomOut, setZoomOut] = useState(false);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    // Fetch data from Firestore
    useEffect(() => {
        const unsubscribes = Array.from({ length: 13 }, (_, i) => {
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

    useEffect(() => {
        const docRef = doc(db, "admin", "admin");
        
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            setMotion(docSnapshot.exists());
            setAdmin(docSnapshot.exists());
            console.log(admin)
        });
    
        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);
    

    // Trigger motion effect when all documents are loaded
    useEffect(() => {
        if (admin) {
            // setTimeout(() => {
            //     setMotion(true);
            // }, 2000);
            // setTimeout(() => {
            //     navigate('/vedio');
            // }, 4000)
            setTimeout(() => {
                setMotion(false);
                setZoomIn(true);
            },500)
            setTimeout(() => {
                setMotion(false);
                setZoomIn(false);
                setZoomOut(true);
            }, 1000)
            setTimeout(() => {
                setMotion(false);
                setZoomIn(true);
            },2000)
            setTimeout(() => {
                setMotion(false);
                setZoomIn(false);
                setZoomOut(true);
            }, 3000)
            setTimeout(() => {
                setMotion(false);
                setZoomIn(true);
            },4000)
            setTimeout(() => {
                navigate('/vedio');
            },5000)
        } else {
            setMotion(false);
        }
    }, [admin]);

    // Check if any num is not null
    const hasValidNums = nums.some((num) => num !== null);

    return (
        <>
            {hasValidNums ? (
                <div className={motion || zoomIn || zoomOut ? "w-[100vw] flex justify-center items-center h-[100vh] bg-[#090951] overflow-hidden" : "w-[100vw] flex justify-center items-center bg-[#090951] over"} id="allLogo">
                    {/* Text element with motion effect */}
                    <img src={logo} alt="logo" className={motion ? 'h-[70vh] w-auto  animate__animated animate__zoomIn transition-all ease-in-out scale-150 duration-1000' : zoomIn ? 'h-[70vh] w-auto transition-all ease-in-out scale-150 duration-1000' : zoomOut ? 'h-[70vh] w-auto transition-all ease-in-out scale-100 duration-1000' : "hidden"} />
                    <div className={motion || zoomIn || zoomOut ? 'hidden' : 'w-full relative transition bg-[#090951]'} id='logo'>
                        {/* Render images conditionally based on the nums state */}
                        {nums.map((num, index) => {
                            const partImages = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10, part11, part12, part13];
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
                            ];
                            return (
                                num !== null && (
                                    <img
                                        key={index}
                                        src={partImages[index]}
                                        className={`h-[60vh] w-auto absolute top-[25vh] right-[38vw] animate__animated ${animations[index]}`}
                                        alt={`part${index + 1}`}
                                    />
                                )
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex w-screen min-h-screen flex-col items-center justify-center bg-[#090951] pb-[50px] md:pb-0 px-4">
                    <img src={logo1} alt="Flowbite Logo" className="h-56 w-auto" />
                    <h1 className='text-3xl font-bold text-white text-center my-5'>لحظات لتدشين هوية مجلس الجمعيات الأهلية الجديد</h1>
                </div>
            )}
        </>
    );
}

export default Display;
