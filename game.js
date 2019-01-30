///animation constants
        var canvasWidth = 600; 
        var canvasHeight = 500;
        
        var spriteWidth = 90; 
        var spriteHeight = 60; 
        //pokemon sprite: height:60, width:90
        //frankie sprite: height:150,width:225
        var rows = 2; 
        var cols = 3; 
        
        var trackRight = 1; 
        var trackLeft = 0; 
        var trackUp = 1;
        var trackDown = 0;


        var width = spriteWidth/cols; 
        var height = spriteHeight/rows; 
        
        var curFrame = 1; 
        var frameCount = 3; 
             
        var srcX; 
        var srcY; 
        
        var left = false; 
        var right = false;
        var up = false;
        var down = false;

///canvas & character constants
        var charX=120;
        var charY=240; 

        var speed = 10; 
        
        var canvas = document.getElementById('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight; 
        
        var ctx = canvas.getContext("2d");
        
        var character = new Image(); 
        character.src = "sprites\\ash_du.png";

        var initialize = true;

        var map = 0;

//divide map (600x500 canvas) into 59x49 tile map, 10 speed, character is 30 width

///////////////////////////game map object info - USE MODULES IN FUTURE

		function Obj(source,x,y,width,height){ //every game object is built from this
			this.img = new Image();
			this.img.src = source;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;	
		}

		var collideLeft = false;
		var collideTop = false;
		var collideBottom = false;
		var collideRight = false;

		function collision(obj){
				if(charX == obj.x - 30 && charY < (obj.height+obj.y)  && charY > obj.y - 30){
					collideLeft=true;
				}
				else{collideLeft = false;}

				if(charX == obj.x + obj.width && charY < (obj.height+obj.y)  && charY > obj.y - 30){
					collideRight = true;
				}
				else{collideRight = false;}

				if(charY == obj.y - 30 && charX > obj.x -30 && charX < obj.x + obj.width){
					collideTop = true;
				}
				else{collideTop = false;}

				if(charY == obj.y + obj.height && charX > obj.x -30 && charX < obj.x + obj.width){
					collideBottom = true;
				}
				else{collideBottom = false;}
		}

		var house = new Obj("sprites\\house.png", 100,120,120,120) //all need to be multiples of 10
		var house2 = new Obj("sprites\\house.png", 350,130,120,120)
		var bushesLeft = new Obj("sprites\\bushes.png", 0,0,240,60)
		var bushesRight = new Obj("sprites\\bushes.png", 360,0,240,60)
		var stumpsLeft = new Obj("sprites\\stumps.png", 0,50,50,460)
		var stumpsRight = new Obj("sprites\\stumps.png", 550,50,50,460)

		var palletStuff = [bushesLeft, bushesRight, stumpsLeft,stumpsRight, house2, house];

		function palletCollisions(){
			/////Event Collisions
			if(charY < 10){
				changeMap();
			}
			/////////Normal Collisions
			if(charY < bushesLeft.y + bushesLeft.height + 10  && charX < bushesLeft.width + 30){ // upper part of the screen
				collision(bushesLeft);
			}						
			else if(charY < bushesRight.y + bushesRight.height + 10  && charX > bushesRight.x - 31){ // upper part of the screen
				collision(bushesRight);
			}			
			else if(charY > house.y - 31 && charX < house.x + house.width + 1){ //left part of the screen starting at house height & width
				collision(house);
			}
			else if(charY > house.y - 31 && charX > house.x - house.width -1){ //right part of the screen starting at house height & width
				collision(house2);
			}
			/////No Collisions
			else{collideBottom=false;collideTop=false;collideRight=false;collideLeft=false;}
		}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////game object draw functions and prototypes
		
		function drawObject(obj){
			ctx.drawImage(obj.img,obj.x,obj.y,obj.width,obj.height);
		}

		function clearObject(obj){
			ctx.clearRect(obj.x,obj.y,obj.width,obj.height);
		}
		//function clearMap(previous_map)
		//function drawMap(new_map)

		function drawPallet(){
			for (var i = 0; i < palletStuff.length; i++){
				drawObject(palletStuff[i]);
			}
			palletCollisions();
			document.getElementById('canvas').style.background = "#f00 url('textures//grass.png')"
		}

		function drawVirdian(){
			document.getElementById('canvas').style.background = "#f00 url('textures//grunge.jpg')"
		}

		function changeMap(){
			if(map == 0){
				for (var i = 0; i < palletStuff.length; i++){
					clearObject(palletStuff[i]);
				}
				map +=1;
			}
			else if(map ==1){
				map =0;
			}
		}

		function getMap(){
			if(map == 0){
				drawPallet();
			}
			else if(map == 1){
				drawVirdian();
			}
		}

/////////////////////////////update frame, for all movements (character movements rn)
        function updateFrame(){

                srcX = curFrame * width; //set everything up
                ctx.clearRect(charX,charY,width,height);

                getMap();

                if(initialize){ //initialize
                    srcY = trackDown;
                    initialize=false;
                }                 

                //collision check
                if(right && collideLeft){
                	speed = 0;
                }
                else if(left && collideRight){
                	speed = 0;
                }
                else if(up && collideBottom){
                	speed = 0;
                }
                else if(down && collideTop){
                	speed = 0;
                }
                else{speed = 10;}

                //moving the dude
                if(left){
                    srcY = trackLeft * height; 
                    curFrame = ++curFrame % frameCount; 
                    character.src = "sprites\\ash_lr.png";
                    //"frankie_lr.png"
                    //"frankie_du.png"
                }
                else if(right){
                    srcY = trackRight * height; 
                    curFrame = ++curFrame % frameCount; 
                    character.src = "sprites\\ash_lr.png";
                }
                else if(down){
                    srcY = trackDown; 
                    curFrame = ++curFrame % frameCount; 
                    character.src = "sprites\\ash_du.png";
                }
                else if(up){
                    srcY = trackUp * width; 
                    curFrame = ++curFrame % frameCount; 
                    character.src = "sprites\\ash_du.png";
                }

                if(left && charX>50 && ~collideRight){
                    charX-=speed; 
                }
                else if(right && charX<canvasWidth-width - 50 && ~collideLeft){
                    charX+=speed; 
                }
                else if(down && charY<canvasHeight-height && ~collideTop){
                    charY+=speed; 
                }               
                else if(up && charY>0 && ~collideBottom){
                    charY-=speed; 
                }
        }

/////////////end of defining what to draw, actually draw it now

        function draw(){
            updateFrame();
			ctx.drawImage(character,srcX,srcY,width,height,charX,charY,width,height); //bc character moves
        }

/////////keyboard functions, unnecessary eventually        

        window.addEventListener('keydown', handleKeyDown, true)
        window.addEventListener('keyup', handleKeyUp, true)

        function handleKeyDown(event)//up 38,down 40,left 37,right 39. 65=a, 66=b
        {
            if (event.keyCode == 37) 
                    left = true;
            else if (event.keyCode == 39)
                    right = true;
            else if (event.keyCode == 38)
                    up = true;
            else if (event.keyCode == 40)
                    down = true;
            else if (event.keyCode == 65)
            		changeMap();
            else if (event.keyCode == 66)
            		changeMap();
        }

        function handleKeyUp(event)
        {
               if (event.keyCode == 37) {
                    left = false;
                    curFrame = 1;
               }
               else if (event.keyCode == 39){
                    right = false;
                    curFrame = 1;
               }

               else if (event.keyCode == 38){
                    up = false;
                    curFrame = 1;
               }

               else if (event.keyCode == 40){
                    down = false;
                    curFrame = 1;
               }

        }

////movement functions

        function goUp(){
            up = true;
            down = false;
            left = false;
            right = false;
        }
        function goDown(){
            up = false;
            down = true;
            left = false;
            right = false;           
        }
        function goLeft(){
            up = false;
            down = false;
            left = true;
            right = false;
        }
        function goRight(){
            up = false;
            down = false;
            left = false;
            right = true;
        }
        function setStill(){
            up = false;
            down = false;
            left = false;
            right = false; 
            curFrame = 1;             
        }

/////////////initialize and set the interval to udpate frame
        drawPallet(); //initialize stage, ie do while
        setInterval(draw,100);