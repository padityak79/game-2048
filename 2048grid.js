const colors = [ 'WHITE',
'TURQUOISE',
'BROWN',
'MAGENTA',
'YELLOW',
'CYAN',
'GREEN',
'ORANGE',
'LIME',
'NAVY',
'PINKY',
'GREY'];



class grid {
    constructor(posx,posy,side) {
        this.posx= posx;
        this.posy= posy;
        this.side= side;
        this.value= undefined;
        this.color = colors[0].toLowerCase();
    }

    setValue(value) {

        if(!value) {
            var i = floor(random(0,4));
            if(i === 3) this.value = 4;
            else this.value = 2;
        }
        else  this.value = value;

        this.color = colors[Math.log2(this.value)].toLowerCase();
        return this.value;
    }

    valueOf(){
        return this.value;
    }

    ifMerge(value) {
        return this.value === value;
    }

    resetValue() {
        this.value = undefined;
        this.color = colors[0].toLowerCase();
    }

    isAssigned(){
        return this.value !== undefined;
    }

    show() {
        fill(255);
        stroke(0);
        strokeWeight(2);
        if(this.value){
            this.color = colors[Math.log2(this.value)].toLowerCase();
        }
        fill(this.color);

        rect(this.posx, this.posy, this.side, this.side, 20, 20, 20, 20);
        if(this.value) {
            if( this.value < 10) {
                textSize(65);
                fill(0);
                text(`${this.value}`, this.posx + 0.40 * this.side, this.posy + 0.65 * this.side);
            }
            else if( this.value < 100) {
                textSize(65);
                fill(0);
                text(`${this.value}`, this.posx + 0.275 * this.side, this.posy + 0.65 * this.side);
            }
            else if( this.value < 1000) {
                textSize(65);
                fill(0);
                text(`${this.value}`, this.posx + 0.15 * this.side, this.posy + 0.65 * this.side);
            }
            else if( this.value < 10000) {
                textSize(65);
                fill(0);
                text(`${this.value}`, this.posx + 0.025 * this.side, this.posy + 0.65 * this.side);
            }
            
        }
    }
}