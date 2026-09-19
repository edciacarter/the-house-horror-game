// ================================
// THE HOUSE
// CHAPTER ONE
// PHASE 3 — THE HOUSE REMEMBERS
// ================================


const gameState = {

    health: 100,
    sanity: 100,
    battery: 100,
    clues: 0,
    inventory: [],

    sceneCount: 0,
    scaresSeen: [],
    distortionLevel: 0,

    // ================================
    // HOUSE MEMORY
    // ================================

    houseVisits: {},
    changedRooms: [],
    entitySeen: false,
    houseAwake: false,
    photographChanged: false,
    hallwayChanged: false

};


// ================================
// TEMPORARY EVENT CONTROL
// ================================

let temporaryEventTimer = null;


function clearTemporaryEvent() {

    if (temporaryEventTimer) {

        clearTimeout(temporaryEventTimer);

        temporaryEventTimer = null;

    }

}


// ================================
// HUD
// ================================

function updateHUD() {

    document.getElementById("health").textContent =
        gameState.health;

    document.getElementById("sanity").textContent =
        gameState.sanity;

    document.getElementById("battery").textContent =
        gameState.battery + "%";

    document.getElementById("clues").textContent =
        gameState.clues;


    const inventoryElement =
        document.getElementById("inventory");


    if (gameState.inventory.length === 0) {

        inventoryElement.textContent = "Empty";

    } else {

        inventoryElement.textContent =
            gameState.inventory.join(" • ");

    }


    updateVisualEffects();

}


// ================================
// VISUAL EFFECTS
// ================================

function updateVisualEffects() {

    const body = document.body;


    body.classList.remove("insane");

    if (gameState.sanity <= 25) {

        body.classList.add("insane");

    }


    body.classList.remove(
        "flashlight-warning",
        "flashlight-critical",
        "flashlight-dead"
    );


    if (gameState.battery <= 0) {

        body.classList.add("flashlight-dead");

    }

    else if (gameState.battery <= 25) {

        body.classList.add("flashlight-critical");

    }

    else if (gameState.battery <= 50) {

        body.classList.add("flashlight-warning");

    }


    body.classList.remove(
        "health-critical"
    );


    if (gameState.health <= 25) {

        body.classList.add(
            "health-critical"
        );

    }

}


// ================================
// HEALTH
// ================================

function changeHealth(amount) {

    gameState.health += amount;


    if (gameState.health > 100) {

        gameState.health = 100;

    }


    if (gameState.health <= 0) {

        gameState.health = 0;

        updateHUD();

        showDeath(
            "YOUR BODY COULDN'T TAKE ANY MORE."
        );

        return false;

    }


    updateHUD();

    return true;

}


// ================================
// SANITY
// ================================

function changeSanity(amount) {

    gameState.sanity += amount;


    if (gameState.sanity > 100) {

        gameState.sanity = 100;

    }


    if (gameState.sanity <= 0) {

        gameState.sanity = 0;

        updateHUD();

        showDeath(
            "YOU LOST YOUR MIND BEFORE YOU COULD ESCAPE."
        );

        return false;

    }


    updateHUD();

    return true;

}


// ================================
// FLASHLIGHT
// ================================

function useBattery(amount) {

    gameState.battery -= amount;


    if (gameState.battery < 0) {

        gameState.battery = 0;

    }


    updateHUD();


    if (
        gameState.battery <= 25 &&
        Math.random() < 0.35
    ) {

        flashlightScare();

    }

}


// ================================
// CLUES
// ================================

function findClue() {

    gameState.clues++;

    updateHUD();

}


// ================================
// ITEMS
// ================================

function addItem(item) {

    if (!gameState.inventory.includes(item)) {

        gameState.inventory.push(item);

        updateHUD();

    }

}


// ================================
// DEATH
// ================================

function showDeath(message) {

    clearTemporaryEvent();


    document.getElementById("story").innerHTML =

        `<div class="death">
            YOU DIED
        </div>

        <p>${message}</p>

        <button onclick="location.reload()">
            TRY AGAIN
        </button>`;


    document.getElementById("choices").innerHTML = "";

}


// ================================
// FLASHLIGHT SCARE
// ================================

function flashlightScare() {

    if (
        gameState.scaresSeen.includes("flashlight")
    ) {

        return;

    }


    gameState.scaresSeen.push("flashlight");


    const story =
        document.getElementById("story");


    const original =
        story.innerHTML;


    story.innerHTML = `

        <p>
            The flashlight flickers.
        </p>

        <p>
            For half a second,
            you see someone standing at the end of the hallway.
        </p>

        <p>
            You blink.
        </p>

        <p>
            <em>There is nothing there.</em>
        </p>

    `;


    clearTemporaryEvent();


    temporaryEventTimer = setTimeout(() => {

        story.innerHTML = original;

        temporaryEventTimer = null;

    }, 2800);

}


// ================================
// RANDOM HORROR EVENT
// ================================

function randomHorrorEvent() {

    if (gameState.sanity > 60) {

        return;

    }


    const events = [

        {
            id: "whisper",

            text: `
                <p><em>Someone whispers your name.</em></p>
            `
        },


        {
            id: "wrong",

            text: `
                <p>
                    For a moment, you forget where you are.
                </p>

                <p>
                    You remember being here before.
                </p>
            `
        },


        {
            id: "breathing",

            text: `
                <p>
                    You hear breathing.
                </p>

                <p>
                    It stops when you stop breathing.
                </p>
            `
        },


        {
            id: "footsteps",

            text: `
                <p>
                    Footsteps echo somewhere above you.
                </p>

                <p>
                    Then another set answers from below.
                </p>
            `
        }

    ];


    const available =
        events.filter(
            event =>
                !gameState.scaresSeen.includes(event.id)
        );


    if (available.length === 0) {

        return;

    }


    if (Math.random() > 0.28) {

        return;

    }


    const event =
        available[
            Math.floor(
                Math.random() * available.length
            )
        ];


    gameState.scaresSeen.push(event.id);


    const story =
        document.getElementById("story");


    const original =
        story.innerHTML;


    story.innerHTML += `

        <div style="
            margin-top:25px;
            color:#777;
            font-style:italic;
        ">

            ${event.text}

        </div>

    `;


    clearTemporaryEvent();


    temporaryEventTimer = setTimeout(() => {

        story.innerHTML = original;

        temporaryEventTimer = null;

    }, 3500);

}


// ================================
// HALLUCINATION
// ================================

function triggerHallucination() {

    if (gameState.sanity > 35) {

        return;

    }


    if (Math.random() > 0.22) {

        return;

    }


    const story =
        document.getElementById("story");


    const hallucinations = [

        "DON'T LOOK BEHIND YOU.",

        "YOU HAVE BEEN HERE BEFORE.",

        "IT IS STANDING BEHIND YOU.",

        "WHY DID YOU COME BACK?",

        "YOUR NAME IS WRITTEN ON THE WALL.",

        "THIS IS NOT YOUR FIRST NIGHT HERE."

    ];


    const message =
        hallucinations[
            Math.floor(
                Math.random() *
                hallucinations.length
            )
        ];


    const original =
        story.innerHTML;


    story.innerHTML = `

        <div style="
            color:#8b0000;
            letter-spacing:3px;
            margin-bottom:20px;
        ">

            ${message}

        </div>

        ${original}

    `;


    clearTemporaryEvent();


    temporaryEventTimer = setTimeout(() => {

        story.innerHTML = original;

        temporaryEventTimer = null;

    }, 1800);

}


// ================================
// PHONE DISTURBANCE
// ================================

function phoneDisturbance() {

    if (gameState.sanity > 45) {

        return;

    }


    if (Math.random() > 0.18) {

        return;

    }


    const story =
        document.getElementById("story");


    const original =
        story.innerHTML;


    story.innerHTML = `

        <p>
            Your phone vibrates.
        </p>

        <p>
            <em>UNKNOWN NUMBER</em>
        </p>

        <p>
            "I CAN SEE YOU."
        </p>

    `;


    clearTemporaryEvent();


    temporaryEventTimer = setTimeout(() => {

        story.innerHTML = original;

        temporaryEventTimer = null;

    }, 2500);

}


// ================================
// PHASE 3 — HOUSE MEMORY
// ================================

function trackHouseVisit(sceneName) {

    if (!gameState.houseVisits[sceneName]) {

        gameState.houseVisits[sceneName] = 0;

    }


    gameState.houseVisits[sceneName]++;


    if (
        gameState.sceneCount >= 8 &&
        !gameState.houseAwake
    ) {

        gameState.houseAwake = true;

    }

}


// ================================
// HOUSE REACTION
// ================================

function getHouseReaction(sceneName) {

    const visits =
        gameState.houseVisits[sceneName] || 0;


    // ================================
    // FOYER
    // ================================

    if (
        sceneName === "foyer" &&
        visits >= 2
    ) {

        return `

            <p style="color:#777;">
                You stop.
            </p>

            <p>
                Something is different.
            </p>

            <p>
                You are certain there was a door here before.
            </p>

            <p>
                Now there is only a wall.
            </p>

        `;

    }


    // ================================
    // KITCHEN
    // ================================

    if (
        sceneName === "kitchen" &&
        visits >= 2
    ) {

        return `

            <p>
                The drawer you left open is closed.
            </p>

            <p>
                You did not close it.
            </p>

        `;

    }


    // ================================
    // HALLWAY
    // ================================

    if (
        sceneName === "hallway" &&
        visits >= 2
    ) {

        gameState.hallwayChanged = true;


        return `

            <p>
                You stare down the hallway.
            </p>

            <p>
                There were three doors before.
            </p>

            <p>
                Now there are four.
            </p>

            <p>
                You count them again.
            </p>

            <p>
                <em>Four.</em>
            </p>

        `;

    }


    // ================================
    // BEDROOM
    // ================================

    if (
        sceneName === "bedroom" &&
        visits >= 2
    ) {

        return `

            <p>
                The bedroom feels colder this time.
            </p>

            <p>
                The bed is no longer neatly made.
            </p>

            <p>
                There is an indentation in the mattress.
            </p>

            <p>
                As if someone was just lying there.
            </p>

        `;

    }


    // ================================
    // BATHROOM
    // ================================

    if (
        sceneName === "bathroom" &&
        visits >= 2
    ) {

        return `

            <p>
                The mirror is fogged.
            </p>

            <p>
                You haven't used the shower.
            </p>

            <p>
                Someone has written a single word into the glass:
            </p>

            <p>
                <em>HOME.</em>
            </p>

        `;

    }


    // ================================
    // BASEMENT
    // ================================

    if (
        sceneName === "basement" &&
        visits >= 2
    ) {

        return `

            <p>
                The furniture has moved.
            </p>

            <p>
                Not much.
            </p>

            <p>
                Just enough for you to notice.
            </p>

            <p>
                The path back upstairs is now behind you.
            </p>

        `;

    }


    // ================================
    // OUTSIDE
    // ================================

    if (
        sceneName === "outside" &&
        visits >= 2
    ) {

        return `

            <p>
                The shed door is open.
            </p>

            <p>
                You remember closing it.
            </p>

            <p>
                Something inside the shed moves.
            </p>

        `;

    }


    // ================================
    // LOCKED ROOM
    // ================================

    if (
        sceneName === "lockedRoom" &&
        visits >= 1 &&
        gameState.clues >= 3
    ) {

        return `

            <p>
                You notice something you missed before.
            </p>

            <p>
                One photograph is newer than the others.
            </p>

            <p>
                It shows you standing in this room.
            </p>

            <p>
                <em>
                    But the photograph was taken from behind you.
                </em>
            </p>

        `;

    }


    // ================================
    // SECRET PASSAGE
    // ================================

    if (
        sceneName === "secret" &&
        gameState.sanity <= 50
    ) {

        return `

            <p style="color:#8b0000;">
                The writing on the walls has changed.
            </p>

            <p>
                Your name isn't the only thing written anymore.
            </p>

            <p>
                Beneath it is a second sentence.
            </p>

            <p>
                <em>YOU INVITED ME IN.</em>
            </p>

        `;

    }


    return "";

}


// ================================
// ENTITY SIGHTING
// ================================

function entityEncounter(sceneName) {

    if (gameState.entitySeen) {

        return;

    }


    if (gameState.sanity > 50) {

        return;

    }


    const allowedScenes = [

        "hallway",
        "bedroom",
        "foyer",
        "basement",
        "secret"

    ];


    if (!allowedScenes.includes(sceneName)) {

        return;

    }


    if (Math.random() > 0.18) {

        return;

    }


    gameState.entitySeen = true;


    const story =
        document.getElementById("story");


    const original =
        story.innerHTML;


    story.innerHTML += `

        <div style="
            margin-top:30px;
            padding:18px;
            text-align:center;
            color:#aaa;
            font-style:italic;
            letter-spacing:2px;
        ">

            <p>
                Someone is standing at the end of the room.
            </p>

            <p>
                You cannot see their face.
            </p>

            <p>
                You look away for one second.
            </p>

            <p style="color:#8b0000;">
                THEY ARE GONE.
            </p>

        </div>

    `;


    changeSanity(-5);


    clearTemporaryEvent();


    temporaryEventTimer = setTimeout(() => {

        story.innerHTML = original;

        temporaryEventTimer = null;

    }, 4000);

}


// ================================
// HOUSE WHISPER
// ================================

function houseWhisper(sceneName) {

    if (!gameState.houseAwake) {

        return;

    }


    if (gameState.scaresSeen.includes(
        "house-whisper"
    )) {

        return;

    }


    if (Math.random() > 0.12) {

        return;

    }


    gameState.scaresSeen.push(
        "house-whisper"
    );


    const story =
        document.getElementById("story");


    const original =
        story.innerHTML;


    story.innerHTML += `

        <p style="
            margin-top:25px;
            color:#666;
            text-align:center;
            font-style:italic;
        ">

            The house creaks.

        </p>

        <p style="
            color:#8b0000;
            text-align:center;
        ">

            "Don't leave."

        </p>

    `;


    clearTemporaryEvent();


    temporaryEventTimer = setTimeout(() => {

        story.innerHTML = original;

        temporaryEventTimer = null;

    }, 3000);

}


// ================================
// PHASE 3 HOUSE SYSTEM
// ================================

function runHouseSystem(sceneName) {

    trackHouseVisit(sceneName);


    const reaction =
        getHouseReaction(sceneName);


    if (reaction) {

        const story =
            document.getElementById("story");


        story.innerHTML += reaction;

    }


    entityEncounter(sceneName);

    houseWhisper(sceneName);

}


// ================================
// HORROR CONTROLLER
// ================================

function runHorrorSystem(sceneName) {

    gameState.sceneCount++;


    if (gameState.sanity <= 60) {

        gameState.distortionLevel = 1;

    }


    if (gameState.sanity <= 35) {

        gameState.distortionLevel = 2;

    }


    if (gameState.sanity <= 15) {

        gameState.distortionLevel = 3;

    }


    runHouseSystem(sceneName);

    randomHorrorEvent();

    triggerHallucination();

    phoneDisturbance();

}


// ================================
// SCENES
// ================================

const scenes = {

    start: {

        text: `

        <p>You wake up in the back seat of your car.</p>

        <p>It is <strong>2:13 AM.</strong></p>

        <p>The house sits at the end of the road.</p>

        <p>Your phone vibrates.</p>

        <p><em>"DON'T GO INSIDE."</em></p>

        <p>A second message appears.</p>

        <p><em>"PLEASE. IT KNOWS YOU'RE HERE."</em></p>

        `,

        choices: [

            {
                text: "A — Call someone",

                action: () => {

                    return "callSomeone";

                }

            },


            {
                text: "B — Get out of the car",

                action: () => {

                    useBattery(5);

                    return "frontDoor";

                }

            }

        ]

    },


    callSomeone: {

        text: `

        <p>You stare at the contact list.</p>

        <p>There is one person you could call.</p>

        <p>Your finger hovers over their name.</p>

        `,

        choices: [

            {
                text: "A — Get out of the car",

                action: () => {

                    changeSanity(-10);

                    return "frontDoor";

                }

            },


            {
                text: "B — Stay in the car",

                action: () => {

                    changeSanity(-20);

                    return "car";

                }

            }

        ]

    },


    car: {

        text: `

        <p>You lock the doors.</p>

        <p>Something moves behind the house.</p>

        <p>You hear footsteps approaching the car.</p>

        `,

        choices: [

            {
                text: "A — Start the car",

                action: () => {

                    return "carEscape";

                }

            },


            {
                text: "B — Look directly at the window",

                action: () => {

                    changeSanity(-35);

                    return "carFace";

                }

            }

        ]

    },


    carEscape: {

        text: `

        <p>The engine starts.</p>

        <p>Your headlights illuminate the road.</p>

        <p>Your phone begins ringing.</p>

        `,

        choices: [

            {
                text: "A — Answer the phone",

                action: () => {

                    changeSanity(-15);

                    return "phone";

                }

            },


            {
                text: "B — Ignore it",

                action: () => {

                    return "road";

                }

            }

        ]

    },


    carFace: {

        text: `

        <p>There is someone standing beside the driver's window.</p>

        <p>You cannot see their face.</p>

        <p>They slowly lean closer.</p>

        `,

        choices: [

            {
                text: "A — Close your eyes",

                action: () => {

                    changeSanity(-15);

                    return "frontDoor";

                }

            },


            {
                text: "B — Keep looking",

                action: () => {

                    changeSanity(-60);

                    return "faceDeath";

                }

            }

        ]

    },


    faceDeath: {

        text: `

        <p>The figure smiles.</p>

        <p>It shouldn't be possible.</p>

        <p>The face stretches across the window.</p>

        `,

        choices: [

            {
                text: "A — Run",

                action: () => {

                    showDeath(
                        "YOU LOOKED TOO LONG."
                    );

                    return null;

                }

            },


            {
                text: "B — Stay still",

                action: () => {

                    showDeath(
                        "IT WAS WAITING FOR YOU TO NOTICE IT."
                    );

                    return null;

                }

            }

        ]

    },


    phone: {

        text: `

        <p>You answer.</p>

        <p>For several seconds, nobody speaks.</p>

        <p>Then you hear your own voice whisper:</p>

        <p><em>"Turn around."</em></p>

        `,

        choices: [

            {
                text: "A — Keep driving",

                action: () => {

                    return "road";

                }

            },


            {
                text: "B — Turn around",

                action: () => {

                    changeSanity(-50);

                    return "phoneDeath";

                }

            }

        ]

    },


    phoneDeath: {

        text: `

        <p>You turn around.</p>

        <p>The back seat is occupied.</p>

        <p>Something is sitting directly behind you.</p>

        `,

        choices: [

            {
                text: "A — Look at it",

                action: () => {

                    showDeath(
                        "YOU SHOULD HAVE KEPT DRIVING."
                    );

                    return null;

                }

            },


            {
                text: "B — Close your eyes",

                action: () => {

                    showDeath(
                        "IT WAS ALREADY TOO CLOSE."
                    );

                    return null;

                }

            }

        ]

    },


    road: {

        text: `

        <p>You continue down the road.</p>

        <p>The house disappears behind you.</p>

        <p>Then you notice something strange.</p>

        <p>The road ahead looks exactly like the road behind you.</p>

        `,

        choices: [

            {
                text: "A — Go back to the house",

                action: () => {

                    return "frontDoor";

                }

            },


            {
                text: "B — Keep driving",

                action: () => {

                    changeSanity(-20);

                    return "roadAgain";

                }

            }

        ]

    },


    roadAgain: {

        text: `

        <p>You keep driving.</p>

        <p>Ten minutes pass.</p>

        <p>The house appears again.</p>

        <p>It is impossible.</p>

        `,

        choices: [

            {
                text: "A — Walk toward the house",

                action: () => {

                    useBattery(15);

                    return "frontDoor";

                }

            },


            {
                text: "B — Stay in the car",

                action: () => {

                    changeSanity(-30);

                    return "car";

                }

            }

        ]

    },


    frontDoor: {

        text: `

        <p>You stand in front of the house.</p>

        <p>The front door is slightly open.</p>

        <p>You don't remember leaving it that way.</p>

        `,

        choices: [

            {
                text: "A — Enter the house",

                action: () => {

                    findClue();

                    return "foyer";

                }

            },


            {
                text: "B — Search around the outside",

                action: () => {

                    useBattery(10);

                    return "outside";

                }

            }

        ]

    },


    outside: {

        text: `

        <p>You walk around the side of the house.</p>

        <p>There is an old wooden shed.</p>

        <p>Something metallic glints inside.</p>

        `,

        choices: [

            {
                text: "A — Open the shed",

                action: () => {

                    findClue();

                    addItem("Rusty Key");

                    changeSanity(-5);

                    return "shed";

                }

            },


            {
                text: "B — Go back to the front door",

                action: () => {

                    return "frontDoor";

                }

            }

        ]

    },


    shed: {

        text: `

        <p>The shed smells like wet wood.</p>

        <p>You find several old photographs scattered across the floor.</p>

        <p>Every photograph shows the same house.</p>

        `,

        choices: [

            {
                text: "A — Take the photographs",

                action: () => {

                    findClue();

                    addItem("Photographs");

                    changeSanity(-10);

                    return "foyer";

                }

            },


            {
                text: "B — Leave the photographs",

                action: () => {

                    return "frontDoor";

                }

            }

        ]

    },


    foyer: {

        text: `

        <p>You step into the foyer.</p>

        <p>The door closes behind you.</p>

        <p>There are two ways forward.</p>

        <p>The kitchen is to your left.</p>

        <p>A staircase leads upstairs.</p>

        `,

        choices: [

            {
                text: "A — Enter the kitchen",

                action: () => {

                    return "kitchen";

                }

            },


            {
                text: "B — Go upstairs",

                action: () => {

                    changeSanity(-5);

                    return "upstairs";

                }

            }

        ]

    },


    kitchen: {

        text: `

        <p>The kitchen is completely dark.</p>

        <p>You hear something moving inside one of the drawers.</p>

        `,

        choices: [

            {
                text: "A — Search the drawers",

                action: () => {

                    addItem("Kitchen Knife");

                    return "kitchenSearch";

                }

            },


            {
                text: "B — Leave the kitchen",

                action: () => {

                    return "upstairs";

                }

            }

        ]

    },


    kitchenSearch: {

        text: `

        <p>You search through the drawers.</p>

        <p>Something scratches the other side of the wall.</p>

        `,

        choices: [

            {
                text: "A — Investigate the noise",

                action: () => {

                    changeSanity(-10);

                    return "upstairs";

                }

            },


            {
                text: "B — Search again",

                action: () => {

                    findClue();

                    return "kitchenClue";

                }

            }

        ]

    },


    kitchenClue: {

        text: `

        <p>You find a child's drawing.</p>

        <p>It shows the house.</p>

        <p>There is a black figure standing behind the family.</p>

        `,

        choices: [

            {
                text: "A — Take the drawing",

                action: () => {

                    addItem("Child's Drawing");

                    findClue();

                    changeSanity(-15);

                    return "upstairs";

                }

            },


            {
                text: "B — Leave it",

                action: () => {

                    return "upstairs";

                }

            }

        ]

    },


    upstairs: {

        text: `

        <p>You climb the stairs.</p>

        <p>Every step creaks beneath your feet.</p>

        <p>The hallway above is completely dark.</p>

        `,

        choices: [

            {
                text: "A — Keep going",

                action: () => {

                    useBattery(10);

                    return "hallway";

                }

            },


            {
                text: "B — Go back downstairs",

                action: () => {

                    changeSanity(-5);

                    return "foyer";

                }

            }

        ]

    },


    hallway: {

        text: `

        <p>The hallway stretches farther than it should.</p>

        <p>There are several doors.</p>

        <p>One of them is locked.</p>

        `,

        choices: [

            {
                text: "A — Enter the bedroom",

                action: () => {

                    return "bedroom";

                }

            },


            {
                text: "B — Try the locked door",

                action: () => {

                    if (
                        gameState.inventory.includes("Rusty Key")
                    ) {

                        return "lockedRoom";

                    }

                    changeSanity(-10);

                    return "locked";

                }

            }

        ]

    },


    bedroom: {

        text: `

        <p>The bedroom looks untouched.</p>

        <p>An old photograph sits on the dresser.</p>

        `,

        choices: [

            {
                text: "A — Examine the photograph",

                action: () => {

                    findClue();

                    addItem("Old Photograph");

                    changeSanity(-10);

                    return "bedroomPhoto";

                }

            },


            {
                text: "B — Put it down",

                action: () => {

                    return "hallway";

                }

            }

        ]

    },


    bedroomPhoto: {

        text: `

        <p>The photograph shows you standing in this room.</p>

        <p>But the photograph looks decades old.</p>

        <p>Something moves behind you.</p>

        `,

        choices: [

            {
                text: "A — Turn around",

                action: () => {

                    changeSanity(-30);

                    return "hallway";

                }

            },


            {
                text: "B — Run",

                action: () => {

                    return "run";

                }

            }

        ]

    },


    run: {

        text: `

        <p>You sprint into the hallway.</p>

        <p>You hear footsteps following you.</p>

        `,

        choices: [

            {
                text: "A — Run downstairs",

                action: () => {

                    changeHealth(-20);

                    return "foyer";

                }

            },


            {
                text: "B — Hide in the bathroom",

                action: () => {

                    changeSanity(-20);

                    return "bathroom";

                }

            }

        ]

    },


    bathroom: {

        text: `

        <p>You lock yourself inside the bathroom.</p>

        <p>The footsteps stop outside the door.</p>

        <p>Someone whispers your name.</p>

        `,

        choices: [

            {
                text: "A — Stay silent",

                action: () => {

                    changeSanity(-10);

                    return "bathroomWait";

                }

            },


            {
                text: "B — Open the door",

                action: () => {

                    showDeath(
                        "THE DOOR WAS NEVER LOCKED."
                    );

                    return null;

                }

            }

        ]

    },


    bathroomWait: {

        text: `

        <p>The footsteps slowly disappear.</p>

        <p>You wait another minute before leaving.</p>

        `,

        choices: [

            {
                text: "A — Return to the hallway",

                action: () => {

                    return "hallway";

                }

            },


            {
                text: "B — Go back to the foyer",

                action: () => {

                    return "foyer";

                }

            }

        ]

    },


    lockedRoom: {

        text: `

        <p>The rusty key fits.</p>

        <p>The door opens into a room that shouldn't exist.</p>

        <p>Photographs cover every wall.</p>

        <p>Every photograph is of you.</p>

        `,

        choices: [

            {
                text: "A — Search the room",

                action: () => {

                    findClue();

                    changeSanity(-20);

                    return "basementDoor";

                }

            },


            {
                text: "B — Leave immediately",

                action: () => {

                    return "hallway";

                }

            }

        ]

    },


    locked: {

        text: `

        <p>The door won't open.</p>

        <p>Something is moving behind it.</p>

        `,

        choices: [

            {
                text: "A — Search the house",

                action: () => {

                    return "basementDoor";

                }

            },


            {
                text: "B — Keep pulling the door",

                action: () => {

                    changeHealth(-10);

                    changeSanity(-10);

                    return "locked";

                }

            }

        ]

    },


    basementDoor: {

        text: `

        <p>You discover a door leading downstairs.</p>

        <p>Cold air rises from the darkness.</p>

        `,

        choices: [

            {
                text: "A — Go downstairs",

                action: () => {

                    useBattery(20);

                    return "basement";

                }

            },


            {
                text: "B — Return to the hallway",

                action: () => {

                    return "hallway";

                }

            }

        ]

    },


    basement: {

        text: `

        <p>The basement is filled with old furniture.</p>

        <p>A wooden box sits in the corner.</p>

        <p>Something inside it is scratching.</p>

        `,

        choices: [

            {
                text: "A — Open the box",

                action: () => {

                    findClue();

                    return "box";

                }

            },


            {
                text: "B — Return upstairs",

                action: () => {

                    return "hallway";

                }

            }

        ]

    },


    box: {

        text: `

        <p>Inside the box you find dozens of photographs.</p>

        <p>The newest photograph was taken tonight.</p>

        `,

        choices: [

            {
                text: "A — Search deeper",

                action: () => {

                    findClue();

                    changeSanity(-20);

                    return "secret";

                }

            },


            {
                text: "B — Leave the box",

                action: () => {

                    return "escape";

                }

            }

        ]

    },


    secret: {

        text: `

        <p>You discover a hidden passage.</p>

        <p>The walls are covered in writing.</p>

        <p>Your name appears again and again.</p>

        <p>At the end of the passage, someone is standing with their back toward you.</p>

        `,

        choices: [

            {
                text: "A — Turn around",

                action: () => {

                    changeSanity(-40);

                    return "finalReveal";

                }

            },


            {
                text: "B — Escape",

                action: () => {

                    return "escape";

                }

            }

        ]

    },


    finalReveal: {

        text: `

        <p>The figure turns.</p>

        <p>It has your face.</p>

        <p>It smiles.</p>

        <p>"You finally came home."</p>

        `,

        choices: [

            {
                text: "A — Run",

                action: () => {

                    changeHealth(-30);

                    return "escape";

                }

            },


            {
                text: "B — Stay",

                action: () => {

                    gameState.sanity = 0;

                    updateHUD();

                    showDeath(
                        "YOU WERE NEVER THE ONE ESCAPING."
                    );

                    return null;

                }

            }

        ]

    },


    escape: {

        text: `

        <p>You run through the front door.</p>

        <p>The night air hits your face.</p>

        <p>Your phone vibrates.</p>

        <p>There is one final message.</p>

        <p><em>"YOU NEVER LEFT."</em></p>

        `,

        choices: [

            {
                text: "A — Look at the message",

                action: () => {

                    return "ending";

                }

            },


            {
                text: "B — Throw the phone away",

                action: () => {

                    return "ending";

                }

            }

        ]

    },


    ending: {

        text: `

        <div class="death">
            TO BE CONTINUED...
        </div>

        <p>CHAPTER ONE COMPLETE.</p>

        `,

        choices: []

    },


    trueEnding: {

        text: `

        <div class="death">
            YOU WERE NEVER THE ONE ESCAPING.
        </div>

        <p>The house was waiting for you.</p>

        <p>And now it knows your name.</p>

        `,

        choices: []

    }

};


// ================================
// SHOW SCENE
// ================================

function showScene(sceneName) {

    clearTemporaryEvent();


    const scene = scenes[sceneName];


    if (!scene) {

        console.error(
            "Scene not found:",
            sceneName
        );

        return;

    }


    document.getElementById("story").innerHTML =
        scene.text;


    const choicesElement =
        document.getElementById("choices");


    choicesElement.innerHTML = "";


    scene.choices.forEach(choice => {

        const button =
            document.createElement("button");


        button.textContent =
            choice.text;


        button.onclick = () => {

            clearTemporaryEvent();


            const nextScene =
                choice.action();


            updateHUD();


            if (nextScene) {

                showScene(nextScene);

            }

        };


        choicesElement.appendChild(button);

    });


    updateHUD();


    // Give the scene time to load before
    // the house begins reacting.

    setTimeout(() => {

        runHorrorSystem(sceneName);

    }, 350);

}


// ================================
// START GAME
// ================================

updateHUD();

showScene("start");
