const scenes = {

    start: {
        text: `
            You wake up in the back seat of your car.

            <br><br>

            It's 2:13 AM.

            <br><br>

            You don't remember falling asleep.

            <br><br>

            Outside your window is an enormous abandoned house.

            <br><br>

            Your phone has one new message:

            <br><br>

            <strong>"DON'T GO INSIDE."</strong>

            <br><br>

            Then another message appears.

            <br><br>

            <strong>"PLEASE. IT KNOWS YOU'RE HERE."</strong>

            <br><br>

            What do you do?
        `,

        choices: [
            {
                text: "A. Get out of the car and approach the house.",
                next: "frontDoor"
            },

            {
                text: "B. Stay in the car and call someone.",
                next: "callSomeone"
            }
        ]
    },


    callSomeone: {
        text: `
            You lock the doors.

            <br><br>

            You call your best friend.

            <br><br>

            The phone rings.

            <br><br>

            Once.

            <br>

            Twice.

            <br>

            Three times.

            <br><br>

            Someone answers.

            <br><br>

            You hear breathing.

            <br><br>

            "Hello?"

            <br><br>

            It's your friend's voice.

            <br><br>

            But your friend died three years ago.
        `,

        choices: [
            {
                text: "A. Ask who is calling.",
                next: "voice"
            },

            {
                text: "B. Hang up immediately.",
                next: "hangUp"
            }
        ]
    },


    voice: {
        text: `
            "You shouldn't have come here."

            <br><br>

            You stare at the house.

            <br><br>

            A light turns on in an upstairs window.

            <br><br>

            "It remembers you."

            <br><br>

            The call suddenly ends.

            <br><br>

            Your car won't start.
        `,

        choices: [
            {
                text: "A. Get out and go to the house.",
                next: "frontDoor"
            },

            {
                text: "B. Try the car again.",
                next: "car"
            }
        ]
    },


    car: {
        text: `
            You turn the key.

            <br><br>

            Nothing.

            <br><br>

            You try again.

            <br><br>

            Nothing.

            <br><br>

            Then you hear something tapping on your window.

            <br><br>

            <strong>Tap.</strong>

            <br>

            <strong>Tap.</strong>

            <br>

            <strong>Tap.</strong>

            <br><br>

            You slowly look toward the window.

            <br><br>

            You see a handprint.

            <br><br>

            From the inside.
        `,

        choices: [
            {
                text: "A. Get out of the car.",
                next: "frontDoor"
            },

            {
                text: "B. Stay completely still.",
                next: "carDeath"
            }
        ]
    },


    carDeath: {
        text: `
            You don't move.

            <br><br>

            The tapping stops.

            <br><br>

            Silence.

            <br><br>

            Then something whispers directly beside your ear:

            <br><br>

            <strong>"Found you."</strong>

            <br><br>

            <span class="death">YOU DIED.</span>
        `,

        choices: [
            {
                text: "PLAY AGAIN",
                next: "start"
            }
        ]
    },


    frontDoor: {
        text: `
            You walk toward the house.

            <br><br>

            The front yard is completely overgrown.

            <br><br>

            You notice something strange.

            <br><br>

            There are dozens of photographs scattered across the ground.

            <br><br>

            You pick one up.

            <br><br>

            It's a photograph of you.

            <br><br>

            You're standing in this exact yard.

            <br><br>

            But the photograph looks at least twenty years old.

            <br><br>

            The front door slowly opens.
        `,

        choices: [
            {
                text: "A. Enter the house.",
                next: "foyer"
            },

            {
                text: "B. Run back to the car.",
                next: "runCar"
            }
        ]
    },


    runCar: {
        text: `
            You turn around and run.

            <br><br>

            You reach your car.

            <br><br>

            The doors are locked.

            <br><br>

            You look through the window.

            <br><br>

            Someone is sitting in the driver's seat.

            <br><br>

            You can't see their face.
        `,

        choices: [
            {
                text: "A. Open the driver's door.",
                next: "driver"
            },

            {
                text: "B. Run back toward the house.",
                next: "foyer"
            }
        ]
    },


    driver: {
        text: `
            You open the door.

            <br><br>

            The driver's seat is empty.

            <br><br>

            You look around.

            <br><br>

            The house is gone.

            <br><br>

            There's nothing but darkness where it stood.

            <br><br>

            Your phone vibrates.

            <br><br>

            One new message:

            <br><br>

            <strong>"YOU SHOULD HAVE STAYED INSIDE."</strong>
        `,

        choices: [
            {
                text: "A. Run into the darkness.",
                next: "darkness"
            },

            {
                text: "B. Call for help.",
                next: "badEnding"
            }
        ]
    },


    darkness: {
        text: `
            You run.

            <br><br>

            You don't know where you're going.

            <br><br>

            You trip and fall.

            <br><br>

            When you look up...

            <br><br>

            You're standing inside the house again.

            <br><br>

            <strong>END OF CHAPTER ONE.</strong>
        `,

        choices: [
            {
                text: "PLAY AGAIN",
                next: "start"
            }
        ]
    },


    badEnding: {
        text: `
            You scream for help.

            <br><br>

            Something screams back.

            <br><br>

            But it isn't human.

            <br><br>

            The darkness surrounds you.

            <br><br>

            <span class="death">BAD ENDING</span>
        `,

        choices: [
            {
                text: "PLAY AGAIN",
                next: "start"
            }
        ]
    },


    hangUp: {
        text: `
            You immediately hang up.

            <br><br>

            Your phone rings again.

            <br><br>

            You ignore it.

            <br><br>

            It rings again.

            <br><br>

            And again.

            <br><br>

            Finally, a message appears:

            <br><br>

            <strong>"YOU WERE WARNED."</strong>
        `,

        choices: [
            {
                text: "A. Leave the car.",
                next: "frontDoor"
            },

            {
                text: "B. Keep ignoring the phone.",
                next: "phoneDeath"
            }
        ]
    },


    phoneDeath: {
        text: `
            The phone stops ringing.

            <br><br>

            You breathe a sigh of relief.

            <br><br>

            Then your phone lights up.

            <br><br>

            It's the camera.

            <br><br>

            The camera is showing you sitting in your car.

            <br><br>

            But the camera isn't your phone.

            <br><br>

            It's somewhere outside the car.

            <br><br>

            <span class="death">YOU DIED.</span>
        `,

        choices: [
            {
                text: "PLAY AGAIN",
                next: "start"
            }
        ]
    },


    foyer: {
        text: `
            You step inside.

            <br><br>

            The door slams shut.

            <br><br>

            You try the handle.

            <br><br>

            Locked.

            <br><br>

            The house is completely silent.

            <br><br>

            In front of you are three doors.

            <br><br>

            One leads to the kitchen.

            <br><br>

            One leads upstairs.

            <br><br>

            One leads to the basement.

            <br><br>

            You hear something moving downstairs.
        `,

        choices: [
            {
                text: "A. Search the kitchen.",
                next: "kitchen"
            },

            {
                text: "B. Go upstairs.",
                next: "upstairs"
            }
        ]
    },


    kitchen: {
        text: `
            You enter the kitchen.

            <br><br>

            Everything is covered in dust.

            <br><br>

            You find a flashlight.

            <br><br>

            The batteries are almost dead.

            <br><br>

            You also find a kitchen knife.

            <br><br>

            Suddenly...

            <br><br>

            <strong>BANG.</strong>

            <br><br>

            Something just slammed against the basement door.
        `,

        choices: [
            {
                text: "A. Take the knife and investigate.",
                next: "basement"
            },

            {
                text: "B. Take the flashlight and go upstairs.",
                next: "upstairs"
            }
        ]
    },


    upstairs: {
        text: `
            You slowly climb the stairs.

            <br><br>

            Every step creaks.

            <br><br>

            At the top of the stairs you see three doors.

            <br><br>

            One is slightly open.

            <br><br>

            You hear a child laughing behind it.
        `,

        choices: [
            {
                text: "A. Open the door.",
                next: "childRoom"
            },

            {
                text: "B. Walk past it.",
                next: "hallway"
            }
        ]
    },


    childRoom: {
        text: `
            You slowly open the door.

            <br><br>

            The room is empty.

            <br><br>

            There is an old music box on the floor.

            <br><br>

            It starts playing by itself.

            <br><br>

            Then you notice writing on the wall.

            <br><br>

            <strong>"SHE IS STILL HERE."</strong>

            <br><br>

            Behind you...

            <br><br>

            the door closes.
        `,

        choices: [
            {
                text: "A. Try to open the door.",
                next: "lockedRoom"
            },

            {
                text: "B. Search the room.",
                next: "searchRoom"
            }
        ]
    },


    lockedRoom: {
        text: `
            You grab the door handle.

            <br><br>

            It won't move.

            <br><br>

            You hear breathing behind you.

            <br><br>

            Slowly...

            <br><br>

            you turn around.

            <br><br>

            <span class="death">YOU DIED.</span>
        `,

        choices: [
            {
                text: "PLAY AGAIN",
                next: "start"
            }
        ]
    },


    searchRoom: {
        text: `
            You search the room.

            <br><br>

            Under the bed you find a small brass key.

            <br><br>

            You also find an old photograph.

            <br><br>

            The photograph shows your family.

            <br><br>

            Someone has been scratched out of the picture.

            <br><br>

            On the back is written:

            <br><br>

            <strong>"BASEMENT. MIDNIGHT."</strong>
        `,

        choices: [
            {
                text: "A. Take the key and leave.",
                next: "hallway"
            },

            {
                text: "B. Look under the bed again.",
                next: "bed"
            }
        ]
    },


    bed: {
        text: `
            You look underneath the bed again.

            <br><br>

            Something grabs your wrist.

            <br><br>

            You scream.

            <br><br>

            You pull yourself free.

            <br><br>

            Whatever was underneath the bed is gone.

            <br><br>

            But now there are muddy footprints leading toward the door.
        `,

        choices: [
            {
                text: "A. Follow the footprints.",
                next: "hallway"
            },

            {
                text: "B. Stay in the room.",
                next: "lockedRoom"
            }
        ]
    },


    hallway: {
        text: `
            You walk down the hallway.

            <br><br>

            The house suddenly goes completely silent.

            <br><br>

            Then you hear a voice downstairs.

            <br><br>

            Your mother's voice.

            <br><br>

            "Come downstairs."

            <br><br>

            "I need you."

            <br><br>

            But your mother is thousands of miles away.
        `,

        choices: [
            {
                text: "A. Go downstairs.",
                next: "basement"
            },

            {
                text: "B. Hide in the bedroom.",
                next: "hideBedroom"
            }
        ]
    },


    hideBedroom: {
        text: `
            You hide inside the bedroom closet.

            <br><br>

            Footsteps approach.

            <br><br>

            They stop directly outside the door.

            <br><br>

            Silence.

            <br><br>

            Then the closet door slowly opens.

            <br><br>

            <span class="death">YOU DIED.</span>
        `,

        choices: [
            {
                text: "PLAY AGAIN",
                next: "start"
            }
        ]
    },


    basement: {
        text: `
            You walk toward the basement.

            <br><br>

            The basement door is locked.

            <br><br>

            You remember the brass key.

            <br><br>

            You put it into the lock.

            <br><br>

            <strong>CLICK.</strong>

            <br><br>

            The door opens.

            <br><br>

            A cold breeze comes from downstairs.

            <br><br>

            You hear someone whisper your name.
        `,

        choices: [
            {
                text: "A. Go downstairs.",
                next: "basementInside"
            },

            {
                text: "B. Close the door.",
                next: "basementClose"
            }
        ]
    },


    basementClose: {
        text: `
            You close the basement door.

            <br><br>

            For a few seconds, everything is quiet.

            <br><br>

            Then something pounds against the other side.

            <br><br>

            <strong>BANG.</strong>

            <br>

            <strong>BANG.</strong>

            <br>

            <strong>BANG.</strong>

            <br><br>

            The door begins to crack.
        `,

        choices: [
            {
                text: "A. Run upstairs.",
                next: "upstairs"
            },

            {
                text: "B. Open the basement door.",
                next: "basementInside"
            }
        ]
    },


    basementInside: {
        text: `
            You descend the stairs.

            <br><br>

            At the bottom you find a room filled with photographs.

            <br><br>

            Hundreds of them.

            <br><br>

            Every photograph is of you.

            <br><br>

            Some are from yesterday.

            <br><br>

            Some are from years ago.

            <br><br>

            One photograph shows you standing in this basement.

            <br><br>

            The photograph was taken tonight.
        `,

        choices: [
            {
                text: "A. Search the photographs.",
                next: "photographs"
            },

            {
                text: "B. Get out immediately.",
                next: "basementEscape"
            }
        ]
    },


    photographs: {
        text: `
            You search through the photographs.

            <br><br>

            You find one photograph that looks different.

            <br><br>

            It shows your missing sister.

            <br><br>

            She's standing beside the house.

            <br><br>

            Written on the back:

            <br><br>

            <strong>"SHE NEVER LEFT."</strong>

            <br><br>

            Then you hear a voice behind you.

            <br><br>

            "Finally."
        `,

        choices: [
            {
                text: "A. Turn around.",
                next: "reveal"
            },

            {
                text: "B. Run.",
                next: "basementEscape"
            }
        ]
    },


    basementEscape: {
        text: `
            You run toward the stairs.

            <br><br>

            Something grabs your ankle.

            <br><br>

            You kick it away.

            <br><br>

            You reach the kitchen.

            <br><br>

            The front door is open.

            <br><br>

            You run outside.

            <br><br>

            The house watches you from the darkness.

            <br><br>

            <strong>ENDING: ESCAPE</strong>
        `,

        choices: [
            {
                text: "PLAY AGAIN",
                next: "start"
            }
        ]
    },


    reveal: {
        text: `
            You slowly turn around.

            <br><br>

            A woman is standing behind you.

            <br><br>

            It's your sister.

            <br><br>

            She smiles.

            <br><br>

            "I've been waiting for you."

            <br><br>

            The lights go out.

            <br><br>

            <strong>END OF CHAPTER ONE</strong>
        `,

        choices: [
            {
                text: "PLAY AGAIN",
                next: "start"
            }
        ]
    }
};


function showScene(sceneName) {

    const scene = scenes[sceneName];

    if (!scene) {
        console.error("Scene not found:", sceneName);
        return;
    }

    document.getElementById("story").innerHTML = scene.text;

    const choicesContainer = document.getElementById("choices");

    choicesContainer.innerHTML = "";

    scene.choices.forEach(choice => {

        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", () => {
            showScene(choice.next);
        });

        choicesContainer.appendChild(button);
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


showScene("start");
