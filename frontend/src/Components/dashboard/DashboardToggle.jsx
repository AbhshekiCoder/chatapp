import { Button, Drawer, Placeholder } from "rsuite";
import { useModalState } from "../../misc/customhook";
import DashboardIcon from '@rsuite/icons/Dashboard';


function DashboardToggle(){
    const {isOpen, close, open} = useModalState();
    console.log(isOpen);
    
    return(
        <>
        <Button block color="blue" className="bg-blue-500 text-white font-bold " onClick={open}>
        <DashboardIcon className="text-white mr-3 font-bold "/> Dashboard 

        </Button>
        <Drawer placement="left"  open = {isOpen}  onClose = {close} className="border bg-slate-500 max-w-4xl max-md:max-w-2xl max-sm:max-w-xs"   >
        </Drawer>
        

        </>
    )
}
export default DashboardToggle;