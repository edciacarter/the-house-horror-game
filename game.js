function chooseA() {

    document.getElementById("story").innerHTML = `
        You slowly walk upstairs.

        <br><br>

        The footsteps suddenly stop.

        <br><br>

        You see a bedroom door slightly open.

        <br><br>

        What do you do?
    `;

    document.getElementById("choices").innerHTML = `

        <button onclick="openDoor()">
            A. Open the bedroom door
        </button>

        <button onclick="keepWalking()">
            B. Keep walking down the hallway
        </button>

    `;
}


function chooseB() {

    document.getElementById("story").innerHTML = `
        You quietly enter the kitchen.

        <br><br>

        You find a large kitchen knife.

        <br><br>

        Suddenly...

        <br><br>

        <strong>CRASH!</strong>

        <br><br>

        Something just broke upstairs.

        <br><br>

        What do you do?
    `;

    document.getElementById("choices").innerHTML = `

        <button onclick="investigate()">
            A. Go upstairs
        </button>

        <button onclick="hide()">
            B. Hide in the kitchen
        </button>

    `;
}


function openDoor() {

    document.getElementById("story").innerHTML = `
        You slowly push the door open.

        <br><br>

        The room is empty.

        <br><br>

        You take one step inside.

        <br><br>

        The door suddenly SLAMS shut behind you.

        <br><br>

        <strong>YOU ARE NOT ALONE.</strong>
    `;

    document.getElementById("choices").innerHTML = `

        <button onclick="runAway()">
            A. Run!
        </button>

        <button onclick="stay()">
            B. Turn around
        </button>

    `;
}


function keepWalking() {

    document.getElementById("story").innerHTML = `
        You keep walking.

        <br><br>

        The hallway seems to get longer.

        <br><br>

        You look behind you.

        <br><br>

        The bedroom door is now completely open.

        <br><br>

        Something is standing inside.
    `;

    document.getElementById("choices").innerHTML = `

        <button onclick="runAway()">
            A. Run downstairs
        </button>

        <button onclick="stay()">
            B. Walk toward it
        </button>

    `;
}


function investigate() {

    document.getElementById("story").innerHTML = `
        You grab the knife and slowly walk upstairs.

        <br><br>

        The hallway is completely dark.

        <br><br>

        You hear breathing behind you.

        <br><br>

        You turn around...

        <br><br>

        <strong>GAME OVER.</strong>
    `;

    document.getElementById("choices").innerHTML = `
        <button onclick="location.reload()">
            PLAY AGAIN
        </button>
    `;
}


function hide() {

    document.getElementById("story").innerHTML = `
        You hide underneath the kitchen table.

        <br><br>

        Footsteps enter the kitchen.

        <br><br>

        Something walks past you.

        <br><br>

        You hold your breath...

        <br><br>

        The footsteps disappear.

        <br><br>

        <strong>You survived... for now.</strong>
    `;

    document.getElementById("choices").innerHTML = `
        <button onclick="location.reload()">
            PLAY AGAIN
        </button>
    `;
}


function runAway() {

    document.getElementById("story").innerHTML = `
        You sprint down the hallway.

        <br><br>

        Something is chasing you.

        <br><br>

        You reach the front door.

        <br><br>

        You pull it open...

        <br><br>

        <strong>YOU ESCAPED.</strong>
    `;

    document.getElementById("choices").innerHTML = `
        <button onclick="location.reload()">
            PLAY AGAIN
        </button>
    `;
}


function stay() {

    document.getElementById("story").innerHTML = `
        You slowly turn around.

        <br><br>

        There's nothing there.

        <br><br>

        You breathe a sigh of relief.

        <br><br>

        Then you hear a whisper:

        <br><br>

        <strong>"Don't turn around."</strong>

        <br><br>

        You already did.

        <br><br>

        <strong>GAME OVER.</strong>
    `;

    document.getElementById("choices").innerHTML = `
        <button onclick="location.reload()">
            PLAY AGAIN
        </button>
    `;
}
