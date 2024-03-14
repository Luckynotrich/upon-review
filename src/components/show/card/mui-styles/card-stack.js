//function to dirive aproximate font size
// based on an element id passed as elem
export const eff = (elem, window) => {
    let arr = window
      .getComputedStyle(document.getElementById(elem))
      .fontSize.split('p');
    return arr[0];
  };
  
  //function to control width for
  //card height calculation
  export const dubya = (window) => {
    if (window.innerWidth < 1280) return window.innerWidth;
    else return 1280;
  };
  
  //function to estimate the height of the
  //text from the review
  export const txthite = (length, f, w) => {
    let text = Math.ceil((length * f) / w);
    if (text <= 2) text = text + 3;
    return Math.ceil(text * f - 1);
  };
  
  export const rowCount = (procon, f, w) => {
    let count = 0;
    procon.forEach((pc) => {
      count += Math.ceil((pc.value.length * f) / w);
    });
    return count;
  };