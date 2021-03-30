var canvas=document.getElementById("myCanvas"),ctx=canvas.getContext("2d");canvas.addEventListener("mousedown",handleMenuClicks,!1),canvas.addEventListener("touchstart",handleMenuClicks,!1),canvas.addEventListener("mouseup",handleRelease,!1),canvas.addEventListener("touchend",handleRelease,!1),canvas.addEventListener("mousemove",handleMouseMove,!1),canvas.addEventListener("touchmove",handleMouseMove,!1),document.addEventListener("keydown",handleGameKeysDown,!1),document.addEventListener("keyup",handleGameKeysUp,!1);var size=10,key={left:!1,right:!1,up:!1,down:!1},playingGame=!1,showingHighScores=!1,playSmooth=!0,wallColor="#C69354",bgColor="#00254C",menuColor=wallColor,rainbowColors=["#F49AC2","#AEC6CF","#77BE77","#CFCFC4","#FDFD96","#826953"],sixButton={x:50,y:225,width:100,height:50,color:"#C69354"},tenButton={x:200,y:225,width:100,height:50,color:"#C69354"},fourteenButton={x:350,y:225,width:100,height:50,color:"#C69354"},hsButton={x:200,y:425,width:100,height:50,color:"#008800"},jsSquare={x:260,y:125,width:50,height:50,color:"#F1DA4E"},playerSymbol={x:50,y:50,width:50,height:50,color:"#FFFFFF"},objectiveSymbol={x:350,y:50,width:50,height:50,color:"#FF0000"},playerMenuRect={x:50,y:325,width:50,height:50,color:"#FFFFFF"},objectiveMenuRect={x:400,y:325,width:50,height:50,color:"#ff0000"},playerMenu=new playerSquare(playerMenuRect),objectiveMenu=new square(objectiveMenuRect),menuSpeed=2,cachedScores={},enteringHighScore=!1,validatedToken="",highScoreName="",highScoreAchieved=!1,highScoreDetermined=!1,justLost=!0;function resetGame(){menuSpeed=2,playingGame=!1,enteringHighScore=!1,highScoreAchieved=!1,highScoreDetermined=!1,justLost=!0,validatedToken="",highScoreName="",showingHighScores=!1,level=1,lost=!1,score=0,lowestTime=getStartingMinTimeBasedOnSize(size),milliseconds=0,size=10,allowed=getMaxTimeBasedOnSize(size),seconds=allowed,pathway=new map({width:size,height:size}),playerSymbol={x:50,y:50,width:50,height:50,color:"#FFFFFF"},objectiveSymbol={x:350,y:50,width:50,height:50,color:"#FF0000"},player=new playerSquare(playerSymbol),wallPos=[],walls=addWalls(),pathway.addWalls(wallPos),objective=new square(objectiveSymbol),playerMenuRect={x:50,y:325,width:50,height:50,color:"#FFFFFF"},objectiveMenuRect={x:400,y:325,width:50,height:50,color:"#ff0000"},playerMenu=new playerSquare(playerMenuRect),objectiveMenu=new square(objectiveMenuRect),xMouseMovement=0,yMouseMovement=0,isMouseDown=0,curMouseEvent=null,resetScreen(),clearInterval(timerInterval),drawAll()}function getMaxTimeBasedOnSize(a){if(6===a)return 6;return 10===a?6.25:14===a?6.5:void 0}function getStartingMinTimeBasedOnSize(a){if(6===a)return 3;return 10===a?3.25:14===a?3.5:void 0}var timerInterval,level=1,score=0,lowestTime=getStartingMinTimeBasedOnSize(size),milliseconds=0,allowed=getMaxTimeBasedOnSize(size),seconds=allowed,pathway=new map({width:size,height:size}),player=new playerSquare(playerSymbol),wallPos=[],walls=addWalls();pathway.addWalls(wallPos);var objective=new square(objectiveSymbol),xMouseMovement=0,yMouseMovement=0,isMouseDown=0,curMouseEvent=null,lost=!1;const welcomeMessage="CUBE HUNT",sixLabel="Mini",tenLabel="Normal",fourteenLabel="Massive",smoothLabel="Smooth",pureJsPureLabel="Pure",pureJsJsLabel="JS";var timeLabel="0.0",scoreLabel="0";const smoothBasePlayerSpeed=6,fps=60,fpsInterval=1e3/fps;var then,startTime,now,elapsed;then=Date.now(),startTime=Date.now(),setInterval(gameLoop,10);function gameLoop(){playingGame&&(lost?(justLost&&(drawWalls(),timeLabel=0,ctx.fillStyle="#000000",ctx.font="16px Arial",ctx.fillText(timeLabel,canvas.width/2-10,canvas.height/2-10),ctx.fillText(scoreLabel,canvas.width/2-10,canvas.height/2+10),drawDeterminingHighScore(),highScoreAchieved=checkForHighScore(score,size)),justLost=!1):0>=seconds?lost=!0:playGame(playSmooth)),animate()}function animate(){requestAnimationFrame(animate),now=Date.now(),elapsed=now-then,elapsed>fpsInterval&&(then=now-elapsed%fpsInterval,drawAll())}function drawRect(a){ctx.beginPath(),ctx.rect(a.x,a.y,a.width,a.height),ctx.fillStyle=a.color,ctx.fill()}function checkClickInRect(a,b,c){return!!(a>=c.x&&a<=c.x+c.width&&b>=c.y&&b<c.y+c.height)}function getMousePos(a,b){var c=a.getBoundingClientRect();return"undefined"==typeof b.clientX?{x:(b.touches[0].clientX-c.left)/(c.right-c.left)*a.width,y:(b.touches[0].clientY-c.top)/(c.bottom-c.top)*a.height}:{x:(b.clientX-c.left)/(c.right-c.left)*a.width,y:(b.clientY-c.top)/(c.bottom-c.top)*a.height}}function handleRelease(){isMouseDown=!1}function handleMouseMove(a){if(playingGame&&isMouseDown)return void(curMouseEvent=a)}function handleMenuClicks(a){return playingGame?(isMouseDown=!0,void(curMouseEvent=a)):void(mp=getMousePos(canvas,a),x=mp.x,y=mp.y,checkClickInRect(x,y,sixButton)?(size=6,playingGame=!0,canvas.width=300,canvas.height=300,setGame()):checkClickInRect(x,y,tenButton)?(size=10,playingGame=!0,canvas.width=500,canvas.height=500,setGame()):checkClickInRect(x,y,fourteenButton)?(size=14,playingGame=!0,canvas.width=700,canvas.height=700,setGame()):checkClickInRect(x,y,hsButton)&&(cachedScores=getAllTimeScores(),showingHighScores=!0))}function resetScreen(){canvas.width=500,canvas.height=500}function handleGameKeysDown(a){if(enteringHighScore){if(13===a.keyCode)20<highScoreName.length&&highScoreName.substring(0,19),submitHighScore(score,highScoreName,size,validatedToken),resetGame();else if(37==a.keyCode&&0<highScoreName.length)highScoreName=highScoreName.substring(0,highScoreName.length-1);else if(48<=a.keyCode&&57>=a.keyCode||65<=a.keyCode&&90>=a.keyCode){if(20===highScoreName.length)return;highScoreName+=a.key}else if(27===a.keyCode)return playingGame=!1,void resetGame();return}return 27===a.keyCode?(playingGame=!1,void resetGame()):void(("Right"==a.key||"ArrowRight"==a.key||"d"==a.key)&&(playSmooth||!1===key.right)&&(key.right=!0,!playSmooth)||("Left"==a.key||"ArrowLeft"==a.key||"a"==a.key)&&(playSmooth||!1===key.left)&&(key.left=!0,!playSmooth)||("Up"==a.key||"ArrowUp"==a.key||"w"==a.key)&&(playSmooth||!1===key.up)&&(key.up=!0,!playSmooth)||("Down"==a.key||"ArrowDown"==a.key||"s"==a.key)&&(playSmooth||!1===key.down)&&(key.down=!0,!playSmooth))}function handleGameKeysUp(a){("Right"==a.key||"ArrowRight"==a.key||"d"==a.key)&&(key.right=!1),("Left"==a.key||"ArrowLeft"==a.key||"a"==a.key)&&(key.left=!1),("Up"==a.key||"ArrowUp"==a.key||"w"==a.key)&&(key.up=!1),("Down"==a.key||"ArrowDown"==a.key||"s"==a.key)&&(key.down=!1)}function doRectsCollide(a,b){return!!(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y)}function resetKeys(){playSmooth&&!isMouseDown||(key.right=!1,key.left=!1,key.up=!1,key.down=!1)}function getDistTweenMouseAndPlayer(a,b){var c=Math.pow(a.x-b.x,2),d=Math.pow(a.y-b.y,2);return Math.sqrt(c+d)}function getMaxDistanceBySize(){return Math.sqrt(Math.pow(canvas.width,2)+Math.pow(canvas.height,2))}function getMinTimeBasedOnSize(a){if(6===a)return 1;return 10===a?1.33:14===a?1.66:void 0}function getMousePlayerSpeed(){var a=getDistTweenMouseAndPlayer(getMousePos(canvas,curMouseEvent),player.returnPos()),b=3,c=7,d=getMaxDistanceBySize(),e=smoothBasePlayerSpeed*3.1415*(a/d);if(e=e>c?c:e,e=e<b?b:e,e===c);return e}function playGame(){if(seconds=allowed-milliseconds/1e3,isMouseDown){mp=getMousePos(canvas,curMouseEvent),x=mp.x,y=mp.y,xMouseMovement=0,yMouseMovement=0;x>player.returnPos().x+25?key.right=!0:x<player.returnPos().x+25&&(key.left=!0),y>player.returnPos().y+25?key.down=!0:y<player.returnPos().y+25&&(key.up=!0)}if(key=doubleCheckMoves(key),resetKeys(isMouseDown),pathway.addPlayer(player.returnPos()),doRectsCollide(player.returnRect(),objective.returnRect()))if(walls.length===size*size-2)score+=2,levelUpNoScoreIncrement();else{if(pathway.setPlayerToObjective(),36-pathway.getEmpties().length!=walls.length+1){pathway.getEmpties()}var a=3<level?new square({x:-50,y:-50,width:50,height:50,color:rainbowColors[Math.floor(Math.random()*rainbowColors.length)]}):new square({x:-50,y:-50,width:50,height:50,color:wallColor});var b=pathway.addRandom("wall");a.place(b);for(var c=pathway.getOptions(player.returnPos()),d=[],e=0;e<c.length;e++)d.push(c[e].object);for(;-1===d.indexOf("_")&&-1===d.indexOf("O")||doRectsCollide(player.returnRect(),a.returnRect());){if(walls.length===size*size-4)return score+=4,void levelUpNoScoreIncrement();pathway.removeWalls([b]),b=pathway.addRandom("wall"),a.place(b),c=pathway.getOptions(player.returnPos()),d=[];for(var e=0;e<c.length;e++)d.push(c[e].object)}if(a.place(b),walls.push(a),wallPos.push(a.returnPos()),score+=1,walls.length===size*size-2)return score+=2,void levelUpNoScoreIncrement();for(var f,g=pathway.addWallsInUnreachableLocations(),h=0;h<g.length;h++){if(f=null,f=3<level?new square({x:-50,y:-50,width:50,height:50,color:rainbowColors[Math.floor(Math.random()*rainbowColors.length)]}):new square({x:-50,y:-50,width:50,height:50,color:wallColor}),f.place(g[h]),walls.push(f),wallPos.push(f.returnPos()),walls.length===size*size-2)return score+=3,void levelUpNoScoreIncrement();score+=1}if(walls.length>size*size-2)return void levelUpNoScoreIncrement();b=pathway.addRandom("objective"),objective.place(b),resetClock()}timeLabel=(Math.round(10*seconds)/10).toString(),scoreLabel=score.toString()}function levelUpNoScoreIncrement(){level+=1,pathway.removeWalls(wallPos),walls=addWalls(),lowestTime-1>=getMinTimeBasedOnSize(size)?lowestTime-=1:lowestTime=getMinTimeBasedOnSize(size),tempPos=pathway.addRandom("objective"),objective.place(tempPos),allowed=getMaxTimeBasedOnSize(size),seconds=allowed,resetClock()}function doubleCheckMoves(a){var b=Object.assign({},a),c=Object.assign({},player.returnRect()),d=checkIndividualMovesUp(a);player.place(c);var e=checkIndividualMovesDown(a);return player.place(c),d>=e?checkIndividualMovesUp(a):checkIndividualMovesDown(a),b}function checkIndividualMovesUp(a){var b=0;return!0===a.left?checkMove("LEFT")&&(b+=1):!0===a.right&&checkMove("RIGHT")&&(b+=1),!0===a.up?checkMove("UP")&&(b+=1):!0===a.down&&checkMove("DOWN")&&(b+=1),b}function checkIndividualMovesDown(a){var b=0;return!0===a.down?checkMove("DOWN")&&(b+=1):!0===a.up&&checkMove("UP")&&(b+=1),!0===a.right?checkMove("RIGHT")&&(b+=1):!0===a.left&&checkMove("LEFT")&&(b+=1),b}function loseGame(){}function drawLoserEntry(){drawRect({x:0,y:0,width:150,height:100,color:"#ff0000"}),ctx.fillStyle="#000000",ctx.font="12px Arial",ctx.fillText("No high score.",15,15),ctx.fillText("Press 'esc' to restart",15,35)}function checkForHighScore(a,b){validatedToken=submitState(pathway.graph.join(" "),a),cachedScores=getAllTimeScores();var c;return(6==b?c=cachedScores.mini:10==b?c=cachedScores.normal:14==b&&(c=cachedScores.massive),10>c.length)?(highScoreDetermined=!0,!0):a>parseInt(c[9].score)?(highScoreDetermined=!0,!0):(highScoreDetermined=!0,!1)}function submitState(a,b){var c={state:a,score:b.toString()},d=new XMLHttpRequest;d.open("PUT","https://gczjty0d8g.execute-api.us-east-2.amazonaws.com/prod/validation",!1),d.send(JSON.stringify(c));var e=d.responseText;return e}function updateClock(){milliseconds+=100}function setGame(){timerInterval=setInterval(updateClock,100),level=1,score=0,lowestTime=getStartingMinTimeBasedOnSize(size),milliseconds=0,allowed=getMaxTimeBasedOnSize(size),seconds=allowed,pathway=new map({width:size,height:size}),player=new playerSquare(playerSymbol),pathway.addPlayer(player.returnPos()),wallPos=[],walls=addWalls(),pathway.addWalls(wallPos),objective=new square(objectiveSymbol);var a=pathway.addRandom("objective");objective.place(a),key={left:!1,right:!1,up:!1,down:!1}}function addWalls(){return walls=[],wallPos=[],walls.push(new square({x:-50,y:-50,width:50,height:50,color:wallColor})),walls.push(new square({x:-50,y:-50,width:50,height:50,color:wallColor})),walls.push(new square({x:-50,y:-50,width:50,height:50,color:wallColor})),walls.push(new square({x:-50,y:-50,width:50,height:50,color:wallColor})),walls[0].place({x:Math.round(50*size/2-50),y:Math.round(50*size/2-50)}),walls[1].place({x:Math.round(50*size/2),y:Math.round(50*size/2-50)}),walls[2].place({x:Math.round(50*size/2-50),y:Math.round(50*size/2)}),walls[3].place({x:Math.round(50*size/2),y:Math.round(50*size/2)}),wallPos.push({x:Math.round(50*size/2-50),y:Math.round(50*size/2-50)}),wallPos.push({x:Math.round(50*size/2),y:Math.round(50*size/2-50)}),wallPos.push({x:Math.round(50*size/2-50),y:Math.round(50*size/2)}),wallPos.push({x:Math.round(50*size/2),y:Math.round(50*size/2)}),pathway.addWalls(wallPos),walls}function drawBackground(){drawRect({x:0,y:0,width:canvas.width,height:canvas.height,color:bgColor})}function drawAll(){if(!playingGame)showingHighScores?drawHighScores():drawMenu();else if(!lost){drawBackground(),drawWalls(),drawRect(player.returnRect()),drawRect(objective.returnRect());for(var a=0;a<walls.length;a++)drawRect(walls[a].returnRect);ctx.fillStyle="#000000",ctx.font="16px Arial",ctx.fillText(timeLabel,canvas.width/2-10,canvas.height/2-10),ctx.fillStyle="#000000",ctx.font="bold 16px Arial",ctx.fillText(scoreLabel,canvas.width/2-10,canvas.height/2+10)}else highScoreAchieved?drawHighScoreEntry():highScoreDetermined?drawLoserEntry():drawDeterminingHighScore()}function submitHighScore(a,b,c,d){var e={score:a.toString(),name:b,size:c.toString(),token:d},f=new XMLHttpRequest;f.open("PUT","https://gczjty0d8g.execute-api.us-east-2.amazonaws.com/prod/scores",!0),f.send(JSON.stringify(e))}function drawHighScoreEntry(){enteringHighScore=!0;loserRect={x:0,y:0,width:150,height:100,color:"#00ff00"},drawRect(loserRect),ctx.fillStyle="#000000",ctx.font="12px Arial",ctx.fillText("HIGH SCORE!",15,15),ctx.fillText("Press 'enter' to restart",15,35),ctx.fillText("<-- for backspace",15,55),ctx.fillText(highScoreName,15,75)}function drawDeterminingHighScore(){determiningRect={x:0,y:0,width:150,height:100,color:"#666666"},drawRect(determiningRect),ctx.fillStyle="#000000",ctx.font="12px Arial",ctx.fillText("Checking for high score...",15,15),ctx.fillText("Press 'esc' to restart now",15,35)}function drawWalls(){for(var a,b=0;b<walls.length;b++)a=walls[b].returnRect(),drawRect({x:a.x,y:a.y,width:a.width,height:a.height,color:a.color})}function updateMenuAnimation(){var a=doRectsCollide(playerMenuRect,objectiveMenuRect);a&&(switchMenuObjective(),menuSpeed=-1*menuSpeed);var b={x:playerMenu.returnPos().x+menuSpeed,y:playerMenu.returnPos().y};playerMenu.move(b)}function switchMenuObjective(){var a=100>objectiveMenu.returnPos().x?400:50;var b={x:a,y:objectiveMenu.returnPos().y};objectiveMenu.place(b)}function drawMenu(){ctx.clearRect(0,0,canvas.width,canvas.height),updateMenuAnimation(),drawBackground(),drawRect(playerMenuRect),drawRect(objectiveMenuRect),drawRect(sixButton),drawRect(tenButton),drawRect(fourteenButton),drawRect(jsSquare),drawRect(hsButton),ctx.font="30px Arial",ctx.fillStyle="#ffffff",ctx.fillText(welcomeMessage,160,100),ctx.fillText(pureJsPureLabel,185,170),ctx.font="16px Arial",ctx.fillStyle="#000000",ctx.fillText("High Scores",207,455),ctx.fillText(sixLabel,83,255),ctx.fillText(tenLabel,223,255),ctx.fillText(fourteenLabel,370,255),ctx.font="30px Arial",ctx.fillText(pureJsJsLabel,275,170)}function drawHighScores(){ctx.clearRect(0,0,canvas.width,canvas.height),drawBackground();var a=cachedScores.mini,b=cachedScores.normal,c=cachedScores.massive;console.log("M "+a),drawScoresInColumn(a,"MINI",25),drawScoresInColumn(b,"NORMAL",195),drawScoresInColumn(c,"MASSIVE",375)}function drawScoresInColumn(a,b,c){ctx.font="16px Arial",ctx.fillStyle="#ffffff",ctx.fillText(b,c,20);for(var d=0;d<a.length&&10>d;d+=1)ctx.fillText((d+1).toString()+") "+a[d].name+": "+a[d].score,c,20*(d+2))}function getAllTimeScores(){var a=new XMLHttpRequest;a.open("GET","https://gczjty0d8g.execute-api.us-east-2.amazonaws.com/prod/scores",!1),a.send(null);var b=a.responseText;b=b.replace(/'/g,"\""),console.log(b),scoreResponse=JSON.parse(b);for(var c={mini:[],normal:[],massive:[]},d=0;d<scoreResponse.length;d++)"6"===scoreResponse[d].size?c.mini.push({score:scoreResponse[d].score,name:scoreResponse[d].name}):"10"===scoreResponse[d].size?c.normal.push({score:scoreResponse[d].score,name:scoreResponse[d].name}):"14"===scoreResponse[d].size&&c.massive.push({score:scoreResponse[d].score,name:scoreResponse[d].name});return c.mini.sort((c,a)=>parseInt(c.score)<parseInt(a.score)?1:-1),c.normal.sort((c,a)=>parseInt(c.score)<parseInt(a.score)?1:-1),c.massive.sort((c,a)=>parseInt(c.score)<parseInt(a.score)?1:-1),c}function resetClock(){var a=size/6-.4;allowed-a>=lowestTime?allowed-=a:allowed=lowestTime,seconds=allowed,milliseconds=0}function arePositionsEqual(a,b){return!(a.x!==b.x||a.y!==b.y)}function checkMove(a){var b=player.returnPos(),c={x:0,y:0},d=player.returnPos(),e=d.x,f=d.y,g=50;c.x=d.x,c.y=d.y;var h=50;if(playSmooth&&(h=smoothBasePlayerSpeed,isMouseDown&&(h=getMousePlayerSpeed())),"LEFT"===a?(c.x=d.x-h,e=d.x-d.x%g):"RIGHT"===a?(c.x=d.x+h,e=d.x+(g-d.x%g)):"UP"===a?(c.y=d.y-h,f=d.y-d.y%g):"DOWN"==a&&(c.y=d.y+h,f=d.y+(g-d.y%g)),playSmooth){var i=c,j={x:e,y:f},k=c.x%g,l=c.y%g,m=Math.abs(e-d.x),n=Math.abs(f-d.y);(k<h||g-k>-h||l<h||g-l>-h)&&m<h&&n<h&&(0!==m||0!==n)&&(i={x:e,y:f},j=c);checkBoundaryAndCollision(d,i);arePositionsEqual(b,player.returnPos())&&checkBoundaryAndCollision(d,j)}else playSmooth||"X"!==pathway.getObject(c)&&(player.move(c),pathway.addPlayer(c));return!arePositionsEqual(b,player.returnPos())}function checkBoundaryAndCollision(a,b){if(0<=b.x&&b.x<=50*size-50&&0<=b.y&&b.y<=50*size-50){var c=!1;player.move(b);for(var d=0;d<walls.length;d++)doRectsCollide(player.returnRect(),walls[d].returnRect())&&(c=!0);return!c||(player.move(a),!1)}return!1}gameLoop();