import '../styles/globals.css'
import '../styles/themes.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from '../firebase';
import {useEffect} from 'react';
import Login from './Login';

function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      db.collection('users').doc(user.uid).set({
        email:user.email
      }, {merge:true});
    }
  }, [user]);

  if(!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
