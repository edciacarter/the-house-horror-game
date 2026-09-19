// ============================================================
// THE HOUSE
// CHAPTER ONE
// FINAL GAME.JS + PLACEHOLDER JUMPSCARE
// ============================================================


// ============================================================
// GAME STATE
// ============================================================

const gameState = {

    health: 100,
    sanity: 100,
    battery: 100,
    clues: 0,

    inventory: [],

    sceneCount: 0,
    houseVisits: 0,

    scaresSeen: [],

    distortionLevel: 0,

    changedRooms: [],
    entitySeen: false,
    houseAwake: false,

    photographChanged: false,
    hallwayChanged: false,

    exploredShed: false,
    tookPhotographs: false,
    tookDrawing: false,
    examinedBedroomPhoto: false,
    openedLockedRoom: false,
    searchedBasement: false,
    discoveredSecret: false,
    confrontedFigure: false

};


// ============================================================
// TEMPORARY EVENT CONTROL
// ============================================================

let temporaryEventTimer = null;

function clearTemporaryEvent() {

    if (temporaryEventTimer) {

        clearTimeout(temporaryEventTimer);

        temporaryEventTimer = null;

    }

}


// ============================================================
// HUD
// ============================================================

function updateHUD() {

    const health = document.getElementById("health");
    const sanity = document.getElementById("sanity");
    const battery = document.getElementById("battery");
    const clues = document.getElementById("clues");
    const inventory = document.getElementById("inventory");

    if (health) {
        health.textContent = gameState.health;
    }

    if (sanity) {
        sanity.textContent = gameState.sanity;
    }

    if (battery) {
        battery.textContent = gameState.battery + "%";
    }

    if (clues) {
        clues.textContent = gameState.clues;
    }

    if (inventory) {

        if (gameState.inventory.length === 0) {

            inventory.textContent = "Empty";

        } else {

            inventory.textContent =
                gameState.inventory.join(" • ");

        }

    }

    updateVisualEffects();

}


// ============================================================
// VISUAL EFFECTS
// ============================================================

function updateVisualEffects() {

    const body = document.body;

    if (!body) {
        return;
    }

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

        body.classList.add(
            "flashlight-dead"
        );

    } else if (gameState.battery <= 25) {

        body.classList.add(
            "flashlight-critical"
        );

    } else if (gameState.battery <= 50) {

        body.classList.add(
            "flashlight-warning"
        );

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


// ============================================================
// HEALTH
// ============================================================

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


// ============================================================
// SANITY
// ============================================================

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


// ============================================================
// FLASHLIGHT
// ============================================================

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


// ============================================================
// CLUES
// ============================================================

function findClue() {

    gameState.clues++;

    updateHUD();

}


// ============================================================
// ITEMS
// ============================================================

function addItem(item) {

    if (
        !gameState.inventory.includes(item)
    ) {

        gameState.inventory.push(item);

        updateHUD();

    }

}


// ============================================================
// DEATH
// ============================================================

function showDeath(message) {

    clearTemporaryEvent();

    const story =
        document.getElementById("story");

    const choices =
        document.getElementById("choices");

    if (!story || !choices) {
        return;
    }

    story.innerHTML = `

        <div class="death">
            YOU DIED
        </div>

        <p>
            ${message}
        </p>

        <button onclick="location.reload()">
            TRY AGAIN
        </button>

    `;

    choices.innerHTML = "";

}


// ============================================================
// FLASHLIGHT SCARE
// ============================================================

function flashlightScare() {

    if (
        gameState.scaresSeen.includes(
            "flashlight"
        )
    ) {

        return;

    }

    gameState.scaresSeen.push(
        "flashlight"
    );

    const story =
        document.getElementById("story");

    if (!story) {
        return;
    }

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

    temporaryEventTimer =
        setTimeout(() => {

            story.innerHTML =
                original;

            temporaryEventTimer =
                null;

        }, 2800);

}


// ============================================================
// RANDOM HORROR EVENT
// ============================================================

function randomHorrorEvent() {

    if (gameState.sanity > 60) {
        return;
    }

    const events = [

        {
            id: "whisper",

            text: `
                <p>
                    <em>
                        Someone whispers your name.
                    </em>
                </p>
            `
        },

        {
            id: "wrong",

            text: `
                <p>
                    For a moment,
                    you forget where you are.
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
                !gameState.scaresSeen.includes(
                    event.id
                )
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
                Math.random() *
                available.length
            )
        ];

    gameState.scaresSeen.push(
        event.id
    );

    const story =
        document.getElementById("story");

    if (!story) {
        return;
    }

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

    temporaryEventTimer =
        setTimeout(() => {

            story.innerHTML =
                original;

            temporaryEventTimer =
                null;

        }, 3500);

}


// ============================================================
// HALLUCINATION
// ============================================================

function triggerHallucination() {

    if (gameState.sanity > 35) {
        return;
    }

    if (Math.random() > 0.22) {
        return;
    }

    const story =
        document.getElementById("story");

    if (!story) {
        return;
    }

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

    temporaryEventTimer =
        setTimeout(() => {

            story.innerHTML =
                original;

            temporaryEventTimer =
                null;

        }, 1800);

}


// ============================================================
// PHONE DISTURBANCE
// ============================================================

function phoneDisturbance() {

    if (gameState.sanity > 45) {
        return;
    }

    if (Math.random() > 0.18) {
        return;
    }

    const story =
        document.getElementById("story");

    if (!story) {
        return;
    }

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

    temporaryEventTimer =
        setTimeout(() => {

            story.innerHTML =
                original;

            temporaryEventTimer =
                null;

        }, 2500);

}


// ============================================================
// HOUSE VISITS
// ============================================================

function trackHouseVisit(sceneName) {

    const houseScenes = [

        "frontDoor",
        "foyer",
        "kitchen",
        "upstairs",
        "hallway",
        "bedroom",
        "bathroom",
        "basement",
        "lockedRoom",
        "secret"

    ];

    if (
        houseScenes.includes(
            sceneName
        )
    ) {

        gameState.houseVisits++;

    }

    if (
        gameState.houseVisits >= 8
    ) {

        gameState.houseAwake =
            true;

    }

}


// ============================================================
// CHANGING ROOMS
// ============================================================

function getHouseReaction(sceneName) {

    if (
        gameState.changedRooms.includes(
            sceneName
        )
    ) {

        return "";

    }

    if (gameState.houseVisits < 5) {
        return "";
    }

    const reactions = {

        foyer: `

            <p>
                You stop.
            </p>

            <p>
                There used to be a door here.
            </p>

            <p>
                Now there is only a wall.
            </p>

        `,

        kitchen: `

            <p>
                The drawer you left open is closed.
            </p>

            <p>
                You are certain you left it open.
            </p>

        `,

        hallway: `

            <p>
                You count the doors again.
            </p>

            <p>
                There are four now.
            </p>

            <p>
                There were only three before.
            </p>

        `,

        bedroom: `

            <p>
                The mattress is indented.
            </p>

            <p>
                Someone—or something—was sitting on the bed.
            </p>

        `,

        bathroom: `

            <p>
                The mirror is covered in fog.
            </p>

            <p>
                One word has been written across it:
            </p>

            <p>
                <strong>HOME</strong>
            </p>

        `,

        basement: `

            <p>
                The furniture has moved.
            </p>

            <p>
                You know you didn't move it.
            </p>

        `,

        outside: `

            <p>
                The shed door is open.
            </p>

            <p>
                You remember closing it.
            </p>

        `

    };

    if (!reactions[sceneName]) {
        return "";
    }

    gameState.changedRooms.push(
        sceneName
    );

    return reactions[sceneName];

}


// ============================================================
// ENTITY
// ============================================================

function entityEncounter(sceneName) {

    if (gameState.entitySeen) {
        return "";
    }

    const validScenes = [

        "hallway",
        "bedroom",
        "foyer",
        "basement",
        "secret"

    ];

    if (
        !validScenes.includes(
            sceneName
        )
    ) {

        return "";

    }

    if (gameState.sanity > 50) {
        return "";
    }

    if (Math.random() > 0.18) {
        return "";
    }

    gameState.entitySeen =
        true;

    changeSanity(-5);

    return `

        <div style="
            margin-top:25px;
            color:#8b0000;
            letter-spacing:2px;
        ">

            <p>
                Something is standing at the edge of your vision.
            </p>

            <p>
                You turn.
            </p>

            <p>
                Nothing.
            </p>

            <p>
                But you can still feel it watching.
            </p>

        </div>

    `;

}


// ============================================================
// HOUSE WHISPER
// ============================================================

function houseWhisper() {

    if (!gameState.houseAwake) {
        return "";
    }

    if (
        gameState.scaresSeen.includes(
            "houseWhisper"
        )
    ) {

        return "";

    }

    if (Math.random() > 0.12) {
        return "";
    }

    gameState.scaresSeen.push(
        "houseWhisper"
    );

    return `

        <p style="
            color:#777;
            font-style:italic;
        ">

            The house makes a sound.

        </p>

        <p style="
            color:#8b0000;
        ">

            <em>"You came back."</em>

        </p>

    `;

}


// ============================================================
// HOUSE SYSTEM
// ============================================================

function runHouseSystem(sceneName) {

    trackHouseVisit(
        sceneName
    );

    const story =
        document.getElementById("story");

    if (!story) {
        return;
    }

    const reaction =
        getHouseReaction(
            sceneName
        );

    const entity =
        entityEncounter(
            sceneName
        );

    const whisper =
        houseWhisper();

    if (
        reaction ||
        entity ||
        whisper
    ) {

        story.innerHTML +=
            reaction +
            entity +
            whisper;

    }

}


// ============================================================
// HORROR CONTROLLER
// ============================================================

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

    runHouseSystem(
        sceneName
    );

    randomHorrorEvent();

    triggerHallucination();

    phoneDisturbance();

}


// ============================================================
// PLACEHOLDER JUMPSCARE
// ============================================================

let jumpscareActive = false;

let jumpscareAudioContext = null;


function createJumpscareOverlay() {

    if (
        document.getElementById(
            "jumpscareOverlay"
        )
    ) {

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "jumpscareStyles";


    style.textContent = `

        #jumpscareOverlay {

            position: fixed;

            inset: 0;

            width: 100vw;
            height: 100vh;

            background:
                radial-gradient(
                    ellipse at center,
                    #111 0%,
                    #020202 45%,
                    #000 100%
                );

            display: flex;

            align-items: center;

            justify-content: center;

            z-index: 999999;

            opacity: 0;

            pointer-events: none;

            overflow: hidden;

        }


        #jumpscareOverlay.active {

            opacity: 1;

            pointer-events: auto;

            animation:
                jumpscareFlicker
                0.75s
                steps(7)
                forwards;

        }


        #jumpscareFace {

            position: relative;

            width: min(72vw, 520px);

            height: min(72vw, 520px);

            border-radius: 50%;

            background:

                radial-gradient(
                    ellipse at 50% 38%,
                    #bcbcbc 0%,
                    #777 28%,
                    #292929 58%,
                    #050505 78%,
                    #000 100%
                );

            box-shadow:

                0 0 80px rgba(255,255,255,0.08),

                0 0 180px rgba(0,0,0,0.95);

            transform:
                scale(0.35);

            filter:
                contrast(1.4)
                brightness(0.65);

            animation:
                faceAppear
                0.55s
                cubic-bezier(.2,.8,.2,1)
                forwards;

        }


        #jumpscareFace::before {

            content: "";

            position: absolute;

            left: 16%;

            top: 28%;

            width: 68%;

            height: 35%;

            border-radius: 50%;

            background:

                radial-gradient(
                    ellipse at center,
                    #000 0%,
                    #000 35%,
                    transparent 38%
                );

            opacity: 0.95;

        }


        .jumpscare-eye {

            position: absolute;

            top: 31%;

            width: 19%;

            height: 12%;

            border-radius: 50%;

            background: #000;

            box-shadow:
                0 0 18px #000;

        }


        .jumpscare-eye.left {

            left: 20%;

        }


        .jumpscare-eye.right {

            right: 20%;

        }


        .jumpscare-eye::after {

            content: "";

            position: absolute;

            width: 25%;

            height: 35%;

            left: 38%;

            top: 32%;

            background: #777;

            border-radius: 50%;

        }


        .jumpscare-mouth {

            position: absolute;

            left: 27%;

            bottom: 20%;

            width: 46%;

            height: 16%;

            border-radius:
                0 0 50% 50%;

            background: #000;

            box-shadow:
                0 0 20px #000;

        }


        .jumpscare-mouth::before {

            content: "";

            position: absolute;

            left: 8%;

            right: 8%;

            top: 8%;

            height: 15%;

            background: #555;

        }


        .jumpscare-scratch {

            position: absolute;

            inset: 0;

            background:

                repeating-linear-gradient(
                    110deg,
                    transparent 0px,
                    transparent 7px,
                    rgba(255,255,255,0.035) 8px,
                    transparent 9px
                );

            mix-blend-mode: screen;

            pointer-events: none;

        }


        body.jumpscare-shake {

            animation:
                jumpscareShake
                0.65s
                linear;

        }


        body.jumpscare-flash::after {

            content: "";

            position: fixed;

            inset: 0;

            z-index: 999998;

            pointer-events: none;

            background: #fff;

            animation:
                screenFlash
                0.65s
                steps(5)
                forwards;

        }


        @keyframes faceAppear {

            0% {

                transform:
                    scale(0.25)
                    rotate(-3deg);

                opacity: 0;

            }

            55% {

                transform:
                    scale(1.12)
                    rotate(2deg);

                opacity: 1;

            }

            100% {

                transform:
                    scale(1)
                    rotate(0deg);

                opacity: 1;

            }

        }


        @keyframes jumpscareFlicker {

            0% {
                opacity: 0;
            }

            8% {
                opacity: 1;
            }

            16% {
                opacity: 0.15;
            }

            25% {
                opacity: 1;
            }

            38% {
                opacity: 0.2;
            }

            48% {
                opacity: 1;
            }

            65% {
                opacity: 0.85;
            }

            100% {
                opacity: 0;
            }

        }


        @keyframes screenFlash {

            0% {
                opacity: 0;
            }

            12% {
                opacity: 0.9;
            }

            18% {
                opacity: 0;
            }

            28% {
                opacity: 0.55;
            }

            35% {
                opacity: 0;
            }

            100% {
                opacity: 0;
            }

        }


        @keyframes jumpscareShake {

            0% {
                transform: translate(0,0);
            }

            10% {
                transform: translate(-12px,8px);
            }

            20% {
                transform: translate(10px,-9px);
            }

            30% {
                transform: translate(-14px,-5px);
            }

            40% {
                transform: translate(11px,10px);
            }

            50% {
                transform: translate(-8px,-12px);
            }

            60% {
                transform: translate(13px,5px);
            }

            70% {
                transform: translate(-10px,7px);
            }

            80% {
                transform: translate(7px,-5px);
            }

            100% {
                transform: translate(0,0);
            }

        }


        @media (
            prefers-reduced-motion: reduce
        ) {

            #jumpscareFace {

                animation: none;

                transform: scale(1);

            }

            #jumpscareOverlay.active {

                animation: none;

                opacity: 1;

            }

            body.jumpscare-shake {

                animation: none;

            }

        }

    `;


    document.head.appendChild(
        style
    );


    const overlay =
        document.createElement("div");


    overlay.id =
        "jumpscareOverlay";


    overlay.innerHTML = `

        <div
            id="jumpscareFace"
            aria-hidden="true"
        >

            <div
                class="jumpscare-eye left"
            ></div>

            <div
                class="jumpscare-eye right"
            ></div>

            <div
                class="jumpscare-mouth"
            ></div>

            <div
                class="jumpscare-scratch"
            ></div>

        </div>

    `;


    document.body.appendChild(
        overlay
    );

}


function playJumpscareSound() {

    try {

        if (
            !jumpscareAudioContext
        ) {

            jumpscareAudioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        if (
            jumpscareAudioContext.state ===
            "suspended"
        ) {

            jumpscareAudioContext.resume();

        }


        const now =
            jumpscareAudioContext.currentTime;


        const gain =
            jumpscareAudioContext.createGain();


        const oscillator =
            jumpscareAudioContext.createOscillator();


        oscillator.type =
            "sawtooth";


        oscillator.frequency.setValueAtTime(
            85,
            now
        );


        oscillator.frequency.exponentialRampToValueAtTime(
            28,
            now + 0.65
        );


        gain.gain.setValueAtTime(
            0.0001,
            now
        );


        gain.gain.exponentialRampToValueAtTime(
            0.25,
            now + 0.025
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.75
        );


        oscillator.connect(
            gain
        );


        gain.connect(
            jumpscareAudioContext.destination
        );


        oscillator.start(now);

        oscillator.stop(
            now + 0.8
        );


        const noise =
            jumpscareAudioContext.createBufferSource();


        const buffer =
            jumpscareAudioContext.createBuffer(
                1,
                jumpscareAudioContext.sampleRate * 0.25,
                jumpscareAudioContext.sampleRate
            );


        const data =
            buffer.getChannelData(0);


        for (
            let i = 0;
            i < data.length;
            i++
        ) {

            data[i] =
                Math.random() * 2 - 1;

        }


        noise.buffer =
            buffer;


        const noiseGain =
            jumpscareAudioContext.createGain();


        noiseGain.gain.setValueAtTime(
            0.0001,
            now
        );


        noiseGain.gain.exponentialRampToValueAtTime(
            0.12,
            now + 0.01
        );


        noiseGain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.24
        );


        noise.connect(
            noiseGain
        );


        noiseGain.connect(
            jumpscareAudioContext.destination
        );


        noise.start(now);

    }

    catch (error) {

        console.log(
            "Jumpscare sound unavailable."
        );

    }

}


function triggerJumpscare() {

    if (jumpscareActive) {
        return;
    }


    createJumpscareOverlay();


    const overlay =
        document.getElementById(
            "jumpscareOverlay"
        );


    if (!overlay) {
        return;
    }


    jumpscareActive =
        true;


    document.body.classList.add(
        "jumpscare-shake",
        "jumpscare-flash"
    );


    overlay.classList.remove(
        "active"
    );


    void overlay.offsetWidth;


    overlay.classList.add(
        "active"
    );


    playJumpscareSound();


    setTimeout(() => {

        overlay.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "jumpscare-shake",
            "jumpscare-flash"
        );

        jumpscareActive =
            false;

    }, 900);

}


// ============================================================
// JUMPSCARE CONTROLLER
// ============================================================

function checkForJumpscare(sceneName) {

    // First major jumpscare:
    // the player looks at the strange photograph.

    if (
        sceneName === "bedroomPhoto" &&
        !gameState.scaresSeen.includes(
            "bedroomJumpscare"
        )
    ) {

        gameState.scaresSeen.push(
            "bedroomJumpscare"
        );


        setTimeout(() => {

            triggerJumpscare();

        }, 900);


        return;

    }


    // Second possible jumpscare:
    // only if sanity is already low.

    if (
        sceneName === "hallway" &&
        gameState.sanity <= 35 &&
        !gameState.scaresSeen.includes(
            "hallwayJumpscare"
        )
    ) {

        if (Math.random() < 0.45) {

            gameState.scaresSeen.push(
                "hallwayJumpscare"
            );


            setTimeout(() => {

                triggerJumpscare();

            }, 1100);

        }

    }

}


// ============================================================
// DETERMINE ENDING
// ============================================================

function determineEnding() {

    if (

        gameState.discoveredSecret &&

        gameState.clues >= 5 &&

        gameState.inventory.includes(
            "Rusty Key"
        ) &&

        gameState.inventory.includes(
            "Photographs"
        ) &&

        gameState.inventory.includes(
            "Child's Drawing"
        ) &&

        gameState.inventory.includes(
            "Old Photograph"
        )

    ) {

        return "trueEnding";

    }


    if (
        gameState.sanity <= 25
    ) {

        return "lostEnding";

    }


    if (
        gameState.clues <= 2
    ) {

        return "houseEnding";

    }


    return "ending";

}


// ============================================================
// SCENES
// ============================================================

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

                gameState.exploredShed =
                    true;

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

                gameState.tookPhotographs =
                    true;

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

                gameState.tookDrawing =
                    true;

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
                    gameState.inventory.includes(
                        "Rusty Key"
                    )
                ) {

                    gameState.openedLockedRoom =
                        true;

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

                gameState.examinedBedroomPhoto =
                    true;

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

                gameState.searchedBasement =
                    true;

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

                gameState.discoveredSecret =
                    true;

                gameState.confrontedFigure =
                    true;

                changeSanity(-40);

                return "finalReveal";

            }

        },

        {
            text: "B — Escape",

            action: () => {

                gameState.discoveredSecret =
                    true;

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

                gameState.sanity =
                    0;

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

                return determineEnding();

            }

        },

        {
            text: "B — Throw the phone away",

            action: () => {

                return determineEnding();

            }

        }

    ]

},


ending: {

    text: `

        <div class="death">
            YOU ESCAPED
        </div>

        <p>
            You make it to the road.
        </p>

        <p>
            The house disappears behind you.
        </p>

        <p>
            You don't look back.
        </p>

        <p>
            For the first time that night,
            you can breathe.
        </p>

        <p>
            Then your phone lights up.
        </p>

        <p>
            <em>
                "WE'LL SEE YOU AGAIN."
            </em>
        </p>

        <p>
            CHAPTER ONE COMPLETE.
        </p>

    `,

    choices: [

        {
            text: "PLAY AGAIN",

            action: () => {

                location.reload();

                return null;

            }

        }

    ]

},


houseEnding: {

    text: `

        <div class="death">
            THE HOUSE LET YOU GO
        </div>

        <p>
            You made it out.
        </p>

        <p>
            But you never discovered why
            the house wanted you there.
        </p>

        <p>
            As you drive away,
            you look into the rearview mirror.
        </p>

        <p>
            The house is still standing.
        </p>

        <p>
            Someone is watching from
            the upstairs window.
        </p>

        <p>
            You don't know who.
        </p>

        <p>
            CHAPTER ONE COMPLETE.
        </p>

    `,

    choices: [

        {
            text: "PLAY AGAIN",

            action: () => {

                location.reload();

                return null;

            }

        }

    ]

},


lostEnding: {

    text: `

        <div class="death">
            YOU BROKE
        </div>

        <p>
            You run.
        </p>

        <p>
            You don't remember leaving the house.
        </p>

        <p>
            You don't remember getting into the car.
        </p>

        <p>
            You don't even remember your own name.
        </p>

        <p>
            When the sun rises,
            you're still sitting outside the house.
        </p>

        <p>
            The front door is open.
        </p>

        <p>
            And somewhere inside,
            someone is calling you.
        </p>

        <p>
            CHAPTER ONE COMPLETE.
        </p>

    `,

    choices: [

        {
            text: "PLAY AGAIN",

            action: () => {

                location.reload();

                return null;

            }

        }

    ]

},


trueEnding: {

    text: `

        <div class="death">
            THE TRUTH
        </div>

        <p>
            You stare at the photographs.
        </p>

        <p>
            The drawings.
        </p>

        <p>
            The key.
        </p>

        <p>
            The room that should not exist.
        </p>

        <p>
            Suddenly, everything connects.
        </p>

        <p>
            The house wasn't showing you memories.
        </p>

        <p>
            It was recording them.
        </p>

        <p>
            Every person who entered.
        </p>

        <p>
            Every disappearance.
        </p>

        <p>
            Every version of you.
        </p>

        <p>
            You look down at the newest photograph.
        </p>

        <p>
            It was taken only seconds ago.
        </p>

        <p>
            In the photograph,
            you are standing outside the house.
        </p>

        <p>
            But you are not alone.
        </p>

        <p>
            Something is standing behind you.
        </p>

        <p>
            You slowly turn around.
        </p>

        <p>
            Nothing.
        </p>

        <p>
            You look back at the photograph.
        </p>

        <p>
            The figure is closer.
        </p>

        <div class="death">
            YOU WERE NEVER THE FIRST.
        </div>

        <p>
            CHAPTER ONE COMPLETE.
        </p>

    `,

    choices: [

        {
            text: "PLAY AGAIN",

            action: () => {

                location.reload();

                return null;

            }

        }

    ]

}

};


// ============================================================
// SHOW SCENE
// ============================================================

function showScene(sceneName) {

    const scene =
        scenes[sceneName];

    if (!scene) {

        console.error(
            "Scene not found:",
            sceneName
        );

        return;

    }

    clearTemporaryEvent();


    const story =
        document.getElementById("story");

    const choices =
        document.getElementById("choices");


    if (!story || !choices) {
        return;
    }


    story.innerHTML =
        scene.text;


    choices.innerHTML =
        "";


    scene.choices.forEach(
        choice => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                choice.text;


            button.onclick = () => {

                const nextScene =
                    choice.action();


                updateHUD();


                if (nextScene) {

                    showScene(
                        nextScene
                    );

                }

            };


            choices.appendChild(
                button
            );

        }
    );


    updateHUD();


    setTimeout(() => {

        runHorrorSystem(
            sceneName
        );

        checkForJumpscare(
            sceneName
        );

    }, 350);

}


// ============================================================
// AMBIENT AUDIO
// ============================================================

let audioContext = null;
let ambientGain = null;
let ambientStarted = false;


function startAmbientSound() {

    if (ambientStarted) {
        return;
    }


    try {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        if (
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }


        ambientGain =
            audioContext.createGain();


        const oscillator =
            audioContext.createOscillator();


        oscillator.type =
            "sine";


        oscillator.frequency.value =
            42;


        ambientGain.gain.value =
            0.018;


        oscillator.connect(
            ambientGain
        );


        ambientGain.connect(
            audioContext.destination
        );


        oscillator.start();


        ambientStarted =
            true;


        setInterval(() => {

            if (
                !ambientGain ||
                !audioContext
            ) {

                return;

            }


            const variation =
                0.012 +
                Math.random() *
                0.018;


            ambientGain.gain.setTargetAtTime(
                variation,
                audioContext.currentTime,
                1.5
            );

        }, 3500);

    }

    catch (error) {

        console.log(
            "Ambient audio unavailable."
        );

    }

}


// ============================================================
// TITLE SCREEN
// ============================================================

function startGame() {

    startAmbientSound();


    const titleScreen =
        document.getElementById(
            "titleScreen"
        );


    const game =
        document.getElementById(
            "game"
        );


    if (!titleScreen) {
        return;
    }


    titleScreen.style.transition =
        "opacity 1.2s ease";


    titleScreen.style.opacity =
        "0";


    setTimeout(() => {

        titleScreen.style.display =
            "none";


        if (game) {

            game.style.opacity =
                "1";

        }

    }, 1200);

}


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createJumpscareOverlay();


        const startButton =
            document.getElementById(
                "startButton"
            );


        if (startButton) {

            startButton.addEventListener(
                "click",
                startGame
            );

        }


        updateHUD();


        showScene(
            "start"
        );

    }
);
