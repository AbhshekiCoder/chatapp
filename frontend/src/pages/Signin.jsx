
import 'rsuite/dist/rsuite.min.css';
import {signInWithPopup} from 'firebase/auth';
import {auth, database} from '../misc/firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { Button, ButtonGroup, ButtonToolbar, Container, Grid, Row, Panel, Col } from 'rsuite';
import { useNavigate,Navigate } from 'react-router-dom';
import { getDatabase, push,  ref } from 'firebase/database';

function SignIn(){
    let Navigate = useNavigate();

    const onFacebookSigin = () =>{
       
    }
    const onGoogleSignin = async() =>{
       const provider = new GoogleAuthProvider();
      const  user =  await signInWithPopup(auth, provider);
       
        auth.onAuthStateChanged(user =>{
            localStorage.setItem('user',  JSON.stringify(user))
            let db = getDatabase();
            let name = JSON.parse(localStorage.getItem('user')).displayName;
            let email = JSON.parse(localStorage.getItem('user')).email;
            push(ref(db, 'users'),{
                name: name,
                email: email

            })

            Navigate('/')
            window.location.reload()
          
           
        });
    }
    return(
        <>
    <div className=' m-auto border'>

      <div className=' text-center'>
         <h5 className=' text-xl'>Welcome to chat</h5>
         <p>Progrresive chat plateform for neopythes </p>
      </div>
     <div className=' text-center flex justify-center  ' >
         <button block color = "blue" className=' to-blue-500 bg-blue-500 block text-white p-1  w-96' onClick={onFacebookSigin}>
             Continue with facebook<i className = "fa fa-facebook"></i>
         </button>
     </div>
     <div className='text-center flex justify-center mt-3'>
     <button block color = "blue" className=' to-blue-500 bg-green-500 block text-white p-1  w-96' onClick={onGoogleSignin}>
           Continue with Google<i className = "fa fa-google"></i>
         </button>
     </div>


     </div>
        </>

    )
    
   
   

}

export default SignIn;