import vector from "./vectore";
import Forces from "./forces";

class Update {
    constructor(
        r,
        heliMass,
        fualMass,
        temperature,
        windSpeed
    ) {
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
        this.dTime = 0.02;
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
            { h: 0, p: 1.225 },
            { h: 500, p: 1.202 },
            { h: 1000, p: 1.1770 },
            { h: 1500, p: 1.154 },
            { h: 2000, p: 1.131 },
            { h: 2500, p: 1.109 },
            { h: 3000, p: 1.087 },
            { h: 3500, p: 1.066 },
            { h: 4000, p: 1.046 },
            { h: 4500, p: 1.026 },
            { h: 5000, p: 1.007 },
            { h: 5500, p: 0.988 },
            { h: 6000, p: 0.970 },
            { h: 6500, p: 0.953 },
            { h: 7000, p: 0.936 },
            { h: 7500, p: 0.919 },
            { h: 8000, p: 0.903 },
            { h: 8500, p: 0.888 },
            { h: 9000, p: 0.873 },
            { h: 9500, p: 0.858 },
            { h: 10000, p: 0.844 },
            { h: 10500, p: 0.830 },
            { h: 11000, p: 0.817 }
        ];
        this.currentP = 1.225;
        this.auto = true;
    }
    // call the acceleration based on the new rotor force and then the W and velocity...
    // Finally we set the force as zero again because we are applying this force once for each press
    rotor_update() {
        if (this.auto) {
            // calculate the accleration of the rotors
            this.rotorAcceleration = this.rotorMoveForce / this.rotorMass;
            // calculate the angele velocity
            this.W += this.rotorAcceleration * this.dTime;
            // calculate the velocity
            this.rotorVelocity = this.W * this.r;
            // reset the force to zero to detrmin that the force which has given from the motor is over here
            this.rotorMoveForce = 0;
        }
        else {
            if (this.rotorVelocity >= 0) {
                this.rotorAcceleration += -1;
                this.W += this.rotorAcceleration * this.dTime;
                this.rotorVelocity = this.W * this.r;
            } else {
                this.rotorAcceleration = 0;
                this.W = 0;
                this.rotorVelocity = 0;
            }
        }
    }
    auto_pilot() {
        if (this.auto)
            this.auto = false;
        else
            this.auto = true;
    }
    // here we are reciving the new force which will eathir decrease or increase and then update the rotor
    update_spinner_velocity(value) {
        if (this.auto)
            // increase the forcse which the rotor gives to the rotor 
            this.rotorMoveForce += value;
        else
            this.rotorAcceleration += value;
        // call the responsible function for calculating the new velocity
        this.rotor_update();
    }
    // increase the force which moves the rotor which will then reduce the move force for the helicopter to increase
    move_up() {
        if (this.velocity.getForwardVelocity() < 178) {
            if (this.auto)
                // call the function which will update the rotor force
                this.update_spinner_velocity(7000);
            else
                this.update_spinner_velocity(5);
        }
        // update the helicopter position
        this.update_on_fly();
    }
    // decrease the force which moves the rotor which will then reduce the move force for the helicopter to decrease
    move_down() {
        if (this.velocity.getForwardVelocity() > 0) {
            if (this.auto)
                // call the function which will update the rotor force
                this.update_spinner_velocity(-7000);
            else
                this.update_spinner_velocity(-5);
        }
        // update the helicopter position
        this.update_on_fly();
    }
    // increase the angele between the x axis and the y axis which will decrease the left force and increase the thrust force
    move_forward() {
        if (this.forces.forwardBackAngele < Math.PI / 2)
            this.forces.forwardBackAngele += (10 * (Math.PI / 180));
        this.update_on_fly();
    }
    // increase the right angele which will decrease the forcse in the x axis and increase it in the -z axis
    move_right() {
        this.forces.right = (Math.PI / 3);
        this.forces.left = 0;
        this.update_on_fly();
    }
    // increase the left angele which will decrease the forcse in the x axis and increase it in the z axis
    move_left() {
        this.forces.left = (Math.PI / 3);
        this.forces.right = 0;
        this.update_on_fly();
    }
    
    // decrease the angele between the x axis and the y axis which will increase the left force and decrease the thrust force
    move_backword() {
        if (this.forces.forwardBackAngele > (- Math.PI / 2))
            this.forces.forwardBackAngele -= (10 * (Math.PI / 180));
        this.update_on_fly();
    }
    // increase the blade angele and call the update to calculate the new CL
    increase_alpha() {
        this.alpha += Math.PI / 180;
        this.update_alpha();
    }
    // decrease the blade angele and call the update to calculate the new CL
    decrease_alpha() {
        this.alpha -= Math.PI / 180;
        this.update_alpha();
    }
    // for updating the angel which will effect the CL and then the move force
    update_alpha() {
        if (this.alpha == 0)
            this.forces.CL = 0;
        // calculate the cl debending on the blade angele
        if (0 < this.alpha < (Math.PI / 8) || ((7 * Math.PI) / 8) < this.alpha < Math.PI)
            this.forces.CL = Math.sin(6 * this.alpha);
        if ((Math.PI / 8) <= this.alpha <= ((7 * Math.PI) / 8))
            this.forces.CL = Math.sin(2 * this.alpha);
    }
    // for updating the P
    update_P(height) {
        if (height > 0)
            for (let j = 0; j < this.P.length; j++)
                if (height < this.P[j].h)
                    this.currentP = this.P[j - 1].p;
    }
    // calculate the new fual mass passed on the decreasing in each frame
    update_fual(dTime) {
        this.fualMass = Math.max(this.fualMass - (this.massFlowRate * dTime), 0);
    }
    // when the helicopter is on the ground
    update_on_ground() {
        // reset the forcse which effects the helicopter on the ground mode
        this.forces.reset_forces();
        // calculate the total forcse for the helicopter on the ground mode
        this.forces.on_ground();
        // call the update for calculating the new acceleration, velocity and position
        this.update();
    }
    // when the helicopter is flying
    update_on_fly() {
        // get the appropriate P on this height
        this.update_P(this.position.getY());
        // reset the forcse to zero then calculate each force and get the total forcse
        this.forces.reset_forces();
        this.forces.total_forces();
        // decrease the right rotation if there were any till it hits zero
        if (this.forces.right > 0) {
            if (this.forces.right >= (Math.PI / 18))
                this.forces.right -= (Math.PI / 18);
            else
                this.forces.right = 0;
        }
        // increase the left rotation if there were any till it hits zero
        if (this.forces.left > 0) {
            if (this.forces.left >= (Math.PI / 18))
                this.forces.left -= (Math.PI / 18);
            else
                this.forces.left = 0;
        }
        // for calculating the new acceleration, velocity and posotion, and check for applying some connditions
        this.update();
    }
    // calculate the acceleration, velocity and the position and apply some main conditions
    update() {
        // in the automatic mood
        if (this.auto) {
            // then the total forces on the y axis is too small that means it reaches the heighst level for this CL
            if (Math.floor(this.forces.totalForces.getY()) <= 1) {
                this.forces.totalForces.setY(0);
            }
            // when the whole total forcse is very small then we the movement is statis
            if (Math.floor(this.forces.totalForces.getLength()) <= 1) {
                this.forces.totalForces = vector.create(0, 0, 0);
            }
            // when reaches the maximum allowed position then stop moving up
            if (this.position.getY() >= 10000) {
                this.forces.totalForces.setY(0);
            }
        }
        // print the new total forces
        console.log('total forces from update')
        console.log(this.forces.totalForces)
        // the new acceleration will be the total forcse divided by the total mass
        // we know:   F = m . a
        // then:      a = F / m
        this.acceleration = vector.create(
            (this.forces.totalForces.getX() / this.totalMass),
            (this.forces.totalForces.getY() / this.totalMass),
            (this.forces.totalForces.getZ() / this.totalMass)
        );
        if (this.forces.right === 0 && this.forces.left === 0) {
            this.acceleration.setX(0);
            this.velocity.setX(0);
        }
        // print the new acceleration
        console.log('acceleration from update')
        console.log(this.acceleration)
        // the new velocity will be the previous one plus the acceleration effect to just this frame 
        this.velocity = vector.create(
            this.velocity.getX() + this.acceleration.getX() * this.dTime,
            this.velocity.getY() + this.acceleration.getY() * this.dTime,
            this.velocity.getZ() + this.acceleration.getZ() * this.dTime
        );
        // print the new velocity
        console.log('velocity from update')
        console.log(this.velocity)
        // the new position will be the previous one plus the velocity effect to just this frame
        this.position = vector.create(
            this.position.getX() + this.velocity.getX() * this.dTime,
            this.position.getY() + this.velocity.getY() * this.dTime,
            this.position.getZ() + this.velocity.getZ() * this.dTime
        );
        // in the automatic mood
        if (this.auto) {
            // when the y forcse get very small then we have reached the maximum height for this CL 
            // so we should stop moving up ... we did not set the velocity to zero because the velocity 
            // will effect the drage force ... when we set it to zero then the drage force will be zero
            // then the move force will be the only force that effects the helicopter so that the 
            // total force will be equal to the move force...and that's wrong
            if (this.forces.totalForces.getY() < 1) {
                this.position.setY(this.position.getY() - (this.velocity.getY() * this.dTime));
            }
            // // when the forcse for the z axis is too small then the rotaion ends...so set its velocity to zero
            // if(this.forces.totalForces.getZ() < 0.5){
            //     this.velocity.setZ(0);
            // }
        }
        // print the new position
        console.log('position from update')
        console.log(this.position)
        // send the new position to the forces cause it will need it for calculating the new gravity acceleration
        this.forces.position = this.position;
    }
    // reset the forcse and the acceleration and velocity to zero
    reset_update() {
        this.forces.reset_forces();
        this.totalForces = vector.create(0, 0, 0);
        this.acceleration = vector.create(0, 0, 0);
        this.velocity = vector.create(0, 0, 0);
    }
}

export default Update;