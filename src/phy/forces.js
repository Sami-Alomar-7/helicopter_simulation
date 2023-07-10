import vector from "./vectore";

class Forces{
    constructor(
        update,
        r,
        spinnerSpace,
        heliMass,
        fualMass,
        CL,
        CD,
        temperature, 
        airPressure,
        windSpeed,
        Ashape
    ) {
        this.totalForces = vector.create(0, 0, 0);
        this.position = vector.create(0, 0, 0);
        this.spinnerSpace = spinnerSpace;
        this.W = 0;
        this.r = r;
        this.rotorVilocity = 0;
        this.CL = CL;
        this.CD = CD;
        this.temperature = temperature;
        this.airPressure = airPressure;
        this.totalForces = vector.create(0, 0, 0);
        this.gravityForce = vector.create(0, 0, 0);
        this.testForce = vector.create(0, 0, 0);
        this.moveForce = vector.create(0, 0, 0);
        this.leftForce = vector.create(0, 0, 0);
        this.thrustForce = vector.create(0, 0, 0);
        this.parasiteDrag = vector.create(0, 0, 0);
        this.rotorDragForce = 0;
        this.rotorParasiteDrag = 0;
        this.rotorMoveForce = 0;
        this.windSpeed = windSpeed;
        this.fualMass = fualMass;
        this.heliMass = heliMass;
        this.rotoeMass = 14;
        this.totalMass = heliMass + fualMass + this.rotoeMass;
        this.massFlowRate = 2030;
        this.gravity = 0;
        this.latitudInRadians = 0.71;
        this.semi_majorAxis = {
            a : 6378137,
            b : 6356752.314245
        }
        this.GM = 3.986004418 * Math.pow(10,14);
        this.Ashape = Ashape;
        this.forwardBackAngele = 0;
        this.leftRightAngel = 0;
        this.rotorAshape = 1.7;
        this.update = update;
    }

// Gravity
    gravity_force(){
        // W = m * g
        // first calculate the gravity acceleration debending on the heli-height
        this.gravity_acceleration();
        // then calculate the gravity power 
        this.gravityForce = vector.create(0, -1 * this.totalMass * this.gravity, 0);
    }

    gravity_acceleration(){
        // calculate the gravity acceleration debending on WGS84 and Helmert's equations (https://mwrona.com/posts/gravity-models/)
        let height = this.position.getY();
        this.gravity = 9.780327 *
            ( 1 + (0.0053024 * Math.pow(Math.sin(this.latitudInRadians), 2) ) 
            - ( 0.0000058 * Math.pow(Math.sin(2 * this.latitudInRadians), 2) ) 
            ) + (this.GM / Math.pow(this.semi_majorAxis.a + height, 2)
                - this.GM / Math.pow(this.semi_majorAxis.a, 2));
    }

    test(){
        this.testForce = vector.create(0, this.totalMass * this.gravity, 0);
    }

// Move
    move_force() {
        // calculate the moving force 
        this.moveForce = 0.5 * this.CL * this.rotorVilocity * this.rotorVilocity * this.spinnerSpace;
    }

// Left
    left_force() {
        this.leftForce = vector.create(0, this.moveForce * Math.cos(this.forwardBackAngele), 0);
    }
    
// Thrust
    thrust_force() {
        this.thrustForce = vector.create(this.moveForce * Math.sin(this.forwardBackAngele), 0, 0);
    }
    
// Drage 
    parasite_drage_force() {
        this.parasiteDrag = vector.create(-(0.5 * this.CD * this.update.vilocity * this.update.vilocity * this.Ashape * this.airPressure), 0, 0);
    }

    rotor_drage_force() {
        this.rotorDragForce = 0.5 * (this.CD * this.W * this.W * this.r * this.r * this.rotorAshape * this.airPressure);
    }

    rotor_parasite_drag() {
        this.rotorParasiteDrag = 0.5 * (this.CD * this.rotorVilocity * this.rotorVilocity * this.rotorAshape * this.airPressure);
    }

    rotor_total_forces(){
        this.rotor_drage_force();
        this.rotor_parasite_drag();

        this.rotorTotalForces = this.rotorMoveForce - (this.rotorParasiteDrag + this.rotorDragForce);
        console.log('rotor forcses from Forcse')
        console.log(this.rotorTotalForces)
        console.log(this.rotorMoveForce)
        console.log(this.rotorDragForce)
        console.log(this.rotorParasiteDrag)
    }

    rotor_reset_forces(){
        this.rotorTotalForces = 0;
        this.rotorMoveForce = 0;
        this.rotorParasiteDrag = 0;
    }

// Total
    total_forces() {
        this.gravity_force();
        this.move_force();
        this.left_force();
        this.thrust_force();
        this.parasite_drage_force();
        
        // the submission of the total forces
        this.totalForces = this.totalForces.add(this.gravityForce);
        this.totalForces = this.totalForces.add(this.leftForce);
        this.totalForces = this.totalForces.add(this.thrustForce);
        this.totalForces = this.totalForces.add(this.parasiteDrag);
    }

// Reset
    reset_forces(){
        this.totalForces = vector.create(0, 0, 0);
        this.gravityForce = vector.create(0, 0, 0);
        this.moveForce = vector.create(0, 0, 0);
        this.leftForce = vector.create(0, 0, 0);
        this.thrustForce = vector.create(0, 0, 0);
    }

// States
    on_ground(){
        this.gravity_force();
        this.test();

        this.totalForces = this.totalForces.add(this.gravityForce);
        this.totalForces = this.totalForces.add(this.testForce);
    }

    on_ground_reset_forces(){
        this.gravityForce = vector.create(0, 0, 0);
        this.testForce = vector.create(0, 0, 0);
        this.totalForces = vector.create(0, 0, 0);
    }

}

export default Forces;