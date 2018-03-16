// import sprintf from 'sprintf';

/* eslint-disable prefer-rest-params,no-mixed-operators,prefer-destructuring */
export function getMean() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i] || 0;
  }
  return sum / arguments.length;
}

export function reduceData(fullData) {
  console.log('----> fullData', fullData);

  const gray = [];
  for (let i = 0; i < fullData.length; i += 4) {
    const [R, G, B] = fullData.slice(i, i + 3);
    gray.push((R * 299 + G * 587 + B * 114) / 1000);
  }

  console.log('----> gray', gray);

  const result = [];
  for (let y = 0; y < 28; y++) {
    for (let x = 0; x < 28; x++) {
      const grayInArea = [];
      for (let tmpX = x * 10; tmpX < (x + 1) * 10; tmpX++) {
        for (let tmpY = y * 10; tmpY < (y + 1) * 10; tmpY++) {
          grayInArea.push(getGray(tmpX, tmpY));
        }
      }
      result.push(getMean(...grayInArea));
    }
  }

  function getGray(x, y) {
    return gray[x + y * 280];
  }

  // // console.log('----> result', result);
  // const rowSize = 28;
  // const temp = split(result, rowSize);
  // // temp.map((r) => {
  // //   return r.map((t) => {
  // //     return t;
  // //   });
  // // });
  // console.log('---->', temp);

  return result;
}

// function split(arr, n) {
//   const res = [];
//   while (arr.length) {
//     res.push(arr.splice(0, n));
//   }
//   return res;
// }

export function getCoordinates(e) {
  let { clientX, clientY } = e;
  // for touch event
  if (e.touches && e.touches.length) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  }
  const { left, top } = e.target.getBoundingClientRect();
  const [x, y] = [clientX - left, clientY - top];
  return [x, y];
}
