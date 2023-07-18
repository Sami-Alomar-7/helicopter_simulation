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
        this.totalForces = vector.create(0, 0, 0);
        this.acceleration = vector.create(0, 0, 0);
        this.vilocity = vector.create(0, 0, 0);
        this.position = vector.create(0, 0, 0);
        this.rotorTotalForces = 0;
        this.rotorAcceleration = 0;
        this.W = 0;
        this.r = r; 
        this.rotorVelocity = 0;
        this.rotorMass = 14;
        this.fualMass = fualMass;
        this.heliMass = heliMass;
        this.totalMass = heliMass + fualMass + this.rotorMass;
        this.update_angle = 0;
        this.dTime = 0.001;
        this.ground = false;
        this.forces = new Forces(
            this,
            r,
            heliMass,
            fualMass,
            1.33,
            0.27,
            temperature,
            windSpeed
        );
    }
    // call the rotor total-forces then update the rotor f,a,w,v here
    rotor_update(){
        this.forces.rotor_reset_forces();
        this.forces.rotor_total_forces();
        console.log('rotor total forces from update')
        console.log(this.forces.rotorTotalForces)
        this.rotorAcceleration = this.forces.rotorTotalForces / this.totalMass;
        console.log('rotor acceleration from update')
        console.log(this.rotorAcceleration)
        this.W = this.rotorAcceleration * this.dTime;
        console.log('rotor W from update')
        console.log(this.W)
        this.rotorVelocity = this.W * this.r;
        console.log('rotor velocity from update')
        console.log(this.rotorVelocity)
        this.forces.rotorVelocity = this.rotorVelocity;
    }

    update_spinner_vilocity(f){
        this.rotorForce += f;
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

    update_on_fly() {
        this.forces.reset_forces();
        this.forces.total_forces();

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

        this.vilocity = vector.create(
            this.vilocity.getX() + this.acceleration.getX() * this.dTime,
            this.vilocity.getY() + this.acceleration.getY() * this.dTime,
            this.vilocity.getZ() + this.acceleration.getZ() * this.dTime
        );

        this.position = vector.create(
            this.position.getX() + this.vilocity.getX() * this.dTime,
            this.position.getY() + this.vilocity.getY() * this.dTime,
            this.position.getZ() + this.vilocity.getZ() * this.dTime
        );

        this.forces.position = this.position;
    }

    reset_update(){
        this.forces.reset_forces();
        this.totalForces = vector.create(0, 0, 0);
        this.acceleration = vector.create(0, 0, 0);
        this.vilocity = vector.create(0, 0, 0);
    }
}

export default Update;