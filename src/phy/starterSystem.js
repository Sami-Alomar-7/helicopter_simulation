class StarterSystem{
    constructor(){
        this.rotorInertia = 100;
        this.rotorVelocity = 0;
        // the torque provided by the starter motor
        this.starterTorque = 100;
        // the duaration ot the starting system till finish
        this.starterDuaration = 5;

        // the engine's power
        this.P = 104;
        this.finalRototSpeed = 383;

        // the difference between the final speed and the current speed
        this.deltaRotorSpeed = this.finalRototSpeed - this.rotorVelocity;
        this.accelerationTime = this.starterDuaration;
        this.requiredTorque = this.rotorInertia * this.deltaRotorSpeed / this.accelerationTime;
    }
    
    setTime(){
        this.startTime = Date.now();
        this.endTime = this.startTime + this.starterDuaration * 1000;
    }
}

export default StarterSystem;