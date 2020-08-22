export class Timeline {
    constructor() {
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.addTimes = new Map();
        this.requestId = null;
        this.state = 'initialized';
    }

    tick() {
        let t = Date.now() - this.startTime;
        // console.log(t);
        // let animations = this.animations.filter(animation => !animation.finished);

        for (const animation of this.animations) {
            let {object, property, template, start, end, timingFunction, delay, duration} = animation;
            
            let addTime = this.addTimes.get(animation);

            if (t < delay + addTime) {
                continue;
            }

            // progression is ratio between 0 to 1
            let progression = timingFunction((t - delay - addTime) / duration);

            if (t > duration + delay + addTime) {
                progression = 1;
                this.animations.delete(animation)
                this.finishedAnimations.add(animation);
            }

            // compute value based on progression 
            let value = animation.valueFromProgression(progression);
            object[property] =  template(value);
        }

        if (this.animations.size) {
            this.requestId = requestAnimationFrame(()=> this.tick())
        } else {
            this.requestId = null;
        }
    }

    start() {
        // work only state is initialized
        if (this.state !== 'initialized') {
            return;
        }

        this.state     = 'playing';
        this.startTime = Date.now();
        this.tick()
    }

    reset() {
        // force state to playing mode
        if (this.state === 'playing') {
            this.pause();
        }

        // reset all params
        this.animations         = new Set();
        this.finishedAnimations = new Set();
        this.addTimes           = new Map();
        this.requestId          = null;
        this.startTime          = Date.now();
        this.pauseTime          = null;
        this.state              = 'initialized';
    }

    restart() {
        // force state to playing mode
        if (this.state === 'playing') {
            this.pause();
        }

        // cache current animations
        for (const animation of this.finishedAnimations) {
            this.animations.add(animation);
        }
        
        // for restart, only partial params needed to reset
        this.finishedAnimations = new Set();
        this.requestId          = null;
        this.startTime          = Date.now();
        this.pauseTime          = null;
        this.state              = 'playing';

        this.tick()
    }

    pause() {
        // work only state is playing mode
        if (this.state !== 'playing') {
            return;
        }

        // set pause mode and pause time
        this.state     = 'pause';
        this.pauseTime = Date.now();
        
        // clean animation frame
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId)
            this.requestId = null;
        }
    }

    resume() {
        // only work when state is pause
        if (this.state !== 'pause') {
            return;
        }

        // set playing mode and start time which is added up from different between now and pause time
        this.state     = 'playing';
        this.startTime = this.startTime + Date.now() - this.pauseTime;

        this.tick();
    }

    add(animation, addTime) {
        // cache animation
        this.animations.add(animation);

        // work only playing mode
        if (this.state === 'playing' && this.requestId === null) {
            this.tick();
        }
        
        // cache add time for each animation 
        if (this.state === 'playing') {
            this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime);
        } else {
            this.addTimes.set(animation, addTime !== void 0 ? addTime : 0);
        }
    }
}

// position animation
export class Animation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object         = object;
        this.template       = template;
        this.property       = property;
        this.start          = start;
        this.end            = end;
        this.duration       = duration;
        this.delay          = delay || 0;
        this.timingFunction = timingFunction;
    }

    // compute new position value based on progression and position difference
    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start);
    }
}

// color styling animation
export class ColorAnimation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object         = object;
        this.template       = template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
        this.property       = property;
        this.start          = start;
        this.end            = end;
        this.duration       = duration;
        this.delay          = delay || 0;
        this.timingFunction = timingFunction;
    }

    // compute new color value based on progression and color difference
    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}