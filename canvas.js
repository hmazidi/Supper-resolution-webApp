function refresh(){
    window.location.reload(false);
}


function init(){
    document.getElementById("startBotton").onclick=function(){startSess()};
    
    document.getElementById("enter_img").onclick=function(){startSess()};

    // document.getElementById("BtnMovieBlink").onclick=function(){ShowMovie()};
}


function ShowMovie(){
    
    hide(document.getElementById("real_exp_descp"))
    var y=document.getElementById("MT_DL")
    var x=document.getElementById("DiffLimitedImg")
    x.src="Asset/MT_DL_croped.png";
    setDisplayProperty(y,'block')
    
    setTimeout(function(){
        TransDuration=2;
        y.style.transitionDuration=TransDuration.toString()+'s';
        y.style.visibility="hidden"
        y.style.opacity="0"},2000)

        setTimeout(function(){
        TransDuration=2;
        x.src="Asset/MT_SR.png";
        y.webkitTransitionProperty="all"
        y.style.transitionDuration=TransDuration.toString()+'s';
        y.style.visibility="visible"
        y.style.opacity="1"
        setDisplayProperty(y,'block')
    },4000)
}


function startSess(){

    var y=document.getElementById("mainMenue");
    var TransDuration=1;
    y.style.transitionDuration = TransDuration.toString()+'s';
    y.style.webkitTransitionProperty="all";
    y.style.visibility= "hidden"; 
    y.style.opacity="0"; 
    setTimeout(function(){
    
      var x = document.getElementById("mainContainer");
    var y=document.getElementById("mainMenue");
    setDisplayProperty(x, "flex");
  hide(y);
  },TransDuration*1000)
   

  }

  function NonDisp(){
    if (animStatus=="off"|| animStatus=="exit"){
    setTimeout(function(){
    var z=document.getElementById("MicroscopeImg");
    z.src="Asset/MicroscopeOff.png";
    var z3=document.getElementById("MiscroscopeAnim2");
    var z4=document.getElementById("MicroscopeDesc2");
    
    setDisplayProperty(z3, "flex");
    setDisplayProperty(z4, "flex");
   
    },3000);
}
  }

  function NonDisp2(){
    
    hide_smooth(document.getElementById("microscope"));
    hide_smooth(document.getElementById("microscopeSR"));
    hide_smooth(document.getElementById("MT_DL"));
    hide_smooth(document.getElementById("SMdescription2"));

    c.fillStyle=bgColor;
    c.clearRect(0,0,canvas.width,canvas.height)

    hide_smooth(document.getElementById("score_box"));
    
    hide_smooth(document.getElementById("game-over"));
    var z=document.getElementById("vid-gallery") 
    animStatus="exit";
    setTimeout(function(){
        TransDuration=2;
        z.webkitTransitionProperty="all"
        z.style.transitionDuration=TransDuration.toString()+'s';
        z.style.visibility="visible"
        z.style.opacity="1"
        },1500)
    
}


  function DispFunc(){
    if (animStatus=="off" || animStatus=="exit"){
    var z=document.getElementById("MicroscopeImg");
    z.src="Asset/MicroscopeLogo.png";

    setTimeout(function(){var x = document.getElementById("MT_DL");
    var y=document.getElementById("SMdescription");
   
    var TransDuration=2;
    x.style.visibility="visible";
    x.style.webkitTransitionProperty="all";
    x.style.transitionDuration = TransDuration.toString()+'s';
    x.style.opacity="1"; 
    setDisplayProperty(x, "block");
    setDisplayProperty(y, "block");
    NonDisp();
},1000);
}
  }



  function DispFunc2(){
    var z=document.getElementById("MicroscopeImg2");
    z.src="Asset/MicroscopeLogo2.png";
 
    setTimeout(function(){
if (animStatus=="off" ||animStatus=="exit")init_game();
},1800);

}

function hide(el_id){
    el_id.style.display = "none";

  }

  function setDisplayProperty(el_id,displayProp){
    // check for valid input
    el_id.style.display=displayProp;
  }
function hide_smooth(el_id){
    setTimeout(function(){
        TransDuration=.5;
        el_id.style.transitionDuration=TransDuration.toString()+'s';
        el_id.style.visibility="hidden"
        el_id.style.opacity="0"},300)
}
// ==========================================
var canvas = document.querySelector('canvas');
// set canves width and hieght
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

// name of the image to be reconstructred
var SR_img = "./Asset/DNA_strand.png";
var DiffLimted_img="./Asset/DNA_DL_no_lens2.png"
// bgColor
var bgColor="rgb(0,0,0)";
c.fillStyle=bgColor;

// blinking parameters
var num_mol = 4;
var exposureTime = 200;


// ==============================
// variable for mouse's position
var mouse = {

    x: undefined,
    y: undefined
}

// ===============================
// window info
var windowInfo={

    width:undefined,
    height:undefined
}
// ==============================
// animation ID

var animId=undefined;
var animStatus="exit";

// handling events for resizing the browser

window.addEventListener('resize', function () {
    
 
    windowInfo.width = window.innerWidth;
    windowInfo.height = window.innerHeight;

    if (animStatus=="off" && windowInfo.width!=undefined && windowInfo.width!=canvas.width){

                    
    
        // update and clear 
        
        
        canvas.height=windowInfo.height;
        canvas.width=windowInfo.width;
        c.fillStyle=bgColor;
        c.clearRect(0, 0, canvas.width, canvas.height);
        init_game();

}
});


// ==============================
// handling events for mouse's position
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});



//  add an event handler to initiate the animation in the main page
// document.getElementById("SR_anim").onmouseover=function(){

var SR_cover_area = { precentage_width: 1/2.5, precentage_height: 1 };


function init_game(gameID){
    if (typeof gameID!=undefined){
        cancelAnimationFrame(gameID);
    }
    document.getElementById("score_box").style.visibility="visible";
    document.getElementById("score_box").style.opacity=1;
    c.fillStyle=bgColor;
    c.clearRect(0, 0, canvas.width, canvas.height);

    var z=document.getElementById("MicroscopeImg2");
    z.src="Asset/MicroscopeLogo2.png";

    if (animStatus=="off" || animStatus=="exit"){
    animStatus="on";
    AnimateSupereRes(SR_img, DiffLimted_img,SR_cover_area);
    }
}

// init_game();

// main function
// ==============================
function AnimateSupereRes(source_img,source_Diff_img,cover_area) {


    var canvas_off = document.createElement('canvas')
    var ctx_off = canvas_off.getContext('2d');

    // create an image element
    var img = new Image();
    // check cross-origin https://stackoverflow.com/questions/41965066/access-to-image-from-origin-null-has-been-blocked-by-cors-policy
    img.crossOrigin = "Anonymous"; 
    var img_diff_limited= new Image();

    // on loading 

    img_diff_limited.onload = function () {

        
       c.drawImage(img_diff_limited, canvas.width/2-img_diff_limited.width/5-20
        ,canvas.height/2-img_diff_limited.height/2 , img_diff_limited.width, img_diff_limited.height);

    }

    // the image to be loaded
    img_diff_limited.src = source_Diff_img;
    // when image is loaded, perform animation
    img.onload = function () {

        // set the canves size 
        canvas_off.width = img.width;
        canvas_off.height = img.height;

        ctx_off.drawImage(img, 0, 0, img.width, img.height);

        //  get image data for blinking
        var w_data = (cover_area.precentage_width * canvas_off.width) | 0;
        var h_data = (cover_area.precentage_height * canvas_off.height) | 0;
        var start_x_pos = ((1 - cover_area.precentage_width) / 2 * canvas_off.width);

        var imgd = canvas_off.getContext('2d').getImageData(start_x_pos, 0, w_data, h_data);

        //  get image data for diffraction-limited vis.
        var w_data_DL = (canvas_off.width) | 0;
        var h_data_DL = (canvas_off.height) | 0;


        pixels = imgd.data;
    
        
        var positions = [];
        // get the pixel data=>pixel values :[red,green,blue,transparency]
        var data32 = new Uint32Array(pixels.buffer);

        for (i = 0; i < data32.length; i++) {
            // filter those pixels with low intensity
            if (data32[i] & 0xffff0000 && pixels[i * 4] < 26) {

                positions.push({
                    x: canvas.width / 2+start_x_pos - (canvas_off.width)/5+ (i % w_data),
                    // make sure y is an integer by performing bit-wise or with 0
                    y: canvas.height / 2 - h_data / 2 + ((i / w_data) | 0),

                    a: pixels[i * 4 + 3] / 255,
                    r: pixels[i * 4 + 0],
                    g: pixels[i * 4 + 1],
                    b: pixels[i * 4 + 2]
                });
            }
        };

        circleArray = CircleArrayPos(positions);


        c.fillStyle="wheat"
        c.textAlign="center";
        c.font = "700 24px Source Code Pro,monospace";
        cool_phrase="Tap the blinks!";
        c.fillText(cool_phrase,canvas.width / 2+start_x_pos - (canvas_off.width)/5+w_data/2-(cool_phrase.length)/2,
        canvas.height / 2+2*h_data_DL);


        // lens parameters
        var lens_x_pos = canvas.width / 2+start_x_pos - (canvas_off.width)/5+w_data/2;
        var lens_y_pos = canvas.height / 2 ;
        var innerRadius_lens = w_data_DL/ 50;
        var outerRadius_lens = w_data_DL/ 4;
        let localizedIndx=[];

        var prog = 0;
        var PlayerScore=0;
        var num_caugth=0;
        var num_frame=360/5+1

        exposureTime_t=5*exposureTime;
        createLens(lens_x_pos, lens_y_pos, innerRadius_lens, outerRadius_lens, prog);
        function animate() {
            // update player score
            document.getElementById('score').innerHTML = PlayerScore;
            document.getElementById('game-over').style.display="none";

            setTimeout(function () {

                
                let animId = requestAnimationFrame(animate);

                
                if(prog==0) exposureTime_t=exposureTime;


                createLens(lens_x_pos, lens_y_pos, innerRadius_lens, outerRadius_lens, prog);


                //  c.fillRect(0, 0, canvas.width, canvas.height/2);
                for (var i = 0; i < num_mol; i++) {

                    var index = Math.floor(Math.random() * circleArray.length);
                    var blink_color=[193, 39, 45];
                    circleArray[index].draw(blink_color);



                    var LocalizedBool=circleArray[index].update();
                    if(LocalizedBool){
                        localizedIndx.push(index)
                        num_caugth++;
                        PlayerScore= Math.ceil(100*(num_caugth/(num_frame*num_mol))).toString()+'%';
                    
                    };


                    

                    if (prog >= 395) {
                        cancelAnimationFrame(animId);
                        animStatus="off";
                        var z=document.getElementById("MicroscopeImg2");
                        z.src="Asset/MicroscopeOff.png";


                        // clear the old text
                        
                        // c.fillStyle=bgColor;
                        // c.textAlign="center";
                        // var metrics = c.measureText(cool_phrase),
                        // rect = {
                        //     x: canvas.width/2-8*(cool_phrase.length),
                        //     y: canvas.height / 4+2*h_data_DL,
                        //     width: 1.2*metrics.width,
                        //     height: 35 ,
                        // };
                        
                        
                        // c.fillRect(rect.x, rect.y-rect.height/2, rect.width, rect.height);

                        //  new phrase
                        // c.fillStyle="wheat";

                        // phrase="well done!";
                        
                        // c.fillText(phrase,(canvas.width/2-(phrase.length)/2),canvas.height / 4+2*h_data_DL);
                        setTimeout(function(){
                        img_diff_limited.onload = function () {

                            c.save();
        
                            c.globalAlpha=.6;
                            
                            c.drawImage(img_diff_limited, canvas.width/2-img_diff_limited.width/5-20,
                                canvas.height/2+canvas.height/2.5-img_diff_limited.height/2 , 
                                img_diff_limited.width, img_diff_limited.height);
                                // createLens(canvas.width/2, canvas.height/2+canvas.height/4, innerRadius_lens,
                                //      outerRadius_lens, 360,true);
                                c.restore();
                                
                         }
                     
                         // the image to be loaded
                         img_diff_limited.src = source_Diff_img; 
                        },500);
                        setTimeout(function(){
                            

                            createLens(lens_x_pos, lens_y_pos, innerRadius_lens, outerRadius_lens, prog);

                        // // put SR on blurred image
                        // // pick a random subset of size say num_spots
                        var num_spots = Math.min(800,circleArray.length/5);
                        //  shuffleArray(circleArray);
                         var blink_color=[245, 222, 179];
                         var radisuSuperResolved=4;

                        for(let i=0;i<localizedIndx.length;i++){
                            
                            setTimeout(function(){
                                var j_dec=0;
                                var j_inc=0

                                while(j_dec<3|| j_inc<3 ){
                                
                                    if(localizedIndx[i]+5*j_inc<num_spots){
                                    circleArray[localizedIndx[i]+5*j_inc].draw(blink_color,radisuSuperResolved);}

                                    if (localizedIndx[i]-5*j_dec>=0){
                                        circleArray[localizedIndx[i]-5*j_dec].draw(blink_color,radisuSuperResolved);}
                            
                            j_inc++;
                            j_dec++;}
                            },500);}

                                

                        },1000);       

                        setTimeout(function(){
                            document.getElementById('game-over').style.display="block";

                        },3000);

                        
                       
                    }
                }
                prog = prog + 5;

                if (windowInfo.width!=undefined && windowInfo.width!=canvas.width){

                    
    
                        // update and clear 
                        
                        animStatus="off";
                        canvas.height=windowInfo.height;
                        canvas.width=windowInfo.width;
                        c.fillStyle=bgColor;
                        c.fillRect(0, 0, canvas.width, canvas.height);
                        init_game(animId);
    
                }

            }, exposureTime_t);

         
        }
        animate();
        



    }
    // the image to be loaded
    img.src = source_img;
}



// utility functions
// ==============================

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// blurred circles
// ---------------
function blurredSpot(pos, radius) {
    this.x = pos.x;
    this.y = pos.y;
    this.red = pos.r;
    this.grn = pos.g;
    this.bl = pos.b;
    this.a = pos.a;
    this.radius = radius;
    this.draw = function (color,radisu_draw) {

        this.color = color;
        if(radisu_draw==undefined){
            radisu_draw= this.radius;
            innerRadius = this.radius/50 ;
            outerRadius = this.radius; 
        }
        innerRadius = radisu_draw/50 ;
        outerRadius =radisu_draw;
        var gradient = c.createRadialGradient(this.x, this.y,
            innerRadius, this.x, this.y, outerRadius);
        gradient.addColorStop(0, 'rgba(' + this.color[0].toString() +
            ',' + this.color[1].toString() + ',' + this.color[2].toString() + ',.8)');
        gradient.addColorStop(1, 'rgba(' + this.color[0].toString() +
            ',' + this.color[1].toString() + ',' + this.color[2].toString() + ',0)');

        c.beginPath();
        c.arc(this.x, this.y, radisu_draw, 0, 2 * Math.PI);
        c.fillStyle = gradient;
        c.fill();
    }

    this.localize = function (h_localization_offset,radius_localizations) {

        c.beginPath();
        if (h_localization_offset==undefined){
        // set the offset poition of the localizations
        var h_localization_offset = canvas.height / 2.5;
        }
        
        // radius of localization spots
        if (radius_localizations==undefined){
             var radius_localizations = 3;
                }
        // c.arc(this.x, this.y + h_localization_offset, radius_localizations, 0, 2 * Math.PI);
        c.arc(this.x, this.y, radius_localizations, 0, 2 * Math.PI);
    
        c.fillStyle = "#f5deb3";
        // c.fillStyle='rgba('+this.red+','+ this.grn+','+this.bl+','+this.a+')';
        c.fill();
        c.closePath();
        // smily face
        // c.beginPath();
        // c.arc(this.x-2, this.y+10, 15, 0, 1 * Math.PI,false);
        // c.strokeStyle = "white";
        // c.lineWidth = 2;
        // c.stroke();
        // c.closePath();

        c.beginPath();
        c.arc(this.x, this.y+h_localization_offset, radius_localizations, 0, 2 * Math.PI);
        c.fillStyle ="#f5deb3";
        c.fill();

        c.closePath();

    }

    this.update = function () {
        // check if the user got the blink

        if (Math.sqrt(Math.pow(mouse.x - this.x, 2) +
            Math.pow(mouse.y - this.y, 2)) < 1.4 * this.radius) {

            this.localize();
            return true;
        }
        return false;
    }
}


// a function for generating random cricles
// ----------------------------------------

function cricleArray_inti(num_spot) {

    var circleArray = [];
    // var    maxRadius=50;

    for (var i = 0; i < 40; i++) {
        var radius = 50;
        // var x=window.innerWidth/6+10*i;
        // var y=window.innerHeight/6+10*i;
        // if (i>20){
        //     x=window.innerWidth/6+10*(i-21);
        // 	y=window.innerHeight/6+200-10*(i-21);
        // }
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight / 2 - radius;
        circleArray.push(new blurredSpot(x, y, radius));
        circleArray[i].draw([255, 255, 255]);


    }
    return circleArray;
}

// CircleArrayPos put a blurredSpot for each position specified
// in  pos into an the array  circleArray
// -------------------------------------------------------------
function CircleArrayPos(pos, radius = 40) {
    // create an array for circle objects specified by
    // a position and a radius 
    var circleArray = [];

    for (var i = 0; i < pos.length; i++) {

        circleArray.push(new blurredSpot(pos[i], radius));

        // circleArray[i].draw([102,0,102]);

    }

    return circleArray;
}


// create a lens 
// =============
function createLens(lens_x_pos, lens_y_pos, innerRadius, outerRadius, prog = 360,
    transparent_in=false) {
    // lens_x_pos: x-coordinate of the center of the lens
    // lens_y_pos: y-coordinate of the center of the lens
    // innerRadius: inner radius of the circle for creating a radial gradient effect
    // outerRadius: outer radius of the circle for creating a radial gradient effect
    // prog: the progress value from 0 to 360 (whole cicle). The default is 360.

    this.lens_x_pos = lens_x_pos;
    this.lens_y_pos = lens_y_pos;
    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;
    this.prog = prog;

    // display progress
    c.beginPath();
    c.arc(this.lens_x_pos, this.lens_y_pos, this.outerRadius + 10, 0, Math.PI * (this.prog / 180));
    c.lineWidth = 30;
    c.strokeStyle = 'rgb(168,168,168,1)';
    c.stroke();

    // outer ring of the lens
    c.beginPath();
    c.arc(this.lens_x_pos, this.lens_y_pos, this.outerRadius + 10, 0, Math.PI * 2);
    c.lineWidth = 5;
    c.strokeStyle = 'rgb(150,150,150,1)';
    c.stroke();

    // create a gradient for the lens
    if (transparent_in){
    lens_alpha_inner=.02;
    lens_alpha_outer=1;}
    else{

        lens_alpha_inner=1;
        lens_alpha_outer=1;
    };

    var lens_inner_color = 'rgba(125,172,152,'+lens_alpha_inner.toString()+')';
    var lens_in_color = [2, 56, 62];


    var gradient_lens = c.createRadialGradient(this.lens_x_pos, this.lens_y_pos,
        this.innerRadius, this.lens_x_pos, this.lens_y_pos, this.outerRadius);

    gradient_lens.addColorStop(0, lens_inner_color);

    gradient_lens.addColorStop(1, 'rgba(' + lens_in_color[0].toString() +
        ',' + lens_in_color[1].toString() + ',' + lens_in_color[2].toString() + ','+
        lens_alpha_outer.toString() +')');

    c.beginPath();
    //  c.arc(canvas.width/2, canvas.height/3,canvas_off_b.width/3-20,0,2*Math.PI);
    c.arc(this.lens_x_pos, this.lens_y_pos, this.outerRadius + 10, 0, 2 * Math.PI);
    c.fillStyle = gradient_lens;
    c.fill();
    c.closePath();
}


// draw an image on canvas
// =======================

function drawImageOnCanves(source_img,x,y) {
    // source_img: string- the image to be drawn

    var canvas_off_b = document.createElement('canvas')
    var ctx_off_b = canvas_off_b.getContext('2d');
    // create an image element
    var img_b = new Image();
    img_b.onload = function () {

        // set the canves size appropriately
        canvas_off_b.width = img_b.width;
        canvas_off_b.height = img_b.height;
        if (pos==undefined){
            pos.x=canvas.width / 2-img_b.width / 2;
        }
        if (pos==undefined){

            pos.y=canvas.height / 3 - canvas_off_b.height /2;
        }
        c.drawImage(img_b, x, y, img_b.width, img_b.height);

        //  get image data 
        // var imgd = canvas_off_b.getContext('2d').getImageData(0,0,canvas_off_b.width, canvas_off_b.height);
        // // place the image at a desire position 
        // c.putImageData(imgd, canvas.width/2-img_b.width/2,canvas.height/3-canvas_off_b.height/2);
    }

    img_b.src = source_img;
    // return the size of the image
    return [canvas_off_b.width, canvas_off_b.height];
}

function PixelDataToArray(source_img, cover_area) {
    // source_img: string- the image to be drawn

    var canvas_off = document.createElement('canvas')
    var ctx_off = canvas_off.getContext('2d');

    // create an image element
    var img = new Image();
    img.onload = function () {

        // set the canves size 
        canvas_off.width = img.width;
        canvas_off.height = img.height;

        ctx_off.drawImage(img, 0, 0, img.width, img.height);

        //  get image data 
        var w_data = (cover_area.precentage_width * canvas_off.width) | 0;
        var h_data = (cover_area.precentage_height * canvas_off.height) | 0;
        var start_x_pos = ((1 - cover_area.precentage_width) / 2 * canvas_off.width);

        var imgd = canvas_off.getContext('2d').getImageData(start_x_pos, 0, w_data, h_data);

        pixels = imgd.data;
        var positions = [];
        // map the pixels in the off-screen canvas back to the main canvas
        var data32 = new Uint32Array(pixels.buffer);
        for (i = 0; i < data32.length; i++) {
            // filter those pixels with low intensity
            if (data32[i] & 0xffff0000 && pixels[i * 4] < 26) {
                positions.push({
                    x: canvas.width / 2 - w_data / 2 + (i % w_data),
                    // make sure y is an integer by performing bit-wise or with 0
                    y: canvas.height / 3 - h_data / 2 + ((i / w_data) | 0),
                    // pixel values :[red,green,blue,transparency]
                    a: pixels[i * 4 + 3] / 255,
                    r: pixels[i * 4 + 0],
                    g: pixels[i * 4 + 1],
                    b: pixels[i * 4 + 2]
                });
            }
        };
        circleArray = CircleArrayPos(positions);
    }
    // the image to be loaded
    img.src = source_img;
}


function drawPixelDataOnCanvas(circleArray_in, black_backg = true) {
    // circleArray: array of blurredSpot objects


    for (i = 0; i < circleArray_in.length; i++) {

        if (black_backg) {
            if (circleArray_in[i].red>0);

            circleArray_in[i].red =  193;
            circleArray_in[i].grn =  39
            circleArray_in[i].bl = 45;

        };
        circleArray_in[i].draw([circleArray_in[i].red, circleArray_in[i].grn, circleArray_in[i].bl]);
    };
}

// ==================================

function setupParticles(positions) {
    var i = positions.length;
    var particles = [];
    while (i--) {
        var p = new Particle();
        p.init(positions[i]);
        _particles.push(p);

        drawParticle(p);
    }
}

function drawParticle(particle) {
    var x = particle.x;
    var y = particle.y;

    c.beginPath();
    c.fillStyle = `rgba(255,255,109,${particle.alpha})`;

    c.fillRect(x, y, 1, 1);
}

function Particle() {
    this.init = function (pos) {
        this.x = pos.x;
        this.y = pos.y + 30;
        this.x0 = this.x;
        this.y0 = this.y;
        this.xDelta = 0;
        this.yDelta = 0;
        this.alpha = pos.a;
    }
}


function getTextCanvasData(pos) {
    // var w = 300, h = 150, ratio = 2;

    c.imageSmoothingEnabled = false;
    c.fillStyle = "rgb(255, 255, 255)";

    var person = prompt("Please enter your name");

    width = canvas.width;
    height = canvas.height;

    c.font = "64px CASTELLAR";
    c.fillText(person, pos[0], pos[1]);

    var pixels = c.getImageData(0, 0, width, height).data;
    var data32 = new Uint32Array(pixels.buffer);
    var positions = [];
    for (i = 0; i < data32.length; i++) {
        if (data32[i] & 0xffff0000) {
            positions.push({
                x: (i % width),

                y: ((i / width) | 0),
                a: pixels[i * 4 + 3] / 255
            });
        }
    }

    return positions;
}




    