import vector from "D:\Dem Bois\College\Third Year\Second Semester\Helicopter Physics Emulation Project\src\phy";

class forceSum
{
    constructor(position, CD, r, W, upperSpace, spinnerSpace, temperature, airPressure)
    {
        this.position = vector.create(0, 0, 0);
        this.r = r;
        this.W = W;
        this.upperSpace = upperSpace;
        this.spinnerSpace = spinnerSpace;
        this.temperature = temperature;
        this.airPressure = airPressure;
        this.CD = CD;
    }
    
    dragForce()
    {
        this.velocity = r * W;
        this.drag_force = 1/2 * (this.CD * (this.velocity * this.velocity) * (this.upperSpace + this.spinnerSpace) * this.airPressure);   
    }

    resetDragForce()
    {
        this.position = vector.create(0, 0, 0);
        this.drag_force = 0;
    }

    updateDragForce()
    {
        this.resetDragForce();
        this.W = newW;
        this.spinnerSpace = newSpinnerSpace;
        this.upperSpace = newUpperSpace;
        this.dragForce();
    }

    parasiteDrag()
    {
        this.velocity = r * W;
        this.parasite_drag = 1/2 * (this.CD * (this.velocity * this.velocity) * this.airPressure * Ashape ); // check if A is the shape of the helicopter
    }

    resetParasiteDragForce()
    {
        this.position = vector.create(0, 0, 0);
        this.parasite_drag = 0;
    }

    updateParasiteDragForce()
    {
        this.resetParasiteDragForce();
        this.W = newW;
        this.spinnerSpace = newSpinnerSpace;
        this.upperSpace = newUpperSpace;
        this.Ashape = newAshape;
        this.parasitedDrag();
    }

    totalDrag()
    {
        let total_drag = this.dragForce() + this.parasiteDrag();
        console.log(total_drag);
    }
}

export default forceSum;