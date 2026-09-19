// ================================
// SANITY EFFECT
// ================================

function checkSanityEffects() {

    if (gameState.sanity <= 25) {

        document.body.classList.add("insane");

    } else {

        document.body.classList.remove("insane");

    }

}


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

            checkSanityEffects();

            if (nextScene) {

                showScene(nextScene);

            }

        };


        choicesElement.appendChild(button);

    });


    updateHUD();

    checkSanityEffects();

}


// ================================
// START GAME
// ================================

updateHUD();

checkSanityEffects();

showScene("start");
