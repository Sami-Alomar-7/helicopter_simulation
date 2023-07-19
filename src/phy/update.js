import vector from "./vectore";
import Forces from "./forces";

class Update {
    constructor(
        r,
        heliMass,
        fualMass,
        temperature,
        windSpeed
    ){
        this.acceleration = vector.create(0, 0, 0);
        this.velocity = vector.create(0, 0, 0);
        this.position = vector.create(0, 0, 0);
        this.rotorMoveForce = 0;
        this.rotorAcceleration = 0;
        this.W = 0;
        this.r = r; 
        this.rotorVelocity = 0;
        this.rotorMass = 14;
        this.fualMass = fualMass;
        this.heliMass = heliMass;
        this.totalMass = heliMass + fualMass + this.rotorMass;
        this.update_angle = 0;
        this.dTime = 0.01;
        this.ground = false;
        this.forces = new Forces(
            this,
            r,
            heliMass,
            fualMass,
            0.27,
            temperature,
            windSpeed
        );
        this.alpha = 0;
        this.i = 0
        this.P = [
            { h: 0       , p: 1.225  }, 
            { h: 609.6   , p: 1.1549 }, 
            { h: 1219.2  , p: 1.0885 }, 
            { h: 1828.8  , p: 1.0256 }, 
            { h: 10972.8 , P: 0.3639 }
        ];
        this.currentP = 1.225;
    }
    // call the rotor total-forces then update the rotor f,a,w,v here
    rotor_update(){
        // just for testing now move it twice
        if(this.i++ < 2)
            this.update_alpha();
        // calculate the accleration of the rotors
        this.rotorAcceleration = this.rotorMoveForce / this.rotorMass;
        // calculate the angele velocity
        this.W += this.rotorAcceleration * this.dTime;
        // calculate the velocity
        this.rotorVelocity = this.W * this.r;
        // reset the force to zero to detrmin that the force which has given from the motor is over here
        this.rotorMoveForce = 0;
    }

    update_spinner_velocity(f){
        // increase the forcse which the rotor gives to the rotor 
        this.rotorMoveForce += f;
        // call the responsible function for calculating the new velocity
        this.rotor_update();
    }

    move_up(){
        // call the function which will update the rotor force
        this.update_spinner_velocity(100000);
        // update the helicopter position
        this.update();
    }

    move_forward() {
        // increase the forward angele 
        this.forces.forwardBackAngele += (Math.PI / 9);
        console.log(Math.PI / 9)
        console.log('forward angel')
        console.log(this.forces.forwardBackAngele);
    }

    // for updating the CL
    update_alpha() {
        // increase the blade angele
        this.alpha += Math.PI / 32;
        // calculate the cl debending on the blade angele
        if(0 < this.alpha < (Math.PI / 8) || ((7 * Math.PI) / 8) < this.alpha < Math.PI)
            this.forces.CL = Math.sin(6 * this.alpha);
        if( (Math.PI / 8) <= this.alpha <= ((7 * Math.PI) / 8))
            this.forces.CL = Math.sin(2 * this.alpha);
    }

    // for updating the P
    update_P(height) {
        for(let j = 0; j < this.P.length(); j++)
            if(height < this.P[j].h)
                this.currentP = this.P[j-1].p;
    }

    update_fual(dTime) {
        this.fualMass = Math.max(this.fualMass - (this.massFlowRate * dTime), 0);
    }

    update_on_ground(){
        // reset the forcse which effects the helicopter on the ground mode
        this.forces.on_ground_reset_forces();
        // calculate the total forcse for the helicopter on the ground mode
        this.forces.on_ground();
        // call the update for calculating the new acceleration, velocity and position
        this.update();
    }

    update_on_fly() {
        this.forces.reset_forces();
        this.forces.total_forces();

        this.update();
    }

    update(){
        console.log('total forces from update')
        console.log(this.forces.totalForces)

        this.acceleration = vector.create(
            (this.forces.totalForces.getX() / this.totalMass),
            (this.forces.totalForces.getY() / this.totalMass),
            (this.forces.totalForces.getZ() / this.totalMass)
        );

        console.log('acceleration from update')
        console.log(this.acceleration)

        this.velocity = vector.create(
            this.velocity.getX() + this.acceleration.getX() * this.dTime,
            this.velocity.getY() + this.acceleration.getY() * this.dTime,
            this.velocity.getZ() + this.acceleration.getZ() * this.dTime
        );

        console.log('velocity from update')
        console.log(this.velocity)

        this.position = vector.create(
            this.position.getX() + this.velocity.getX() * this.dTime,
            this.position.getY() + this.velocity.getY() * this.dTime,
            this.position.getZ() + this.velocity.getZ() * this.dTime
        );

        console.log('position from update')
        console.log(this.position)

        this.forces.position = this.position;
    }

    reset_update(){
        this.forces.reset_forces();
        this.totalForces = vector.create(0, 0, 0);
        this.acceleration = vector.create(0, 0, 0);
        this.velocity = vector.create(0, 0, 0);
    }
}

export default Update;