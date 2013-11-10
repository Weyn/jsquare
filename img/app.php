<!DOCTYPE html>
<html>
<head>
    <title>Thumbler</title>
</head>
<body>

    <?php

        include('Thumbler.php');

        $thumbler = new Thumbler('/home/maciek/js/jsquare/img');
        if($thumbler->generate(300)){
            echo 'SUCCESS!';
        }

    ?>

</body>
</html>