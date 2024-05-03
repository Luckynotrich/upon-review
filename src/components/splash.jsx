import React,{useContext} from "react";
export default function Splash() {
    
  // if(run(5000))
  return (
    <>
    
      <h1>Future Self Upon Review</h1>
      
    </>
  );

}
async function run(Time) {  
  while (true) {  
    console.log('Running...');  
    await new Promise(resolve => setTimeout(resolve, Time));  
  }  
}