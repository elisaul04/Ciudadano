 
 var config = {
  apiKey: "AIzaSyD19KgVApkrN8tDFIwFhreLtb-nmA7Z94c",
  authDomain: "ciudadano-99cf5.firebaseapp.com",
  databaseURL: "https://ciudadano-99cf5.firebaseio.com",
  projectId: "ciudadano-99cf5",
  storageBucket: "ciudadano-99cf5.appspot.com",
  messagingSenderId: "218866875255"
};
   firebase.initializeApp(config);

   function GetValueControlById(id){
     let input = document.getElementById(id);
     if(input.value !== '') 
     {
        return document.getElementById(id).value;
     }   
   }
 
