 import React, { useEffect, useState } from 'react'
import { Col, Grid, Row }  from 'rsuite';
import Sidebar from '../Components/Sidebar';
import { ref, getDatabase, set } from 'firebase/database';


  function Home(){
    const ws =  new WebSocket("ws://localhost:3000")
    let [data, setData] = useState();
    let [message, setMessage] = useState([]);
    
    function input(e){
        
        setData(e.target.value)
    }
  
   
     useEffect(()=>{
       
      
        ws.onopen  = ()=>{
            console.log('connected to server');
        }
        ws.onmessage = (event)=>{
            const data = event.data;
            setMessage((prevMessage)=> [...prevMessage, data])
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
      set(ref(db, 'chats/'),{
          chat: data

      })

    }
    useEffect(()=>{
       

    }, message)

     
    return(
        <>

          <form onSubmit={form}>
          <input type = "text"  onChange={input}/>
          <button type='submit'>submit</button>
          </form>
          <h1>{message}</h1>
             <Grid fluid className='h-100 border'>
            <Row>
                <Col xs={24} md={9}>
                <Sidebar/>

                </Col>
            </Row>

            </Grid> 


        

        </>
    )

}
export default Home;