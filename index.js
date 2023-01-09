function removeHash () { 
    history.replaceState("", document.title, window.location.pathname
                                                       + window.location.search);
} 

async function diamondScrollTo(n) {
    "use strict";
    
    setTimeout(() => { removeHash() }, 1);

    let diamonds = document.getElementsByClassName("scroll-diamond");
    let whiteSeps = document.getElementsByClassName("diamond-separator-white");
    let colorSeps = document.getElementsByClassName("diamond-separator-color");

    let maxDia = 0;
    let i = 0
    for (let diamond of diamonds) {
        if (/[^/]*$/.exec(diamond.style.backgroundImage)[0] == "diamond-color.svg\")") {
            maxDia = i;
        }
        i++;
    }


    if (maxDia < n) {
        // animate from maxDia up to n

        for (let i = maxDia; i < n; i++) {
            let colorKf = [{}, {}];
            colorKf[0]['flexGrow'] = 0;
            colorKf[1]['flexGrow'] = 1;


            let whiteKf = [{}, {}];
            whiteKf[0]['flexGrow'] = 1;
            whiteKf[1]['flexGrow'] = 0;

            diamonds[i].style.backgroundImage = "url(assets/diamond-color.svg)";
            await new Promise((resolve, reject) => {
                colorSeps[i].animate(colorKf, 150);
                whiteSeps[i].animate(whiteKf, 150).addEventListener('finish', event => {
                    whiteSeps[i].style.flexGrow = 0;
                    colorSeps[i].style.flexGrow = 1;

                    resolve();
                });
            })
        }

        diamonds[n].style.backgroundImage = "url(assets/diamond-color.svg)";
    } else if (maxDia > n) {
        // animate BACK from maxDia down to n

        for (let i = maxDia - 1; i >= n; i--) {
            let colorKf = [{}, {}];
            colorKf[0]['flexGrow'] = 1;
            colorKf[1]['flexGrow'] = 0;


            let whiteKf = [{}, {}];
            whiteKf[0]['flexGrow'] = 0;
            whiteKf[1]['flexGrow'] = 1;
            try {
                diamonds[i + 1].style.backgroundImage = "url(assets/diamond-white.svg)";
            } catch (TypeError) {}

            await new Promise((resolve, reject) => {
                colorSeps[i].animate(colorKf, 150);
                whiteSeps[i].animate(whiteKf, 150).addEventListener('finish', event => {
                    whiteSeps[i].style.flexGrow = 1;
                    colorSeps[i].style.flexGrow = 0;




                    resolve();
                });
            })
        }
    }

}
