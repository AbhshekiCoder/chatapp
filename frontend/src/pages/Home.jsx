 import React, { useEffect, useRef, useState } from 'react'
import { Col, Grid, Row, Message }  from 'rsuite';
import Sidebar from '../Components/Sidebar';
import { ref, getDatabase, set, push, child, get, onValue } from 'firebase/database';



  function Home(){
    const ws =  new WebSocket("https://chatapp-ke5t.onrender.com")
    let [data, setData] = useState();
    let [messages, setMessages] = useState();
    
    function input(e){
        
        setData(e.target.value)
    }
    const chatBoxRef = useRef(null)
   
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
    
        document.querySelector('.item').value = '';
      const db = getDatabase();
      let name = JSON.parse(localStorage.getItem('user')).displayName;
      let chat = localStorage.getItem('chat');
 
      let chatid = chat;
      let userref = ref(db, 'chatapp/')
      push(ref(db, `chatapp/${chatid}/` ),{
        name: name,
        message: data
          


      } ).then(()=>{
          console.log("created")
      })

      
      
    }
    useEffect(()=>{
        const db = getDatabase();
        let chat = localStorage.getItem('chat');
 
        let chatid = chat;
        let useref = ref(db, `chatapp/${chatid}`);
        onValue(useref, (snapshot)=>{
            const usersArray = Object.keys(snapshot.val()).map((key) => ({ id: key, name: snapshot.val()[key].name, message: snapshot.val()[key].message}));
            setMessages(usersArray)
            console.log(usersArray)
      
            
          

        })


    },[])
    useEffect(()=>{
        if(chatBoxRef.current){
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }

  },[messages])




    function search(e){
        if(e.key == "Enter"){
          document.querySelector('.item').value = '';
            
              const db = getDatabase();
              let name = JSON.parse(localStorage.getItem('user')).displayName;
              let chat = localStorage.getItem('chat');
 
              let chatid = chat;
          
              push(ref(db, `chatapp/${chatid}/` ),{
                name: name,
                message: data
                  
        
        
              } ).then(()=>{
                  console.log("created")
              })
        
              
             
              

        }

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
            <div className='mt-16  border p-3   overflow-y-scroll message' style={{height: "500px"}} ref={chatBoxRef}>
            
             {messages?messages.map(Element =>(
                <div className='mt-3 border'>
                <p>{Element.name}</p>
                <Message type="success" className=' w-fit'> 

                {Element.message}
                </Message>

                </div>
              

             )):''}

            

            
            </div>
            <div className=' pb-6 pt-6 sticky-bottom'>
               <input type = "text" name='text' className='item w-11/12 h-9 border outline-none  rounded-md' onChange={input} onKeyDown={search}/><button className='text-white font-bold bg-blue-400 text-lg  ml-3 rounded-lg w-16 h-9' onClick={form} >send</button>

            </div>
                
            </div> 
            

         
        

        </>
    )

}
export default Home;