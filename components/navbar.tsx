import MobileSidebar from "@/components/mobile-sidebar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <MobileSidebar />
            {/* <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
            </Button> */}
            {/* <div className="flex w-full justify-end">

            </div> */}
        </div>
    )
}

export default Navbar;