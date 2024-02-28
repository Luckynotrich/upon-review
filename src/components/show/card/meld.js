export const meld =(cats,revs)=>{
    let Array =[];
    
    Array = revs.map((rev)=>{         
         return (cats.find((cat)=>(cat === rev)))
      })
      Array = Array.filter(Boolean);
  return Array;
}
let c = [1,2,3,4];
let r = [4,5, 3];
let view = meld(c,r)
console.log('view ',view,' length ',view.length)
