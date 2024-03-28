let rulerMeasure = document.querySelector('.ruler-measure');

let rulerTop = document.querySelector('.ruler-top');
let rulerBot = document.querySelector('.ruler-bot');

updateMeasure();
drawLines();

window.addEventListener('resize', () => {
    updateMeasure();
    drawLines();
})

function updateMeasure(){
    rulerMeasure.innerHTML = window.innerWidth;
}

function drawLines() {
    rulerTop.innerHTML = '';
    rulerBot.innerHTML = '';
   
    const width = window.innerWidth;
    if (width > 1000){
        createLines(400,200,100,10);
    } else if (width > 500) {
        createLines(200,100,10);
    } else {
        createLines(100,10);
    }

    //Creates two lines of strokes. Each argument is a measurement point. First argument is marked with the number
    function createLines(...args) {
        //last argument is the distance between each mark
        let space = args[args.length-1];
        let mark = 0;
        for (let i = 0; i < window.innerWidth/space; i++) {

            for (let j = 0; j < args.length; j++){

                if (i % Math.round(args[j]/space) === 0) {
                    mark += space;
                    if ((mark-space) % args[0] === 0) {
                        createStrokes(5 + (args.length - j)*10, space, mark);
                        break;
                    }
                    createStrokes(5 + (args.length - j)*10, space);
                    break;
                }
            }
        }
    }
    
    //Creates two strokes for top and bot
    function createStrokes(strokeHeight, space, mark) {
        rulerTop.appendChild(createStroke(strokeHeight, space, mark));

        document.querySelectorAll('.ruler-top .mark')
            .forEach((element) => {
                const translateYValue = rulerTop.clientHeight + 'px'; 
                element.style.transform = `translate(-50%, ${translateYValue})`;
            }) 
        
        rulerBot.appendChild(createStroke(strokeHeight, space, mark));

        //Creates a single stroke
        function createStroke(strokeHeight, space, mark) {
            let newStroke = document.createElement('div');
            newStroke.classList.add('stroke');
            newStroke.style.height = strokeHeight + 'px';

            if (mark){
                let markElement = document.createElement('h6');
                markElement.classList.add('mark');
                markElement.innerText = mark-space;
                markElement.style.minWidth = 2*space + 'px';
                newStroke.appendChild(markElement);
            }
                
            newStroke.style.minWidth = space + 'px';
            return newStroke;
        }
    }
}

