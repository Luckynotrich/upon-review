export const meld =(cats,revs)=>{
    let Array =[];
    
    Array = revs.map((rev)=>{         
         return (cats.find((cat)=>(cat === rev)))
      })
      Array = Array.filter(Boolean);
  return Array;
}

