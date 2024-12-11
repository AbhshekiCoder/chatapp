
import 'rsuite/dist/rsuite.min.css';
import {signInWithPopup} from 'firebase/auth';
import {auth, database} from '../misc/firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { Button, ButtonGroup, ButtonToolbar, Container, Grid, Row, Panel, Col } from 'rsuite';

function SignIn(){


    const onFacebookSigin = () =>{
       
    }
    const onGoogleSignin = async() =>{
       const provider = new GoogleAuthProvider();
      const  user =  await signInWithPopup(auth, provider);
        console.log(user)
        auth.onAuthStateChanged(user =>{
            console.log(user)
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