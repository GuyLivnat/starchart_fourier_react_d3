

export default function timestep(coeff, time) {
    const frame = {orbits : []}
    let step = 2 * Math.PI * time;
    
    let theta = coeff[0];
    let x = 0;
    let y = 0;
  
    for (let i=0; i<coeff.length; i+=2) {
      let r = coeff[i];
      theta = coeff[i+1] + (step * i);
      frame.orbits.push ({
        x: x,
        y: y,
        angle: theta,
        r: r,
      })
      x += r * Math.cos(theta);
      y += r * Math.sin(theta);
    }
    // orbits.push ({
    //     x: x,
    //     y: y,
    //     angle: 0,
    //     r: 0,
    // })
    frame.edge = {
      x: x,
      y: y,
    }
    return frame

  }