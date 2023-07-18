import vector from "./vectore";

class Forces{
    constructor(
        update,
        r,
        heliMass,
        fualMass,
        CL,
        CD,
        temperature,
        windSpeed
    ) {
        this.totalForces = vector.create(0, 0, 0);
        this.position = vector.create(0, 0, 0);
        this.r = r;
        this.rotorVelocity = 0;
        this.CL = CL;
        this.CD = CD;
        this.temperature = temperature;
        this.totalForces = vector.create(0, 0, 0);
        this.gravityForce = vector.create(0, 0, 0);
        this.testForce = vector.create(0, 0, 0);
        this.moveForce = 0;
        this.leftForce = vector.create(0, 0, 0);
        this.thrustForce = vector.create(0, 0, 0);
        this.DragForce = vector.create(0, 0, 0);
        this.rotorTotalForces = 0;
        this.rotorDragForce = 0;
        this.rotorMoveForce = 0;
        this.windSpeed = windSpeed;
        this.fualMass = fualMass;
        this.rotorMass = 14;
        this.heliMass = heliMass;
        this.totalMass = heliMass + fualMass + this.rotorMass;
        this.massFlowRate = 2030;
        this.gravity = 0;
        this.latitudInRadians = 0.71;
        this.semi_majorAxis = {
            a : 6378137,
            b : 6356752.314245
        }
        this.GM = 3.986004418 * Math.pow(10,14);
        this.Ashape = 46.2;
        this.rotorAshape = 1.7;
        this.P = 1.225;
        this.update = update;
        this.first = false;
        // free stream velocity in m/s
        this.v_inf = 10;
        /* 
        * Cd0​ and Cd1​ are drag coefficients that depend on 
        * the blade shape, angle of attack, and Reynolds number
        * radius of the rotor in m 
        */
        // profile drag coefficient var 
        this.Cd0 = 0.01; 
        // induced drag coefficient 
        this.Cd1 = 0.1; 
        // reference area of the rotor in m^2
        this.A = Math.PI * this.update.r * this.update.r; 
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
    rotor_move_force() {
        // calculate the moving force for rotor
        this.rotorMoveForce = 0.5 * this.CL * this.update.rotorVelocity * this.update.rotorVelocity * (this.rotorAshape + this.Ashape) * this.P;
    }

// Left
    left_force() {
        this.leftForce = vector.create(0, this.rotorMoveForce * Math.cos(this.forwardBackAngele), 0);
    }

// Thrust
    thrust_force() {
        this.thrustForce = vector.create(this.rotorMoveForce * Math.sin(this.forwardBackAngele), 0, 0);
    }

// Drage 
    drage_force() {
        this.DragForce = vector.create(-(0.5 * this.CD * this.update.vilocity.getX() * this.update.vilocity.getX() * (this.Ashape + this.rotorAshape) * this.P), 0, 0);
    }

    rotor_total_forces(){
        if(!this.first){
            this.rotorTotalForces = this.update.rotorTotalForces;
            this.first = true;
        }
        console.log('total forces from forces')
        console.log(this.rotorTotalForces);
    }

    rotor_reset_forces(){
        this.rotorTotalForces = 0;
        this.rotorMoveForce = 0;
        this.rotorDragForce = 0;
    }

// Total
    total_forces() {
        this.gravity_force();
        this.rotor_move_force();
        this.left_force();
        this.thrust_force();
        this.drage_force();
        
        // the submission of the total forces
        this.totalForces = this.totalForces.add(this.gravityForce);
        this.totalForces = this.totalForces.add(this.leftForce);
        this.totalForces = this.totalForces.add(this.thrustForce);
        this.totalForces = this.totalForces.add(this.DragForce);
    }

// Reset
    reset_forces(){
        this.totalForces = vector.create(0, 0, 0);
        this.gravityForce = vector.create(0, 0, 0);
        this.leftForce = vector.create(0, 0, 0);
        this.thrustForce = vector.create(0, 0, 0);
        this.DragForce = vector.create(0, 0, 0);
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