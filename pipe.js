const asyncpipe = require('asyncpipe');
function addOne(x){
  return x+1;
}
function addTwo(x){
    return x+2;
  }  
function addThree(x){
    return x+3;
  }   

//console.log(addThree(addTwo(addOne(3))));  
const result  = asyncpipe(addOne,addTwo,addThree);
console.log(result(3)
            .then((result)=>
            { 
                console.log(result);
            })
            .catch());