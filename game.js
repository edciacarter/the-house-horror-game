// ================================
// THE HOUSE
// GAME SYSTEM
// ================================

const gameState = {

    health: 100,

    sanity: 20,

    battery: 100,

    clues: 0,

    inventory: []

};


// ================================
// UPDATE HUD
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

}


// ================================
// CHANGE GAME STATS
// ================================

function changeHealth(amount) {

    gameState.health += amount;

    if (gameState.health > 100) {
        gameState.health = 100;
    }

    if (gameState.health <= 0) {

        gameState.health = 0;

        showDeath(
            "YOUR BODY COULDN'T TAKE ANY MORE."
        );

        return false;
    }

    updateHUD();

    return true;
}


function changeSanity(amount) {

    gameState.sanity += amount;

    if (gameState.sanity > 100) {
        gameState.sanity = 100;
    }

    if (gameState.sanity <= 0) {

        gameState.sanity = 0;

        showDeath(
            "YOU LOST YOUR MIND BEFORE YOU COULD ESCAPE."
        );

        return false;
    }

    updateHUD();

    return true;
}


function useBattery(amount) {

    gameState.battery -= amount;

    if (gameState.battery < 0) {
        gameState.battery = 0;
    }

    updateHUD();

}


function findClue() {

    gameState.clues++;

    updateHUD();

}


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
// STORY SYSTEM
// ================================

const scenes = {

    start: {

        text: `

        You wake up in the back seat of your car.

        The first thing you notice is the cold.

        The second thing you notice is the silence.

        Your phone reads <strong>2:13 AM.</strong>

        Outside the windows stands an enormous abandoned house.

        You don't remember driving here.

        You don't remember leaving home.

        Then your phone vibrates.

        <br><br>

        <em>
        DON'T GO INSIDE.
        </em>

        <br><br>

        Another message appears.

        <br><br>

        <em>
        PLEASE. IT KNOWS YOU'RE HERE.
        </em>

        `,

        choices: [

            {
                text: "A. Call someone",

                action: () => {

                    changeSanity(-5);

                    return "callSomeone";

                }

            },

            {
                text: "B. Get out of the car",

                action: () => {

                    useBattery(5);

                    return "frontDoor";

                }

            }

        ]

    },


    callSomeone: {

        text: `

        You press CALL.

        <br><br>

        One ring.

        <br><br>

        Two.

        <br><br>

        Three.

        <br><br>

        Someone answers.

        <br><br>

        You don't hear a voice.

        <br><br>

        You hear breathing.

        <br><br>

        Then a whisper:

        <br><br>

        <strong>
        "You're already inside."
        </strong>

        <br><br>

        The call ends.

        `,

        choices: [

            {
                text: "A. Get out of the car",

                action: () => {

                    changeSanity(-10);

                    return "frontDoor";

                }

            },

            {
                text: "B. Stay in the car",

                action: () => {

                    changeSanity(-20);

                    return "car";

                }

            }

        ]

    },


    car: {

        text: `

        You lock every door.

        <br><br>

        Nothing moves outside.

        <br><br>

        You wait.

        <br><br>

        Five minutes.

        <br><br>

        Ten.

        <br><br>

        Then something slowly presses its face against
        the driver's window.

        <br><br>

        You freeze.

        `,

        choices: [

            {
                text: "A. Start the car",

                action: () => {

                    return "carEscape";

                }

            },

            {
                text: "B. Look directly at it",

                action: () => {

                    changeSanity(-35);

                    return "carFace";

                }

            }

        ]

    },


    carEscape: {

        text: `

        You turn the key.

        <br><br>

        The engine starts.

        <br><br>

        You slam your foot onto the accelerator.

        <br><br>

        The house disappears behind you.

        <br><br>

        For a moment, you think you're safe.

        <br><br>

        Then your phone rings.

        <br><br>

        The caller ID says:

        <br><br>

        <strong>YOUR OWN NUMBER</strong>

        `,

        choices: [

            {
                text: "A. Answer",

                action: () => {

                    changeSanity(-15);

                    return "phone";

                }

            },

            {
                text: "B. Ignore it",

                action: () => {

                    return "road";

                }

            }

        ]

    },


    carFace: {

        text: `

        You slowly turn your head.

        <br><br>

        There is no face.

        <br><br>

        Just skin.

        <br><br>

        Smooth skin stretched across a human-shaped head.

        <br><br>

        Something taps the window.

        <br><br>

        Once.

        <br><br>

        Twice.

        <br><br>

        Three times.

        `,

        choices: [

            {
                text: "A. Close your eyes",

                action: () => {

                    changeSanity(-15);

                    return "frontDoor";

                }

            },

            {
                text: "B. Keep looking",

                action: () => {

                    changeSanity(-60);

                    return "faceDeath";

                }

            }

        ]

    },


    faceDeath: {

        text: `

        The thing smiles.

        <br><br>

        You never saw its mouth before.

        <br><br>

        But now you can.

        <br><br>

        It opens far wider than a human mouth should.

        `,

        choices: []

    },


    phone: {

        text: `

        You answer.

        <br><br>

        Your own voice speaks from the other end.

        <br><br>

        <strong>
        "Don't turn around."
        </strong>

        <br><br>

        You slowly look into the rearview mirror.

        `,

        choices: [

            {
                text: "A. Keep driving",

                action: () => {

                    return "road";

                }

            },

            {
                text: "B. Turn around",

                action: () => {

                    changeSanity(-50);

                    return "phoneDeath";

                }

            }

        ]

    },


    phoneDeath: {

        text: `

        Someone is sitting in the back seat.

        <br><br>

        You were sure it was empty.

        <br><br>

        The figure leans forward.

        <br><br>

        And whispers your name.

        `,

        choices: []

    },


    road: {

        text: `

        You keep driving.

        <br><br>

        Ten minutes pass.

        <br><br>

        Twenty.

        <br><br>

        Then you realize something.

        <br><br>

        You've passed the same tree six times.

        <br><br>

        The house is still behind you.

        <br><br>

        But somehow...

        <br><br>

        you're back in front of it.

        `,

        choices: [

            {
                text: "A. Go inside the house",

                action: () => {

                    return "frontDoor";

                }

            },

            {
                text: "B. Keep driving",

                action: () => {

                    changeSanity(-20);

                    return "roadAgain";

                }

            }

        ]

    },


    roadAgain: {

        text: `

        You keep driving.

        <br><br>

        The road becomes darker.

        <br><br>

        Your headlights flicker.

        <br><br>

        Then the engine dies.

        <br><br>

        Your flashlight is your only light.

        `,

        choices: [

            {
                text: "A. Walk toward the house",

                action: () => {

                    useBattery(15);

                    return "frontDoor";

                }

            },

            {
                text: "B. Stay in the car",

                action: () => {

                    changeSanity(-30);

                    return "car";

                }

            }

        ]

    },


    frontDoor: {

        text: `

        You stand in front of the house.

        <br><br>

        The front door is slightly open.

        <br><br>

        You notice something carved into the wood.

        <br><br>

        <strong>
        YOUR NAME.
        </strong>

        <br><br>

        Beneath it is a second message:

        <br><br>

        <em>
        YOU CAME BACK.
        </em>

        `,

        choices: [

            {
                text: "A. Enter the house",

                action: () => {

                    findClue();

                    return "foyer";

                }

            },

            {
                text: "B. Search around the house",

                action: () => {

                    useBattery(10);

                    return "outside";

                }

            }

        ]

    },


    outside: {

        text: `

        You walk around the side of the house.

        <br><br>

        Behind the building you find an old wooden shed.

        <br><br>

        The lock has been broken.

        <br><br>

        Something inside is moving.

        `,

        choices: [

            {
                text: "A. Open the shed",

                action: () => {

                    findClue();

                    addItem("Rusty Key");

                    changeSanity(-5);

                    return "shed";

                }

            },

            {
                text: "B. Go back to the front door",

                action: () => {

                    return "frontDoor";

                }

            }

        ]

    },


    shed: {

        text: `

        The shed smells like wet earth.

        <br><br>

        Your flashlight catches something hanging
        from the ceiling.

        <br><br>

        Dozens of photographs.

        <br><br>

        Every photograph shows the same house.

        <br><br>

        But in each photograph...

        <br><br>

        <strong>
        YOU ARE THERE.
        </strong>

        `,

        choices: [

            {
                text: "A. Take the photographs",

                action: () => {

                    findClue();

                    addItem("Photographs");

                    changeSanity(-10);

                    return "foyer";

                }

            },

            {
                text: "B. Leave immediately",

                action: () => {

                    return "frontDoor";

                }

            }

        ]

    },


    foyer: {

        text: `

        The door closes behind you.

        <br><br>

        <strong>
        CLICK.
        </strong>

        <br><br>

        Locked.

        <br><br>

        The foyer is enormous.

        <br><br>

        Dust covers everything except one thing:

        <br><br>

        a child's handprint on the wall.

        <br><br>

        It looks fresh.

        `,

        choices: [

            {
                text: "A. Go toward the kitchen",

                action: () => {

                    return "kitchen";

                }

            },

            {
                text: "B. Go upstairs",

                action: () => {

                    changeSanity(-5);

                    return "upstairs";

                }

            }

        ]

    },


    kitchen: {

        text: `

        The kitchen is freezing.

        <br><br>

        A refrigerator hums in the corner.

        <br><br>

        You open it.

        <br><br>

        Nothing.

        <br><br>

        Then you notice something written
        on the inside of the door.

        <br><br>

        <strong>
        SHE HIDES BELOW.
        </strong>

        `,

        choices: [

            {
                text: "A. Search the drawers",

                action: () => {

                    addItem("Kitchen Knife");

                    return "kitchenSearch";

                }

            },

            {
                text: "B. Leave the kitchen",

                action: () => {

                    return "upstairs";

                }

            }

        ]

    },


    kitchenSearch: {

        text: `

        You search through the drawers.

        <br><br>

        Most are empty.

        <br><br>

        One contains a kitchen knife.

        <br><br>

        You take it.

        <br><br>

        Something moves upstairs.

        `,

        choices: [

            {
                text: "A. Investigate the noise",

                action: () => {

                    changeSanity(-10);

                    return "upstairs";

                }

            },

            {
                text: "B. Search the kitchen again",

                action: () => {

                    findClue();

                    return "kitchenClue";

                }

            }

        ]

    },


    kitchenClue: {

        text: `

        Behind a cabinet you find a child's drawing.

        <br><br>

        It shows a family standing in front of this house.

        <br><br>

        You recognize the people.

        <br><br>

        One of them is you.

        <br><br>

        You don't remember ever being here.

        `,

        choices: [

            {
                text: "A. Take the drawing",

                action: () => {

                    addItem("Child's Drawing");

                    findClue();

                    changeSanity(-15);

                    return "upstairs";

                }

            },

            {
                text: "B. Leave it",

                action: () => {

                    return "upstairs";

                }

            }

        ]

    },


    upstairs: {

        text: `

        The staircase groans beneath your weight.

        <br><br>

        Halfway up...

        <br><br>

        you hear footsteps above you.

        <br><br>

        Slow.

        <br><br>

        Barefoot.

        <br><br>

        They stop.

        `,

        choices: [

            {
                text: "A. Keep going",

                action: () => {

                    useBattery(10);

                    return "hallway";

                }

            },

            {
                text: "B. Go back downstairs",

                action: () => {

                    changeSanity(-5);

                    return "foyer";

                }

            }

        ]

    },


    hallway: {

        text: `

        Three doors.

        <br><br>

        Bedroom.

        <br><br>

        Bathroom.

        <br><br>

        And at the very end...

        <br><br>

        a locked door.

        <br><br>

        From behind the locked door comes a quiet voice.

        <br><br>

        <strong>
        "Please let me out."
        </strong>

        `,

        choices: [

            {
                text: "A. Open the bedroom",

                action: () => {

                    return "bedroom";

                }

            },

            {
                text: "B. Try the locked door",

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

        The bedroom looks untouched.

        <br><br>

        A bed sits against the wall.

        <br><br>

        On the nightstand is a photograph.

        <br><br>

        You pick it up.

        <br><br>

        It's a picture of you as a child.

        <br><br>

        Standing beside a woman you don't recognize.

        `,

        choices: [

            {
                text: "A. Examine the photograph",

                action: () => {

                    findClue();

                    addItem("Old Photograph");

                    changeSanity(-10);

                    return "bedroomPhoto";

                }

            },

            {
                text: "B. Put it down",

                action: () => {

                    return "hallway";

                }

            }

        ]

    },


    bedroomPhoto: {

        text: `

        On the back of the photograph is a date.

        <br><br>

        <strong>
        OCTOBER 10.
        </strong>

        <br><br>

        Beneath it:

        <br><br>

        <em>
        THE DAY SHE CAME BACK.
        </em>

        <br><br>

        You hear someone whisper behind you.

        <br><br>

        "You were supposed to remember."

        `,

        choices: [

            {
                text: "A. Turn around",

                action: () => {

                    changeSanity(-30);

                    return "hallway";

                }

            },

            {
                text: "B. Run",

                action: () => {

                    return "run";

                }

            }

        ]

    },


    run: {

        text: `

        You sprint into the hallway.

        <br><br>

        The house is no longer quiet.

        <br><br>

        Doors slam behind you.

        <br><br>

        Something is running after you.

        `,

        choices: [

            {
                text: "A. Run downstairs",

                action: () => {

                    changeHealth(-20);

                    return "foyer";

                }

            },

            {
                text: "B. Hide in the bathroom",

                action: () => {

                    changeSanity(-20);

                    return "bathroom";

                }

            }

        ]

    },


    bathroom: {

        text: `

        You lock the bathroom door.

        <br><br>

        Silence.

        <br><br>

        Then...

        <br><br>

        three slow knocks.

        <br><br>

        <strong>
        KNOCK.

        KNOCK.

        KNOCK.
        </strong>

        `,

        choices: [

            {
                text: "A. Stay silent",

                action: () => {

                    changeSanity(-10);

                    return "bathroomWait";

                }

            },

            {
                text: "B. Open the door",

                action: () => {

                    changeHealth(-50);

                    return "bathroomDeath";

                }

            }

        ]

    },


    bathroomWait: {

        text: `

        The knocking stops.

        <br><br>

        You wait.

        <br><br>

        Five minutes.

        <br><br>

        Ten.

        <br><br>

        When you finally open the door...

        <br><br>

        the hallway is empty.

        `,

        choices: [

            {
                text: "A. Continue down the hallway",

                action: () => {

                    return "hallway";

                }

            },

            {
                text: "B. Go downstairs",

                action: () => {

                    return "foyer";

                }

            }

        ]

    },


    locked: {

        text: `

        You pull on the door.

        <br><br>

        It doesn't move.

        <br><br>

        From the other side:

        <br><br>

        <strong>
        "You forgot the key."
        </strong>

        <br><br>

        Your flashlight flickers.

        `,

        choices: [

            {
                text: "A. Search the house",

                action: () => {

                    return "basementDoor";

                }

            },

            {
                text: "B. Keep pulling the door",

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

        You find a staircase leading down.

        <br><br>

        The air becomes colder.

        <br><br>

        You hear something moving below.

        `,

        choices: [

            {
                text: "A. Go downstairs",

                action: () => {

                    useBattery(20);

                    return "basement";

                }

            },

            {
                text: "B. Go back upstairs",

                action: () => {

                    return "hallway";

                }

            }

        ]

    },


    basement: {

        text: `

        The basement is almost completely dark.

        <br><br>

        Your flashlight reveals old boxes.

        <br><br>

        One box has your name written on it.

        `,

        choices: [

            {
                text: "A. Open the box",

                action: () => {

                    findClue();

                    return "box";

                }

            },

            {
                text: "B. Leave the basement",

                action: () => {

                    return "hallway";

                }

            }

        ]

    },


    box: {

        text: `

        Inside the box are dozens of photographs.

        <br><br>

        All of them show you.

        <br><br>

        Different ages.

        <br><br>

        Different years.

        <br><br>

        But every photograph was taken inside this house.

        <br><br>

        You finally understand one thing.

        <br><br>

        You have been here before.

        `,

        choices: [

            {
                text: "A. Search deeper",

                action: () => {

                    findClue();

                    changeSanity(-20);

                    return "secret";

                }

            },

            {
                text: "B. Get out",

                action: () => {

                    return "escape";

                }

            }

        ]

    },


    secret: {

        text: `

        Beneath the photographs is a small metal box.

        <br><br>

        Inside is a handwritten letter.

        <br><br>

        The handwriting is yours.

        <br><br>

        It says:

        <br><br>

        <em>
        "If you're reading this, she found you again."
        </em>

        <br><br>

        You hear footsteps behind you.

        `,

        choices: [

            {
                text: "A. Turn around",

                action: () => {

                    changeSanity(-40);

                    return "finalReveal";

                }

            },

            {
                text: "B. Run",

                action: () => {

                    return "escape";

                }

            }

        ]

    },


    finalReveal: {

        text: `

        You turn around.

        <br><br>

        A woman stands at the bottom of the stairs.

        <br><br>

        You recognize her.

        <br><br>

        She's the woman from the photograph.

        <br><br>

        She smiles.

        <br><br>

        <strong>
        "Welcome home."
        </strong>

        `,

        choices: [

            {
                text: "A. Run",

                action: () => {

                    changeHealth(-30);

                    return "escape";

                }

            },

            {
                text: "B. Stay",

                action: () => {

                    changeSanity(-100);

                    return "trueEnding";

                }

            }

        ]

    },


    escape: {

        text: `

        You run.

        <br><br>

        You don't look back.

        <br><br>

        The front door is suddenly open.

        <br><br>

        You burst outside.

        <br><br>

        Cold air hits your face.

        <br><br>

        You're free.

        <br><br>

        Or so you think.

        <br><br>

        Your phone vibrates.

        `,

        choices: [

            {
                text: "A. Look at the message",

                action: () => {

                    return "ending";

                }

            },

            {
                text: "B. Throw the phone away",

                action: () => {

                    return "ending";

                }

            }

        ]

    },


    ending: {

        text: `

        The message contains one photograph.

        <br><br>

        It's a picture of you standing outside the house.

        <br><br>

        The photograph was taken...

        <br><br>

        <strong>
        five minutes from now.
        </strong>

        <br><br>

        <div class="death">
        TO BE CONTINUED...
        </div>

        `,

        choices: []

    },


    trueEnding: {

        text: `

        You stop fighting.

        <br><br>

        The woman reaches for your hand.

        <br><br>

        Everything goes black.

        <br><br>

        When you open your eyes...

        <br><br>

        you're sitting in the back seat of your car.

        <br><br>

        Your phone reads:

        <br><br>

        <strong>
        2:13 AM.
        </strong>

        <br><br>

        The beginning.

        <br><br>

        <div class="death">
        ENDING: THE LOOP
        </div>

        `,

        choices: []

    }

};


// ================================
// SHOW SCENE
// ================================

function showScene(sceneName) {

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

}


// ================================
// START GAME
// ================================

    updateHUD();

    checkSanityEffects();

}


// ================================
// START GAME
// ================================

updateHUD();

checkSanityEffects();

showScene("start");
