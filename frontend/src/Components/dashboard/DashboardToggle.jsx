import { Button, Drawer, Placeholder } from "rsuite";
import { useModalState } from "../../misc/customhook";
import DashboardIcon from '@rsuite/icons/Dashboard';
import { AvatarGroup, Avatar } from 'rsuite';
import { useEffect, useState } from "react";
import { getDatabase,  onValue, ref, push, query, orderByChild, equalTo, get, set } from "firebase/database";
import { json, Navigate, useNavigate } from "react-router";

function DashboardToggle(){
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(true);
    let [user, setUser] = useState();
    let [data, setData] = useState();
    let [chats, setChats] = useState();
    let [sidebar, setSidebar] = useState();

    let array =  JSON.parse(localStorage.getItem("friends")) || [];
    let navigate = useNavigate()
    let friends = localStorage.getItem("friends");
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem("user"));
        setUser(data)
        if(data){
            const db = getDatabase();
            let useref = ref(db, 'users');
            onValue(useref, (snapshot)=>{
                const usersArray = Object.keys(snapshot.val()).map((key) => ({ id: key, name: snapshot.val()[key].name, email: snapshot.val()[key].email}));
               let array = usersArray.filter((Element)=> Element.name != data.displayName);
               setData(array)
    
            })
            let userref = ref(db, 'friends')
            let nameQuery = query(userref, orderByChild('friend'), equalTo (data.displayName))
            onValue(userref, (snapshot)=>{
                console.log(snapshot.val())
            })
            let friend = JSON.parse(localStorage.getItem('friends'))
            console.log(friend)
            setChats(friend)

        }
       
           
           

        
       
    },[])
    function add(e){
        let db = getDatabase();
         push(ref(db, 'friends'),{
                        id: user.displayName,
                        friend: e
        
          }).then(()=>{
            document.querySelector('.add').style.display = "none";
            document.querySelector('.added').style.display = "block";
          })
          array.push(e);
          localStorage.setItem('friends',  JSON.stringify(array));
          setChats(array)
                     
        

    }
    function added(){

    }
    function logout(){
        localStorage.removeItem('user')
       navigate('/Signin')
    }
    function chat(e){
        let user = JSON.parse(localStorage.getItem('user'));
        
    
        localStorage.setItem('chat', `${user.displayName.split(' ')[0]} and ${e.split(' ')[0]}` );
        let chat = localStorage.getItem('chat');
        let db = getDatabase();
        let chatid = chat;
        let userref = ref(db, 'chatapp/')
        set(ref(db, `chatapp/${chatid}` ),{
            


        } ).then(()=>{
            console.log("created")
        })



      
        setOpen(false);

    
    }
    function sidebar1(){
        setOpen(true)
    }
    
    return(
        <>
        <Button block color="blue" className="bg-blue-500 text-white font-bold " onClick={sidebar1}>
        <DashboardIcon className="text-white mr-3 font-bold "/> Dashboard 

        </Button>
        <Drawer placement="left"  open = {open}  onClose={()=>setOpen(false)} Name="border bg-slate-500 max-w-4xl max-md:max-w-2xl max-sm:max-w-xs"   >
        <Drawer.Header>
        <Drawer.Title className="flex justify-between"><div>hii</div><div><button className=" h-9  w-20 rounded-lg  bg-blue-600 text-white font-bold"onClick={logout}>Logout</button></div></Drawer.Title>

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
        <div className="mt-6 p-3">
        other peoples

        </div>
        <div className="overflow-y-scroll  h-60 ">
        {data?data.map(Element =>(
            <div className="p-3 border text-blue-400  " >
            {Element.name}
            <div className="flex mt-3 ">
         {friends?friends.includes(Element.name)?<button className="border rounded-md p-2 bg-green-600 text-white added" id={Element.email} onClick={()=>{added(Element.email)}}>remove friend</button>:<button className="border rounded-md p-2 bg-green-600 text-white add" id={Element.email} onClick={()=>{add(Element.name)}}>Add friend</button>:<button className="border rounded-md p-2 bg-green-600 text-white add" id={Element.email} onClick={()=>{add(Element.name)}}>Add friend</button>}
           
            </div>
            </div>

        )):''}


        </div>
        <div className="h-60 overflow-y-auto">
            <h1 className="pl-3 ">friends</h1>
            <div className="p-3">
                {chats?chats.map((Element)=>(
                    <div className="flex justify-between items-center">
                    <div className="font-bold text-lg text-blue-400">{Element}</div>
                    <button className="bg-green-500 text-white w-20 h-9 rounded-lg" onClick={()=>chat(Element)}>Chat</button>
                    </div>
                )):''}
            </div>
        </div>
        
        
        </Drawer>
        

        </>
    )
}
export default DashboardToggle;