import vector from "./vectore";
import Forces from "./forces";

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
        this.rotorVelocity = 0;
        this.rotoeMass = 14;
        this.fualMass = fualMass;
        this.heliMass = heliMass;
        this.totalMass = heliMass + fualMass + this.rotoeMass;
        this.update_angle = 0;
        this.dTime = 0.01;
        this.ground = false;
        this.test = 1;
        this.forces = new Forces(this, r, spinnerSpace, heliMass, fualMass, 1.33, 0.27, temperature, airPressure, windSpeed, 10);
    }
    // call the rotor total-forces then update the rotor f,a,w,v here
    rotor_update(){
        this.forces.rotor_total_forces();
        console.log('rotor total forces from update')
        console.log(this.forces.rotorTotalForces)
        this.rotorAcceleration = this.forces.rotorTotalForces / this.rotoeMass;
        console.log('rotor acceleration from update')
        console.log(this.rotorAcceleration)
        this.W = this.rotorAcceleration * this.dTime;
        console.log('rotor W from update')
        console.log(this.W)
        this.rotorVelocity = this.W * this.r;
        console.log('rotor rotor velocity from update')
        console.log(this.rotorVelocity)
        this.forces.rotorVelocity = this.rotorVelocity;
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

    update_on_ground(){
        this.forces.on_ground_reset_forces();
        this.forces.on_ground();

        this.update();
    }

    update(){
        console.log('total forces from update')
        console.log(this.forces.totalForces)
        this.totalForces = vector.create(
            this.forces.totalForces.getX(),
            this.forces.totalForces.getY(),
            this.forces.totalForces.getZ()
        );
        
        console.log('total forces from update')
        console.log(this.totalForces)

        this.acceleration = vector.create(
            (this.totalForces.getX() / this.totalMass),
            (this.totalForces.getY() / this.totalMass),
            (this.totalForces.getZ() / this.totalMass)
        );
    
        console.log('acceleration from update')
        console.log(this.acceleration)

        this.vilocity = vector.create(
            this.vilocity.getX() + this.acceleration.getX() * this.dTime,
            this.vilocity.getY() + this.acceleration.getY() * this.dTime,
            this.vilocity.getZ() + this.acceleration.getZ() * this.dTime
        );
        
        console.log('vilocity from update')
        console.log(this.vilocity)

        this.position.setX(this.position.getX() + this.vilocity.getX() * this.dTime);
        this.position.setY(this.position.getY() + this.vilocity.getY() * this.dTime);
        this.position.setZ(this.position.getZ() + this.vilocity.getZ() * this.dTime);

        this.position.multiply(6000);

        console.log('position from update')
        console.log(this.position)
    }

    reset_update(){
        this.forces.reset_forces();
        this.totalForces = vector.create(0, 0, 0);
        this.acceleration = vector.create(0, 0, 0);
        this.vilocity = vector.create(0, 0, 0);
    }
}

export default Update;