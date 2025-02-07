import { useNavigate } from "react-router-dom";
import logo1 from "./assets/logo1.png";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase/configs";
import { useEffect, useState } from "react";

function Home() {
    const [nums, setNums] = useState(Array(14).fill(null)); // Initialize with null values

    const navigate = useNavigate();

    // Function to handle region selection
    function handleClick(id: number){
        localStorage.clear();
        localStorage.setItem("user", id.toString());
      navigate("/hero");
    };

    // Function to delete the entire Firestore collection
    async function deleteEntireCollection() {
        const userCollectionRef = collection(db, "user"); // Reference to the "user" collection
        try {
            const querySnapshot = await getDocs(userCollectionRef); // Fetch all documents in the collection

            // Delete each document one by one
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref); // Delete the document
                console.log(`Document with ID ${doc.id} deleted.`);
            });

            console.log("Entire collection deleted.");
            alert("Entire collection deleted successfully!");
            navigate('/desplay');
        } catch (error) {
            console.error("Error deleting collection: ", error);
            alert("Error deleting collection!");
        }
    }

    useEffect(() => {
        const unsubscribes = Array.from({ length: 14 }, (_, i) => {
            const docRef = doc(db, "user", `number${i + 1}`);
            return onSnapshot(docRef, (docSnapshot) => {
                setNums((prevNums: any) => {
                    const newNums = [...prevNums];
                    newNums[i] = docSnapshot.exists() ? docSnapshot.data().id : null;
                    return newNums;
                });
            });
        });

        // Cleanup the listeners on component unmount
        return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
    }, []);


    return (
        <main className="flex w-screen min-h-screen flex-col items-center justify-start bg-[#06878E] pb-[50px] md:pb-0 px-4">
            <img
                src={logo1}
                alt="Flowbite Logo"
                className="h-64  w-auto "
            />
            <h1 className="text-3xl font-bold text-white text-end my-4">المناطق التى لم تضغط بعد</h1>

            <div className="grid justify-center mt-9 lg:grid-cols-3 sm:grid-cols-2 gap-8 text-white text-xl font-bold" dir="rtl">
                <p className={+nums[0] == 1?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(1)}>
                    مجلس الجمعيات الأهلية بالرياض
                </p>
                <p className={+nums[1] == 2?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(2)}>
                    مجلس الجمعيات الأهلية بالجوف
                </p>
                <p className={+nums[2] == 3?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(3)}>
                    مجلس الجمعيات الأهلية بعسير
                </p>
                <p className={+nums[3] == 4?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(4)}>
                    مجلس الجمعيات الأهلية بمكة المكرمة
                </p>
                <p className={+nums[4] == 5?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(5)}>
                    مجلس الجمعيات الأهلية بالحدود الشمالية
                </p>
                <p className={+nums[5] == 6?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(6)}>
                    مجلس الجمعيات الأهلية بالمدينة المنورة
                </p>
                <p className={+nums[6] == 7?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(7)}>
                    مجلس الجمعيات الأهلية بحائل
                </p>
                <p className={+nums[7] == 8?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(8)}>
                    مجلس الجمعيات الأهلية بالشرقية
                </p>
                <p className={+nums[8] == 9?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(9)}>
                    مجلس الجمعيات الأهلية بالباحة
                </p>
                <p className={+nums[9] == 10?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(10)}>
                    مجلس الجمعيات الأهلية بتبوك
                </p>
                <p className={+nums[10] == 11?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(11)}>
                    مجلس الجمعيات الأهلية بجازان
                </p>
                <p className={+nums[11] == 12?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(12)}>
                    مجلس الجمعيات الأهلية بالقصيم
                </p>
                <p className={+nums[12] == 13?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(13)}>
                    مجلس الجمعيات الأهلية بنجران
                </p>
                <p className={+nums[13] == 14?"hidden" : "cursor-pointer hover:underline"} onClick={() => handleClick(14)}>
                    مجلس الجمعيات الأهلية الرئيسى 
                </p>
            </div>

            {/* Buttons for reset and display */}
            <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                    className="text-2xl font-bold text-black text-center mt-4 bg-[#B5B89F] h-16 w-32 rounded-md"
                    onClick={deleteEntireCollection}
                >
                    إعادة البدء
                </button>
                <button
                    className="text-2xl font-bold text-black text-center mt-4 bg-[#B5B89F] h-16 w-36 rounded-md"
                    onClick={() => navigate('/desplay')}
                >
                    شاشة العرض
                </button>
            </div>
        </main>
    );
}

export default Home;