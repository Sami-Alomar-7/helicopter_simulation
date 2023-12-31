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
        this.massFlowRate = 2.03;
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
                this.rotorAcceleration -= 0.5;
                this.W = this.rotorAcceleration * this.dTime;
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
        if (this.forces.forwardBackAngele < (Math.PI / 4) - (Math.PI / 36))
            this.forces.forwardBackAngele += (Math.PI / 36);
        this.update_on_fly();
    }
    // increase the right angele which will decrease the forcse in the x axis and increase it in the -z axis
    move_right() {
        if (this.forces.right < (Math.PI / 6))
            this.forces.right += (Math.PI / 36);
        this.forces.left = 0;
        this.update_on_fly();
    }
    // increase the left angele which will decrease the forcse in the x axis and increase it in the z axis
    move_left() {
        if (this.forces.left < (Math.PI / 6))
            this.forces.left += (Math.PI / 36);
        this.forces.right = 0;
        this.update_on_fly();
    }

    // decrease the angele between the x axis and the y axis which will increase the left force and decrease the thrust force
    move_backword() {
        if (this.forces.forwardBackAngele > (- Math.PI / 4) + (Math.PI / 36))
            this.forces.forwardBackAngele -= (Math.PI / 36);
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
    update_fual() {
        this.fualMass = Math.max(this.fualMass - (this.massFlowRate * this.dTime), 0);
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
        this.update_P(this.position.getY());
        this.calculateForces();
        this.adjustRotations();

        this.update();
    }

    calculateForces() {
        // update the fual mass whil its flying
        this.update_fual();
        // reset the forcse to zero 
        this.forces.reset_forces();
        if (this.fualMass)
            // calculate each force and get the total forcse
            this.forces.total_forces();
        else
            // calculate the drage forces which will be the only effect on the helicopter and get the total forces
            this.forces.total_forces_without_fual();
    }

    adjustRotations() {
        this.decreaseRotation('right');
        this.increaseRotation('left');
    }

    decreaseRotation(direction) {
        if (this.forces[direction] > 0) {
            const decrement = Math.min(this.forces[direction], Math.PI / 180);
            this.forces[direction] -= decrement;
        }
    }

    increaseRotation(direction) {
        if (this.forces[direction] > 0) {
            const decrement = Math.min(this.forces[direction], Math.PI / 180);
            this.forces[direction] -= decrement;
        }
    }

    // calculate the acceleration, velocity and the position and apply some main conditions
    update() {
        if (this.auto) {
            this.adjustForcesY();
            this.adjustForcesLength();
            this.limitPositionY();
        }

        if (this.forces.forwardBackAngele <= 0) {
            if (this.velocity.getZ() < 0)
                this.velocity.setZ(0);
        }

        this.logForces('total forces from update', this.forces.totalForces);

        this.calculateAcceleration();

        if (this.noHorizontalForce()) {
            this.acceleration.setX(0);
            this.velocity.setX(0);
        }

        this.logForces('acceleration from update', this.acceleration);

        this.calculateVelocity();

        this.logForces('velocity from update', this.velocity);

        this.calculatePosition();

        if (this.auto && this.isVerticalForceSmall()) {
            this.moveUpWithoutDrag();
        }

        this.logPosition('position from update', this.position);

        this.forces.position = this.position;
    }

    adjustForcesY() {
        if (Math.floor(this.forces.totalForces.getY()) <= 1) {
            this.forces.totalForces.setY(0);
        }
    }

    adjustForcesLength() {
        if (Math.floor(this.forces.totalForces.getLength()) <= 1) {
            this.forces.totalForces = vector.create(0, 0, 0);
        }
    }

    limitPositionY() {
        if (this.position.getY() >= 10000) {
            this.forces.totalForces.setY(0);
        }
    }

    logForces(message, forces) {
        console.log(message);
        console.log(forces);
    }

    calculateAcceleration() {
        const invTotalMass = 1 / this.totalMass;
        this.acceleration = vector.create(
            this.forces.totalForces.getX() * invTotalMass,
            this.forces.totalForces.getY() * invTotalMass,
            this.forces.totalForces.getZ() * invTotalMass
        );
    }

    noHorizontalForce() {
        return this.forces.right === 0 && this.forces.left === 0;
    }

    calculateVelocity() {
        this.velocity = vector.create(
            this.velocity.getX() + this.acceleration.getX() * this.dTime,
            this.velocity.getY() + this.acceleration.getY() * this.dTime,
            this.velocity.getZ() + this.acceleration.getZ() * this.dTime
        );
    }

    calculatePosition() {
        this.position = vector.create(
            this.position.getX() + this.velocity.getX() * this.dTime,
            this.position.getY() + this.velocity.getY() * this.dTime,
            this.position.getZ() + this.velocity.getZ() * this.dTime
        );
    }

    isVerticalForceSmall() {
        return this.forces.totalForces.getY() < 1;
    }

    moveUpWithoutDrag() {
        this.position.setY(this.position.getY() - (this.velocity.getY() * this.dTime));
    }

    logPosition(message, position) {
        console.log(message);
        console.log(position);
        // // in the automatic mood
        // if (this.auto) {
        //     // when the y forcse get very small then we have reached the maximum height for this CL 
        //     // so we should stop moving up ... we did not set the velocity to zero because the velocity 
        //     // will effect the drage force ... when we set it to zero then the drage force will be zero
        //     // then the move force will be the only force that effects the helicopter so that the 
        //     // total force will be equal to the move force...and that's wrong
        //     if (this.forces.totalForces.getY() < 1) {
        //         this.position.setY(this.position.getY() - (this.velocity.getY() * this.dTime));
        //         if (this.position.getY() < 3 && this.alpha < 0) {
        //             this.acceleration.setY(0);
        //             this.velocity.setY(0)
        //         }
        //     }
        //     if (this.forces.totalForces.getY() < 0 && this.position.getY() > 0 && this.alpha < 0) {
        //         this.position.setY(this.position.getY() + (this.velocity.getY() * this.dTime));
        //     }
        //     // // when the forcse for the z axis is too small then the rotaion ends...so set its velocity to zero
        //     // if(this.forces.totalForces.getZ() < 0.5){
        //     //     this.velocity.setZ(0);
        //     // }
        // }
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