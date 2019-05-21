<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Video game</title>
        <link rel="stylesheet" href="style.css">
        <link rel="icon" href="smiley-icon.png" type="image" sizes="32x32">
    </head>
    <body>
        <div>
            <h1> Score table </h1>
        </div>


        <?php
        $user='user';
        $password='password';
        $database='database';

        echo "<table style='border: solid 1px black;'>"; // talbe for scores
        echo "<tr><th>Player Name</th><th>Score</th></tr>"; // columns for player and score
        
        class TableRows extends RecursiveIteratorIterator { // found this class from internet to insert data to table
            function __construct($it) { 
                parent::__construct($it, self::LEAVES_ONLY);
            }

            function current() {
                return "<td style='width: 150px; border: 1px solid black;'>" . parent::current(). "</td>";
            }

            function beginChildren() { 
                echo "<tr>"; 
            } 

            function endChildren() { 
                echo "</tr>" . "\n";
            }
        }
        
        // fetches data from database
        try {
            $conn = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT playername, score FROM scores ORDER BY score DESC;"); 
            $stmt->execute();

            // set the resulting array to associative
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
            
            foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
                echo $v;
            }
        }
        catch(PDOException $e) { // error cathing
            echo "Error: " . $e->getMessage();
        }
        $conn = null;
        echo "</table>";
        ?> 
    </body>
</html>
