import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { countUserApiLimit } from "@/lib/api-limit";


const DashBoardLayout=async ({children}:{children:React.ReactNode})=>
{
    const apiLimitCount=await countUserApiLimit();
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900">
                <Sidebar apiLimitCount={apiLimitCount}></Sidebar>
            </div>
            <main className="md:pl-72">
                    <Navbar/>
                    {children}
            </main>
        </div>
    );
}
export default DashBoardLayout;