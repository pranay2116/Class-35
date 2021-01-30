    var ball;
    var database,position;

    function setup(){
        // calling the database 
        database = firebase.database()
        createCanvas(500,500);
        ball = createSprite(250,250,10,10);
        ball.shapeColor = "red";
        // calling the position form the database 
        var Ballposition = database.ref('Ball/Position')
        Ballposition.on("value",Readposition)
    }

    function draw()
    {
        background("white");
        // checking if there are any vales for position 
        if (position!== undefined)
        {
            if(keyDown(LEFT_ARROW)){
                WritePosition(-1,0);
            }
            else if(keyDown(RIGHT_ARROW)){
                WritePosition(1,0);
            }
            else if(keyDown(UP_ARROW)){
                WritePosition(0,-1);
            }
            else if(keyDown(DOWN_ARROW)){
                WritePosition(0,+1);
            }
            drawSprites();
        }
    }

    // updating the position on the database 
    function WritePosition(x,y)
    {
        database.ref('Ball/Position').set({
            'x' : position.x + x , 
            'y' : position.y + y 
        })
    }

    // allowing the database to read the values 
    function Readposition(Data)
    {
    position = Data.val()
    ball.x = position.x;
    ball.y = position.y;
    }