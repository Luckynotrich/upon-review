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
  let textNL = textNewLines(Text) * mult;
  let text = Math.ceil((Text.length * f) / w);

  if (text <= 1) text = text++;
  // console.log('text = ',text)
  // console.log('textNL =', textNL)
  return Math.ceil((text + textNL) * f);
};

export const rowCount = (procon, f, calcW) => {
  let count = 0;
  for (let i = 0; i < procon.length; i++) {
    count += procon[i].value.length * f;
  }
  // console.log('count ',count)
  count = Math.ceil(count / calcW);
  return count;
};

export const textNewLines = (Text) => {
  let textNL = Text.match(/\n/g);
  if (textNL) textNL = textNL.length;
  else textNL = 1;
  console.log('textNL =',textNL)
  return textNL;
}
//replace \r * X and \n\n with \n
export const noBackSlash_r =(text) => {
  if(text.includes("\r\r\r\r")){
  Text = text.replaceAll("\r\r\r\r", `\n`);
}
if(text.includes("\r\r")){
  Text = text.replaceAll("\r\r", `\n`);
}
if(text.includes("\r")){
  Text = text.replaceAll("\r", `\n`);
}
if(text.includes("\n\n")){
  Text = text.replaceAll("\n\n", `\n`);
}
return text;
}