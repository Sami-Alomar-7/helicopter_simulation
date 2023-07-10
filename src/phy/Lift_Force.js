import vector from "D:\Dem Bois\College\Third Year\Second Semester\Helicopter Physics Emulation Project\src\phy";

class forceSum
{
    constructer(position, cL, temperature, airPressure, velocity, upperSpace, spinnerSpace)
    {
        var temperature = temperature;
        var airPressure = airPressure;
        let r = r;
        let W = W;
        let velocity = r * W;
        let prevLatitude = 0 + prevLatitude;

        this.liftValue = this.totalForce();
        this.cL = cL;
        this.temperature = temperature;
        this.airPressure = airPressure;
        this.velocity = velocity * velocity;
        this.upperSpace = upperSpace;
        this.spinnerSpace = spinnerSpace;
        this.cL = this.windTunnel();
        this.latitude = prevLatitude + latitude
        this.position = vector.create(0,latitude,0);
    }

    windTunnel()
    {
        let cL;
        if(! cL)
        {
            this.cL = (2* liftForce) / (velocity * velocity) * (upperSpace + spinnerSpace) * airPressure;
        }
        return cL;
    }

    totalForce()
    {
        v = this.velocity;
        let liftValue = 1/2 (this.cL * (v * v) * (this.upperSpace + this.spinnerSpace));
        return liftValue;
    }

    updateTotalForce()
    {
        this.W = newW;
        this.spinnerSpace = newSpinnerSpace;
        this.upperSpace = newUpperSpace;
        this.totalForce();
    }
}



export default forceSum;