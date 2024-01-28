<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HagmusPay</title>

</head>

<style>
    html {
        height: 100%;
    }

    h1,
    h2 {
        font-family: arial;
        color: dimgray;
    }

    h2 {
        margin-top: -10px;
    }

    body {
        font-family: arial;
        margin: 0px;
        padding: 20px;
        background: #fcfbff;
        background-size: cover;
        height: cover;
        background-repeat: no-repeat;
    }


    body>div {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }


    .profile-container {
        height: 800px;
    }

    canvas {
        height: 200px;
        width: 200px;
        border: 1px solid lightgray;
        border-radius: 50%;
        border: solid white;
        /*  background-image: url("https://www.w3schools.com/howto/img_avatar.png");*/
        background-position: center;
        background-size: 200px;
        object-fit: cover;
    }

    /* Inputs */


    ::file-selector-button {
        border-radius: 20px;
    }

    ::file-selector-button:hover {
        cursor: pointer;
    }

    input {
        font-size: 14pt;

    }

    name-input>input {
        border-radius: 20px;
        padding: 4px;
        padding-left: 10px;
        margin-bottom: 5px;
        border: solid 1px;
        /*
box-shadow: 6px 3px 4px 0 rgb(34 34 34 / 10%) inset;
    background: #FFFFFF; */
    }

    bio-input>textarea {
        height: 100px;
        border-radius: 10px;
        padding: 20px;



    }

    .bio-wrapper {
        display: flex;
    }

    #bio-edit {
        margin-top: 65px;
        margin-right: 10px;
    }

    .center {
        display: flex;
        justify-content: center;
    }

    button-save:hover {
        cursor: pointer;
    }

    button-save {
        margin-top: 20px;
        width: 220px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #7B61FF;
        /*border: solid 0.5px black;*/
        border-radius: 10px;
        text-align: center;
    }

    #save-btn {
        transition: all 0.5s;
    }

    .saved {
        background: #4CAF50;
        width: 100px;
        border-radius: 20px;
    }

    /* Card Container */

    .profile-container {
        display: block;
        padding: 20px;
        padding-bottom: 2px;
        padding-top: 10px;
        margin-top: 5px;
        display: flex;
        justify-content: center;
        width: auto;

    }

    .profile-card,
    .profile-card-pop {
        display: block;
        background: white;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        border-radius: 40px;
        max-height: 550px;
        min-width: 400px;
        overflow: hidden;
    }

    .profile-card {
        background: linear-gradient(160deg, #7B61FF, #fcfbff, #fcfbf6);
    }

    .profile-card-pop {
        max-height: 465px;
        margin-top: -15px;
        padding: 20px;
        overflow: auto;
        overflow-x: hidden;
        white-space: nowrap;
        background: #D7E6F5;
        background: #e4dbff;
    }


    .cover-pic {
        /*  cover picture  */
        max-height: 100px;
    }


    .cover-sizer>img {

        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0 0 50% 50% /0 0 20% 100%;

    }

    .profile-top {
        /*  pic and name  */
        display: flex;
        justify-content: center;

    }

    p-bio {
        display: flex;
        justify-content: center;
        text-align: center;
        margin-left: 50px;
        /*  margin: 45px 25px 25px; */
        padding-top: 0px;
        font-size: 1rem;
        max-width: 300px;

    }



    /* Grids */
    .grid-container {
        display: grid;
        grid-template-columns: auto auto;
        max-width: 400px;
    }

    .grid-item {
        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 0px;
        text-align: center;
        overflow: hidden;
    }

    .grid-item>img {
        width: 100%;
        height: 100%;
        max-width: 200px;

    }

    .grid-item>img:hover {
        cursor: pointer;
    }


    /* Animated pop ups */

    .gameinfo {
        width: 200px;
        height: 50px;
        background-color: red;
        display: inline-block;
        margin-top: 300px;
        transition: all 0.5s;
    }

    .gameinfo:hover {
        height: 200px;
        margin-top: -150px
    }



    /* SCROLL BAR */

    ::-webkit-scrollbar {
        width: 0px;
    }

    @media(max-width: 970px) {
        body {
            padding-bottom: 100px;
            background: black;
            padding: 0px;
        }
    }

    @media(max-width: 490px) {
        body>div {
            padding: 0px;
            margin: 0px;
        }

        .profile-container {
            margin: 0px;
            margin-bottom: 160px;
            padding: 0px;
            width: 90vw;
        }

        .profile-card,
        .profile-card-pop {
            min-width: 300px;
            width: 80vw;
        }

        #h1edit {
            font-size: 20px;
        }

        p-bio {
            margin: 4px;
        }

        name-input input {
            width: 70%;
        }

        .bio-wrapper {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
        }
    }
</style>
<script src="https://www.dukelearntoprogram.com/course1/common/js/image/SimpleImage.js">
</script>

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<!-- Upload function from Duke University tutorial -->


<body>
    <div ng-app="profileText" ng-controller="myCtrl">

        <div class="profile-container">
            <div class="profile-card">
                <br>
                <!--  Pop up edit profile  -->

                <div class="profile-container">
                    <div class="profile-card-pop">
                        <div class="center">
                            <h2 style="margin-top: 5px;color: #7B61FF;">Upload Profile Picture</h2>
                        </div>

                        <canvas id="canEdit"></canvas>

                        <form action="/action_page.php">
                            <input type="file" multiple="false" accept="image/*" id="finput" onchange="upload()" style='color: white; '>
                            <input type="hidden" name="token" value="<?php echo $_GET["token"] ?>">
                            <input type="text">
                            <div class="center">
                                <button-save id="save-btn" onclick=saveProfileEdit() style='color: white; font-weight: bold;'> SAVE </button-save>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        var saveEl = document.getElementById("save-btn");

        function upload() {
            //Get input from file input
            var fileinput = document.getElementById("finput");
            //Make new SimpleImage from file input
            var image = new SimpleImage(fileinput);
            //Get canvas
            var canvas = document.getElementById("can");
            //Get Canvas from edit page
            var canvasEdit = document.getElementById("canEdit");
            //Draw image on canvas
            image.drawTo(canvas);
            image.drawTo(canvasEdit);

            saveEl.className = "save-btn";
            document.getElementById("save-btn").innerHTML = "SAVE";
        }


        // _______________________________
        //NAME INPUT

        var app = angular.module('profileText', []);
        app.controller('myCtrl', function($scope) {
            $scope.firstName = "Andrew";
            $scope.lastName = "Freeman";
            $scope.userTag = "freedomAF"
            $scope.bio = "I am a freedom loving freedom type of free person who enjoys doing free things in my free time.";


        });

        // _______________________________
        //needs save onclick
        function needssave() {
            saveEl.className = "save-btn";
            document.getElementById("save-btn").innerHTML = "SAVE";
        }

        // _______________________________
        //Save button profile
        function saveProfileEdit() {
            var saveEl = document.getElementById("save-btn");
            saveEl.className = "saved";
            document.getElementById("save-btn").innerHTML = "SAVED ✓";
        }
    </script>
</body>

</html>