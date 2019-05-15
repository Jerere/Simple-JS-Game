<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Video-Game</title>
        <link rel="stylesheet" href="style.css">
        <link rel="icon" href="smiley-icon.png" type="image" sizes="32x32">
    </head>
    <body onload="startGame()">
        <div class="header">
            <h1>Väistely Peli ☺</h1>
        </div>
        <div>
            <button onClick="window.location='scoretable.php';" class="button-scoreboard">Scoreboard</button>
        </div>
        <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-top">
                    <p>Game over :(</p>
                </div>
                <div class="modal-middle">
                    <p id="p1"></p>
                </div>
                <div class="modal-middle2">
                    <form action="savescore.php" method="post">
                        <div class="input-div">
                            <input id="nameinput" name="playername" type="text" placeholder="Your name">
                            <input id="score" type="hidden" name="score" value="">
                        </div>
                        <div class="savebutton-div">
                            <input type="submit" name="submit" value="Save Score" id="buttonSave" class="buttonSave">
                        </div>
                    </form>
                </div>
                <div class="modal-bottom">
                    <button id="buttonTry" class="buttonTry">Play again</button>
                </div>
            </div>
        </div>

        <script src="game.js"></script>
        <script src="colorShift.js"></script>
        <script src="popup.js"></script>

    </body>
</html>
