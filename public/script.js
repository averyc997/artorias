
async function play() {
    const root = $('#root');
    root.on("click", "#begin", startGame);
    root.on("click", "#music", getMusic);

};

async function startGame(event) {
    
    let explain = `<div class="explain"><h1 id="longAgo">long ago, within the great age of fire, god king gwyn entrusted his most esteemed knight with a perilous task.</h1></div>`;
    let explain1 = `<div class="explain"><h1 id="longAgo">the knight artorias would be sent forth into the abyss to stop the evil Manus from encroaching upon gwyn's sunlight.</h1></div>`;
    let explain2 = `<div class="explain"><h1 id="longAgo">taking his trusted companion, the great wolf sif, he ventured into the abyss... but it was more than the duo could handle.</h1></div>`;
    let explain3 = `<div class="explain"><h1 id="longAgo">USE THE ARROW KEYS TO DODGE THE DARK MAGIC WHILE SIF MAKES HIS ESCAPE</h1></div>`;
    $('#startScreen').replaceWith(explain);
    setTimeout(function() {$('.explain').replaceWith(explain1);}, 6000);
    setTimeout(function() {$('.explain').replaceWith(explain2);}, 12000);
    setTimeout(function() {$('.explain').replaceWith(explain3);}, 18000);
    setTimeout(function() {$('.explain').replaceWith(runGame());}, 24000);
}

/*var spotifyApi = new SpotifyWebApi();
spotifyApi.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV']).then(
    function (data) {
      console.log('Albums information', data);
    },
    function (err) {
      console.error(err);
    }
);*/
//-----------------------------------------------------------------------------------------
/*window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQBR4yBQZiohhxID5aoqWDgk9xA61c3-EpHkKVtSy4C9raftvkJn9hWcpd9ecAXAOlLx1B9FBu0aVaRveCWQ0rZS0BoXYG4aXHaME1Mw2-1-ZMRXV9DaAxjMC9aXNrGV5eTd3FSmEjsvWnbd15XriGdA8nBzCy1qthnsmz5LZHOpeZOFkJGoubU';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
  
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });
  
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });
  
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  
    // Connect to the player!
    player.connect();
};*/
//---------------------------------------------------------------------------------------------
function getMusic() {
    let musics = `<div class="musics"><iframe src="https://open.spotify.com/embed/album/6MJSSPWvW8WISXI68yy48j" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    <iframe src="https://open.spotify.com/embed/album/5rq0BheaspnzakYDR2Z0pJ" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    <iframe src="https://open.spotify.com/embed/album/3zSvk9thQMwQDrKMD0kJJv" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    <div class="apis"></div>
    </div>`;

    $('#startScreen').replaceWith(musics);


};

function endGame() {
    let endGameScreen = `<div class="end"><div><h1 id="endh1">Artorias Succumbed to the Abyss...</h1></div><div id="endButton"><button onclick="window.location.reload();" id="refresh">Try Again?</button></div></div>`;
    $('#gameCanvas').replaceWith(endGameScreen);
}

async function runGame() {
    var gameCanvas = document.createElement('canvas');
    $(gameCanvas).attr('id', 'gameCanvas');
    $(gameCanvas).appendTo('#root');

    const ctx = gameCanvas.getContext('2d');
    gameCanvas.width = 1390;
    gameCanvas.height = 690;
    
    const keys = [];

    let artorias = {
        x: 1000,
        //1000
        x_velocity: 0,
        y: 400,
        //400
        y_velocity: 0,
        width: 150,
        height: 280,
        isHollow: false,
        moving: false,
        speed: 5,
        jumping: false,
        falling: false,
        attacking: false,
        framex: 0,
        framey: 0
    }

    class DarkHail {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            
        }

        update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }

    const playerSprite = new Image();
    playerSprite.src = "images/artorias123.png";
    const background1 = new Image();
    background1.src = "images/backgroundReel1.png";
    const manusSprite = new Image();
    //manusSprite.src = ;
    const humanitySprite = new Image();
    humanitySprite.src = "images/humanity1.png";

    function drawSprite(img, sx, sy, sw, sh, dx, dy, dw, dh) {
        ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    }

    let darkHail = [];

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function spawnDarkHail() {
        setInterval(() => {
            const x1 = getRandomInt(500) + 750;
            
            const y = 0;
            const radius = 30;
            const color = 'purple';
            const velocity = {
                x: 0,
                y: 5
            }

            darkHail.push(new DarkHail(x1, y, radius, color, velocity))
            
        }, 500);
    }

    /*function animate() {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.drawImage(background, 0, 0, gameCanvas.width, gameCanvas.height);
        drawSprite(playerSprite, artorias.width*artorias.framex, 0, artorias.width, artorias.height, artorias.x, artorias.y, artorias.width, artorias.height);
        moveArtorias();
        handleArtFrame();
        requestAnimationFrame(animate);
    }
    animate();*/

    window.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
        artorias.moving = true;
    });
    window.addEventListener("keyup", function(e) {
        delete keys[e.keyCode];
        artorias.moving = false;
    });

    function moveArtorias() {
        if (keys[37] && artorias.x > 600) {
            artorias.x -= artorias.speed;
            artorias.x_velocity -= 0.5;
            //artorias.framex = 1;
        }

        if (keys[39] && artorias.x < 1180) {
            artorias.x += artorias.speed;
            artorias.x_velocity += 0.5;
            //artorias.framex = 3;
        }

        if (keys[38] && artorias.jumping == false) {
            artorias.jumping = true;
            artorias.y_velocity -= 40;

        }

        if (keys[32] && artorias.attacking == false) {

        }

        artorias.y_velocity += 1.5;
        artorias.x += artorias.x_velocity;
        artorias.y += artorias.y_velocity;
        artorias.x_velocity *= 0.9;
        artorias.y_velocity *= 0.9;

        if (artorias.y >= 400) {
            artorias.jumping = false;
            artorias.y = 400;
            artorias.y_velocity = 0;
        }
    }

    /*function handleArtFrame() {
        if (artorias.framex < 2 && artorias.moving) {
            artorias.framex++;
            
            if (artorias.framex == 2) {
                artorias.framex = 0;
            }
        } else if (artorias.framex >= 2 && artorias.moving){
            artorias.framex++;
            if (artorias.framex == 4) {
                artorias.framex = 2;
            }
        }
    }*/
    let end = 0;
    
    let animId;
    function animate() {
        
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.drawImage(background1, 0, 0, gameCanvas.width, gameCanvas.height);
        drawSprite(playerSprite, artorias.width*artorias.framex, 0, artorias.width, artorias.height, artorias.x, artorias.y, artorias.width, artorias.height);
        moveArtorias();
        darkHail.forEach(darkHail => {
            darkHail.update();

            //const dist = Math.hypot(artorias.width - darkHail.x, artorias.height - darkHail.y);
            if ((darkHail.x > artorias.x && darkHail.x < (artorias.x + artorias.width)) && 
            (darkHail.y > (artorias.y+50) && darkHail.y < (artorias.y + artorias.height))) {
                endGame();
            }
        });
        //handleArtFrame();
        animId = requestAnimationFrame(animate);
        
        
    }
    animate();
    spawnDarkHail();
    
    /*let fpsInterval, startTime, now, then, elapsed;

    function startAnimating(fps) {
        fpsInterval = 1000/fps;
        then = Date.now();
        startTime = then;
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            ctx.drawImage(background, 0, 0, gameCanvas.width, gameCanvas.height);
            drawSprite(playerSprite, artorias.width*artorias.framex, 0, artorias.width, artorias.height, artorias.x, artorias.y, artorias.width, artorias.height);
            moveArtorias();
            handleArtFrame();
        }
    }

    startAnimating(10);*/
}

play();