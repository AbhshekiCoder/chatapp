 import React, { useEffect, useState } from 'react'
import { Col, Grid, Row, Message }  from 'rsuite';
import Sidebar from '../Components/Sidebar';
import { ref, getDatabase, set, push, child, get } from 'firebase/database';



  function Home(){
    const ws =  new WebSocket("https://chatapp-ke5t.onrender.com")
    let [data, setData] = useState();
    let [messages, setMessages] = useState();
    
    function input(e){
        
        setData(e.target.value)
    }
  
   
     useEffect(()=>{
       
      
        ws.onopen  = ()=>{
            console.log('connected to server');
        }
        ws.onmessage = (event)=>{
            const data = event.data;
           // setMessage((prevMessage)=> [...prevMessage, data])
        }
        ws.onclose = ()=>{
            console.log('server disconnected')
        }
       


    }, [ws])

    function form(e){
        e.preventDefault();
      if(ws){
        ws.send(data)
      }
      const db = getDatabase();
      let name = JSON.parse(localStorage.getItem('user')).displayName;
      
      push(ref(db, 'chat/'),{
        name: name,
        message: data
      })
      get(child(ref(db), 'chat')).then((snapshot)=>{
      
        if(snapshot){
            const usersArray = Object.keys(snapshot.val()).map((key) => ({ id: key, name: snapshot.val()[key].name, message: snapshot.val()[key].message}));
            setMessages(usersArray)
        }

      })

      
    }
    
    return(
        <>

          
             <Grid fluid className='h-100 '>
            <Row>
                <Col xs={24} md={9}>
                <Sidebar/>

                </Col>
            </Row>

            </Grid> 
            <div className='max-w-6xl m-auto '>
            <div className='mt-16 min-h-96 border p-3 grid items-end overflow-y-auto'>
            
             {messages?messages.map(Element =>(
                <div className='mt-3 '>
                <p>{Element.name}</p>
                <Message type="success" className=' w-fit'>

                {Element.message}
                </Message>

                </div>
              

             )):''}

             <div className='sticky-bottom  pb-6 pt-6'>
               <input type = "text" name='text' className=' w-11/12 h-9 border outline-none  rounded-md' onChange={input}/><button className='text-white font-bold bg-blue-400 text-lg  ml-3 rounded-lg w-16 h-9' onClick={form}>send</button>

            </div>

            
            </div>

                
            </div> 
            


        

        </>
    )

}
export default Home;