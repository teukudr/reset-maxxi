import Image from "next/image";
import { FiSearch, FiLogIn } from "react-icons/fi";
import Logo from "@/assets/images/logo-tiketku.svg";
import IconList from "@/assets/fi_list.svg";
import IconBell from "@/assets/icon_bell.svg";
import IconUser from "@/assets/icon_user.svg";


const NavbarLogin = () => {
  return (
    <div className="h-full max-w-full">
      <div className="flex items-center justify-between w-full h-20 px-32 bg-white drop-shadow-md">
        <div className="flex items-center w-1/2">
          <a href="/">
          <Image
            src={Logo}
            width={78}
            height={33}
            alt="Picture of the author"
          /></a>
        </div>

        <div className="flex gap-x-6 ml-96">
          <a href="/riwayat"><Image 
          className="icon-list" 
          src={IconList}
          width={24} 
          height={24} 
          alt="" 
          /></a>

          <a href="/notif"><Image 
          className="icon-list" 
          src={IconBell}
          width={24} 
          height={24} 
          alt="" 
          /></a>

          <a href="/user"><Image 
          className="icon-list" 
          src={IconUser}
          width={24} 
          height={24} 
          alt="" 
          /></a>
          
        </div>
      </div>
    </div>
  );
};

export default NavbarLogin;
