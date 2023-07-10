import vector from "./vectore";
import Forces from "./forces";
import { configs } from "@typescript-eslint/eslint-plugin";

class Update {
    constructor(
        r,
        spinnerSpace,
        heliMass,
        fualMass,
        temperature, 
        airPressure,
        windSpeed
    ){
        this.acceleration = vector.create(0, 0, 0);
        this.vilocity = vector.create(0, 0, 0);
        this.position = vector.create(0, 0, 0);
        this.totalForces = vector.create(0, 0, 0);
        this.rotorTotalForces = 0;
        this.rotorAcceleration = 0;
        this.W = 0;
        this.r = r; 
        this.rotorVilocity = 0;
        this.rotoeMass = 14;
        this.fualMass = fualMass;
        this.heliMass = heliMass;
        this.totalMass = heliMass + fualMass + this.rotoeMass;
        this.update_angle = 0;
        this.dTime = 0.01;
        this.ground = false;
        this.forces = new Forces(r, spinnerSpace, heliMass, fualMass, 1.33, 0.27, temperature, airPressure, windSpeed, 10);
    }

    rotor_update(){
        this.forces.rotor_total_forces();
        this.rotorAcceleration = this.forces.rotorTotalForces / this.rotoeMass;
        this.W = this.rotorAcceleration * this.dTime;
        this.forces.W = this.W;
        this.rotorVilocity = this.W * this.r;
        this.forces.rotorVilocity = this.rotorVilocity;
        console.log('rotor d')
        console.log(this.update.rotorParasiteDrage)
        console.log('rotor f')
        console.log(this.forces.rotorMoveForce)
        console.log('rotor total forces')
        console.log(this.forces.rotorTotalForces)
        console.log('rotor acceleration')
        console.log(this.rotorAcceleration)
        console.log('rotor w')
        console.log(this.W)
        console.log('rotor vilocity')
        console.log(this.rotorVilocity)
    }

    update_spinner_vilocity(f){
        this.forces.rotorMoveForce += f;
        this.rotor_update();
    }

    move_up(){
        this.update_spinner_vilocity(1000);
        this.update();
    }

    update_fual(dTime) {
        this.fualMass = Math.max(this.fualMass - (this.massFlowRate * dTime), 0);
    }

    update(){
        this.forces.reset_forces();
        this.forces.total_forces();

        this.totalForces = vector.create(
            this.forces.totalForces.getX(),
            this.forces.totalForces.getY(),
            this.forces.totalForces.getZ()
        );
        /*
        console.log('total forces')
        console.log(this.totalForces)
*/
        this.acceleration = vector.create(
            (this.totalForces.getX() / this.totalMass),
            (this.totalForces.getY() / this.totalMass),
            (this.totalForces.getZ() / this.totalMass)
        );
    /*
        console.log('acceleration')
        console.log(this.acceleration)
*/
        this.vilocity = vector.create(
            this.vilocity.getX() + this.acceleration.getX() * this.dTime,
            this.vilocity.getY() + this.acceleration.getY() * this.dTime,
            this.vilocity.getZ() + this.acceleration.getZ() * this.dTime
        );
        /*
        console.log('vilocity')
        console.log(this.vilocity)
*/
        this.position.setX(this.position.getX() + this.vilocity.getX() * this.dTime);
        this.position.setY(this.position.getY() + this.vilocity.getY() * this.dTime);
        this.position.setZ(this.position.getZ() + this.vilocity.getZ() * this.dTime);

        this.position.multiply(10000);
/*
        console.log('position ')
        console.log(this.position)
        */
    }

    reset_update(){
        this.forces.reset_forces();
        this.totalForces = vector.create(0, 0, 0);
        this.acceleration = vector.create(0, 0, 0);
        this.vilocity = vector.create(0, 0, 0);
    }
}

export default Update;