import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/auth.context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifyCount, notifyRead } from "../features/Notification/api/notify.api";

export function NavbarCom() {

  const navigate = useNavigate()

  const context = useContext(authContext);
  if (!context) throw new Error("");
  const { setLogin ,user} = context;


  const q = useQueryClient()
  const {data} = useQuery({
    queryKey:['notifyCount'],
    queryFn:getNotifyCount
  })
  
  
  const {mutate,data:dataRead} = useMutation({
    onSuccess:()=>{
      q.invalidateQueries({queryKey:['notifyCount']})
      q.invalidateQueries({queryKey:['notify']})
    },
    mutationFn:notifyRead
  })


  console.log(dataRead);

  function handleNotifyRead()
  {
    mutate()
  }
  

  function handleLogout() {
    localStorage.removeItem("tkn");
    setLogin(null);
    navigate('/')
  }

  return (
    <Navbar fluid className="bg-social-blue">
      <div className="container flex flex-wrap justify-between items-center">
        <NavbarBrand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Social App
          </span>
        </NavbarBrand>
        
        <div className="flex md:order-2 items-center gap-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={user?.photo}
                rounded
              />
            }
            
          >
            
            <DropdownHeader>
              <span className="block text-sm">{user?.name}</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </DropdownHeader>

            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Setting</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
          <span className="text-white capitalize">{user?.name}</span>
        </div>
        <NavbarCollapse>
          <Link to={"/feed"} className="text-white">
            Feed
          </Link>
          <Link to={"/profile"} className="text-white">
            Profile
          </Link>
          <Link to={'/notification'} className="text-white flex relative ">
            <span>Notification</span>
            <span  onClick={handleNotifyRead} className="size-7 flex justify-center items-center absolute -top-5 left-15  p-2 mx-2 rounded-full bg-red-300 text-white ">{data?.data?.unreadCount}</span>
          </Link>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
}
