var gameSettings = {
    hits: 0,
    isOver: false,
    interval: "",
    hitInterval: "",
    count: 0,
    nextNumber: 1
}

function init() {
    gameSettings.interval = setInterval(numbersFactory, 1000);
}

$("#bucket").on("touchmove", moveBucketMobile); function moveBucketMobile(e) {
    //move mobile 
    var posX = e.touches[0].clientX - ($("#bucket").width() / 2);
    var posY = e.touches[0].clientY - ($("#bucket").height() / 2);
    $("#bucket").css("left", posX + "px");
    //$("#bucket").css("top", posY + "px");
}


function gameDuration() {
    if (!gameSettings.isOver) {
        $(".number").each(function () {
            //number Offset
            var numberbottom = $(this).offset().top + $(this).height();
            var numberTop = $(this).offset().top;
            var numberRight = $(this).offset().left + $(this).width();
            var numberLeft = $(this).offset().left;

            //number Offset
            var bucketBottom = $("#bucket").offset().top + $("#bucket").height();
            var bucketTop = $("#bucket").offset().top;
            var bucketRight = $("#bucket").offset().left + $("#bucket").width();
            var bucketLeft = $("#bucket").offset().left;

            if ((numberbottom > bucketTop) && (numberRight > bucketLeft && numberLeft < bucketRight)) {
                var number = parseInt($(this).html());
                resolveNumber(number);
            }
        });
    }

    else {
        clearInterval(gameSettings.hitInterval);
        clearInterval(gameSettings.interval);
        resetGame();
    }

}




function checkHit() {
    gameSettings.hitInterval = setInterval(gameDuration(), 10);
}

function resolveNumber(number) {
    console.log(gameSettings.nextNumber, "nextNumber");
    console.log(number, "number");
    if (gameSettings.nextNumber == number) {
        if (number == 10) {
            gameSettings.isOver = true;
            alert("YOU WIN!");
        }

        else {
            gameSettings.nextNumber = number + 1;
            gameSettings.hits = gameSettings.hits + 1;
            $("#result").text(gameSettings.nextNumber);
        }

    }

    else {
        failed();
    }

}

function failed() {
    //failed function clearInterval(gameSettings.hitInterval);
    clearInterval(gameSettings.interval);
    alert("failed");
    $("#result").text(1);
    resetGame();
    init();
}

function numbersFactory() {
    gameSettings.count++;
    var number = Math.ceil(Math.random() * 10);
    var leftPos = Math.ceil(Math.random() * 80);
    var ele = "<div class='drop-number number' style='left:" + leftPos + "%;'>" + number + "</div>";
    $("#game").append(ele);
    if (gameSettings.count > 4) {
        // remove last element to not overload the dom $(".number").first().remove();
        $(".number").first().remove();
    }

    checkHit();
}

function resetGame() {
    gameSettings =

        {
        strikes: 0,
        hits: 0,
        isOver: false,
        interval: "",
        hitInterval: "",
        count: 0,
        nextNumber: 1
        }

    $(".number").remove();
}

//bucket move 
var theThing = document.querySelector("#bucket");
var container = document.querySelector(".container");
container.addEventListener("click", function (event) {
var xPosition = event.clientX - container.getBoundingClientRect().left - (theThing.clientWidth / 2);

// in case of a wide border, the boarder-width needs to be considered in the formula above
theThing.style.left = xPosition + "px";

        } ); init();
