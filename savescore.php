<!doctype html>
<html>
    <head>
        <title>saved</title>
        <meta charset="utf-8" />
    </head>
    <body>

        <?php
        session_start();
        // connects to database
        include "connect.php";
        $conn = connect_db();
        
        // inserts playername and score to database
        $sql = "INSERT INTO scores(playername,score) VALUES('" . $_POST['playername'] . "','" . $_POST['score'] . "');";
        $result = mysqli_query($conn, $sql);
        mysqli_close($conn);
        
        // redirects to scoretable
        header("Location: http://157.230.106.87/vaistelypeli/scoretable.php", true, 301);
        exit();
        ?>

    </body>
</html>
