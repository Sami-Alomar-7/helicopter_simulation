class StarterSystem{
    constructor(){
        this.rotorInertia = 100;
        this.rotorVilocity = 0;
        // the torque provided by the starter motor
        this.starterTorque = 100;
        // the duaration ot the starting system till finish
        this.starterDuaration = 5;

        // the engines power
        this.P = 104;

        // the final speed which we are willing to reach
        this.finalRototSpeed = 383;
        // the difference between the final speed and the current speed
        this.deltaRotorSpeed = this.finalRototSpeed - this.rotorVilocity;
        this.accelerationTime = this.startDuaration;

        // the difference between the final speed and the current speed
        this.deltaRotorSpeed = this.finalRototSpeed - this.rotorVilocity;
        this.accelerationTime = this.startDuaration;

        this.requiredTorque = this.rotorInertia * this.deltaRotorSpeed / this.accelerationTime;
        this.startTime = Date.now();
        this.endTime = this.startTime + this.starterDuaration * 1000;
    }
}

export default StarterSystem;