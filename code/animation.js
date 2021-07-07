let tl = gsap.timeline({repeat: -1});

let yHigh = 60;
let yLow = 180;
let yTop = -160;


tl.set("#wrap", {scale:1.2});
tl.add([
  gsap.timeline({defaults: {ease: "power1.inOut"}})
  .set(".box", {x: -190})
  .to(".box", 1, {x: 190})
  .to(".box", 1, {x: -190})
], 0);

tl.add([
  gsap.timeline({defaults: {ease: "power0.inOut"}})
  .set(".box", {rotation: -340})
  .to(".box", .1, {rotation: "-=15", ease: "power1.out"})
  .to(".box", .9, {rotation: 340, ease: "circ.inOut"})
  // .to(".box", .1, {rotation: 345, ease: "power1.out"})
  .to(".box", .1, {rotation: "+=15", ease: "power1.out"})
  .to(".box", .9, {rotation: -340, ease: "circ.inOut"})
  // .to(".box", .1, {rotation: -345, ease: "power1.out"})
], 0);

let upBox = CustomEase.create("custom", "M0,0,C0.272,0,0.628,0.098,0.696,0.552,0.8,1.248,0.958,1.026,1,1");

tl.add([
  gsap.timeline({defaults: {ease: "power1.inOut"}, repeat: 1})
  .set(".box", {y: yHigh+6})
  .to(".box", .07, {y: yHigh, ease: "circ.out"}) // ends the little pop as ball makes contact with an easeOut. 
  .to(".box", .43, {y: yLow})
  .to(".box", .47, {y: yHigh+12, ease: "circ.in"})
  .to(".box", .03, {y: yHigh+6, ease: "power0.out"}) //starts the little pop right before loop point with an easeIn.
                                                 //Together with the first tween, makes an inOut across the loop point.
], 0);


//// ball bounce

//X
tl.add([
  gsap.timeline({defaults: {ease: "power0"}})
  .set(".ball", {x: -180})
  .to(".ball", .94, {x: 180}, .03)
  .to(".ball", .94, {x: -180}, "+=.06")
  .to(".ball", .03, {})
], 0);

//Y
tl.add([
  gsap.timeline({repeat: 1, repeatDelay: 0})
  .set(".ball", {y: 78})
  .to(".ball", .47, {y: yTop, ease: "circ.out"}, "+=.03")
  .to(".ball", .47, {y: 78, ease: "circ.in"})
  .to(".ball", .03, {})
], 0);

//SQUASH AND STRETCH
tl.add([
  gsap.timeline({repeat: 1, repeatDelay: 0, defaults: {transformOrigin: "50% 50%"}}) //Repeats 1 bc this is half the dur of the main tl.
    .set(".ball", {scaleX: 1.5,scaleY: .6}) //squash
    .to(".ball", .04, {scaleX: .6, scaleY: 2, ease: "power4.in"}) //stretch
    .to(".ball", .46, {scaleX: 1, scaleY: 1, ease: "circ.out"}) //ball form
    .to(".ball", .46, {scaleX: .6, scaleY: 2, ease: "circ.in"}) //stretch
    .to(".ball", .04, {scaleX: 1.5,scaleY: .6, ease: "power4.out"}) //squash
], 0);

//ROTATION
tl.add([
  gsap.timeline({defaults: {ease: "power1.inOut"}})
  .set(".ball", {rotation: 20})
  .to(".ball", 1, {rotation: 160})
  .to(".ball", 1, {rotation: 20})
], 0);


tl.timeScale(1)
