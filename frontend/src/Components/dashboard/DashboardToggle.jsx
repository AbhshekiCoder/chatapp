import { Button, Drawer, Placeholder } from "rsuite";
import { useModalState } from "../../misc/customhook";
import DashboardIcon from '@rsuite/icons/Dashboard';
import { AvatarGroup, Avatar } from 'rsuite';
import { useEffect, useState } from "react";

function DashboardToggle(){
    const {isOpen, close, open} = useModalState();
    let [user, setUser] = useState();
    console.log(isOpen);
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem("user"));
        setUser(data)
       
    },[])
    
    return(
        <>
        <Button block color="blue" className="bg-blue-500 text-white font-bold " onClick={open}>
        <DashboardIcon className="text-white mr-3 font-bold "/> Dashboard 

        </Button>
        <Drawer placement="left"  open = {isOpen}  onClose = {close} className="border bg-slate-500 max-w-4xl max-md:max-w-2xl max-sm:max-w-xs"   >
        <Drawer.Header>
        <Drawer.Title>hii</Drawer.Title>

        </Drawer.Header>
        <div className="flex items-center">
        <div className=" mt-6 p-3">
        <AvatarGroup spacing={6}>
      <Avatar src="https://i.pravatar.cc/150?u=1" circle size="lg"/>
   
        </AvatarGroup>

        </div>
        <div className="ml-3 text-blue-400 text-lg font-bold">
            {user?user.displayName: ''}
        </div>

        </div>
        
        
        </Drawer>
        

        </>
    )
}
export default DashboardToggle;