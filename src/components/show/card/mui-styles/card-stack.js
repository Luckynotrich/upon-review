//function to dirive aproximate font size
// based on an element id passed as elem
export const fontHeight = (elem, window) => {
    let arr = window
      .getComputedStyle(document.getElementById(elem))
      .fontSize.split('p');
    return arr[0];
  };
  
  //function to control width for
  //card height calculation
  export const WinWidth = (window) => {
    if (window.innerWidth < 1280) return window.innerWidth;
    else return 1280;
  };
  
  //function to estimate the height of the
  //text from the review
  export const txthite = (length, f, w) => {
    let text = Math.ceil((length * f) / w);
    
    if (text <= 1) text = text++;
    // console.log('text = ',text)
    return Math.ceil(text * f - 1);
  };
  
  export const rowCount = (procon, f, calcW) => {
    let count = 0;
    for(let i = 0;i < procon.length;i++){
      count += procon[i].value.length * f;
    }
    // console.log('count ',count)
    count = Math.ceil(count/calcW);
    return count;
  };

  export const textNewLines = (Text) =>{
    let textNL = Text.match(/\n/g);
    if (textNL) textNL = textNL.length;
    else textNL = 1;
    return textNL;
  }
  