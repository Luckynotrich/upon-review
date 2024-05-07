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
export const textHeight = (Text, mult, f, w) => {
  if(!mult || mult === 0) mult = 1;
  let textNL = textNewLines(Text) ;
  let text = Math.ceil((Text.length * f) / w * mult);

  if (text <= 1) text = text++;
  return Math.ceil((text + textNL) * f);
};

export const rowCount = (procon, f, calcW) => {
  let count = 0;
  for (let i = 0; i < procon.length; i++) {
    count += procon[i].value.length * f;
  }
  count = Math.ceil(count / calcW);
  return count;
};

export const textNewLines = (Text) => {
  let textNL = Text.match(/\n/g);
  if (textNL) textNL = textNL.length;
  else textNL = 1;
  return textNL;
}
//replace \r * X and \n\n with \n
export const noBackSlash_r =(text) => {
  let Text = text;
  let sub = '\n'
  let sub1 = '*'

if(Text.includes("\r")){
  Text = Text.replaceAll("\r", `${sub}`);
}
if(Text.includes("\n\n")){
  Text = Text.replaceAll(`${sub}${sub}`, `${sub1}`);
}
if(Text.includes('****')){
  Text = Text.replaceAll('****','\n\n')
}
if(Text.includes('**')){
  Text = Text.replaceAll('**','\n')
}
if(Text.includes('*')){
  Text = Text.replaceAll('*','\n')
}

return Text;
}
export const getMult = (txtlen, w) =>{
  let mult = 1;
  if(w > 319 && w <= 400){
    if(txtlen < 25){
      mult = 16
    }
    else if(txtlen < 50){
      mult = 5
    }
    else if(txtlen < 200){
       mult = 3.4;
      }
    else if (txtlen < 2000){
       mult = 1.2;
      }
      
   }
  if(w > 400 && w <= 520){
  if(txtlen < 25){
    mult = 16;
  }
  else if(txtlen < 50){
    mult = 5;
  }
  else if(txtlen < 200){
     mult = 3.4;
    }
  else if (txtlen < 2000){
     mult = 1.3;
    }
 }
 if(w > 520 && w <= 640){
  if(txtlen < 25){
    mult = 6;
  }
  else if(txtlen < 50){
    mult = 2;
  }
  else if(txtlen < 200){
     mult = 2.5;
    }
    else if (txtlen < 700){
      mult = 1.1
    }
  else if (txtlen < 2000){
     mult = .8;
    }
 }
 if(w > 640 && w <= 820 ){
  if(txtlen < 50){
    mult = 1;
  }
  else if(txtlen < 200){
     mult = 1.5;
    }
    else if (txtlen < 700){
      mult = .6
    }
  else if (txtlen < 2000){
     mult = .8;
    }
 }
return mult
}