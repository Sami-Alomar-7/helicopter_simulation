import vector from "./vectore";
import Forces from "./forces";

class helper
{
constructor
    (
    r,
    spinnerSpace,
    heliMass,
    fualMass,
    temperature,
    airPressure,
    windSpeed
    )
    {
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
    airBorn()
    {
        console.log('1')
        this.forces.totalForces();
        this.totalForces = vector.create(
            this.forces.totalForces.getX(),
            this.forces.totalForces.getY(),
            this.forces.totalForces.getZ()
        );
        console.log('2')

        this.acceleration = vector.create(
            (this.totalForces.getX() / this.totalMass),
            (this.totalForces.getY() / this.totalMass),
            (this.totalForces.getZ() / this.totalMass)
        );

        console.log('2')

        this.vilocity = vector.create(
            this.vilocity.getX() + this.acceleration.getX() * this.dTime,
            this.vilocity.getY() + this.acceleration.getY() * this.dTime,
            this.vilocity.getZ() + this.acceleration.getZ() * this.dTime
        );

        this.position.setX(this.position.getX() + this.vilocity.getX() * this.dTime);
        this.position.setY(this.position.getY() + this.vilocity.getY() * this.dTime);
        this.position.setZ(this.position.getZ() + this.vilocity.getZ() * this.dTime);

        this.position.multiply(6500);
    }
}
export default helper;