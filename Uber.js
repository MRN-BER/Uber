users = Array();
riders = Array();
drivers = Array();
rideRequests = Array();
trips = Array();
cars = Array();
statusList = Array("Requested" , "Ongoing" , "Completed" ," Cancelled");

class User {
    constructor (name,email,rating,tripHistory) {
        this.name = name;
        this.id = Math.floor(Math.random() * 100);
        this.email = email;
        this.rating = rating + ' Stars';
        this.tripHistory = Array() ;
        users.push(this);
    }
    getProfile () {console.log( `Name : ${this.name}\n Id : ${this.id}\n Email : ${this.email}\n Rating : ${this.rating}\n Trip history : ${this.tripHistory}`)}
    addTrip (trip) {this.tripHistory.push(trip)}
    // addRating (score) {}
}
class Rider extends User {
    constructor (name,id,email,rating,tripHistory,walletBallance) {
        super(name,id,email,rating,tripHistory);
        this.walletBallance = walletBallance ;
        riders.push(this);
        new PaymentMethod();
    }
    requestRide(pickup,destination) {
        let rideRequestId = Math.floor(Math.random() * 10000);
        const request = new rideRequest(this.name,rideRequestId,pickup,destination,50);
        rideRequests.push(request)
        console.log( `${this.name} request a trip from ${pickup} to ${destination}`)
    }
    paymentMethod(pMethod){
        if(pMethod == 1){
            this.pay(15);
        }
    }
    pay(amount) {
        this.walletBallance -= amount;
            console.log('transaction completed');
            console.log(this.walletBallance + ' $');
    }
}
class Driver extends User {
    constructor (name,id,email,rating,tripHistory,car,isAvailable,currentLocation){
        super(name,id,email,rating,tripHistory);
        this.car = car;
        this.isAvailable = isAvailable;
        this.currentLocation = currentLocation;
        drivers.push(this);
    }
    acceptRide (rideRequest){
        const trip = new Trip(rideRequest.rider,this.name,rideRequest.id,rideRequest.pickup,rideRequest.destination,rideRequest.price,15);
        for (let i in rideRequests){
            if(rideRequests[i].id == rideRequest.id){
                delete rideRequests[i];
            }
        }
        trips.push(trip);
        console.log(`Ride N ${rideRequest.id} accepted`);
    }
    completeRide(trip){
        trip.status = statusList[2];
        const payment = new PaymentMethod();
        console.log(`payment method : ${payment.paymentmethods[0]} / ${payment.paymentmethods[1]} / ${payment.paymentmethods[2]} ?`);
    }

}
class Car {
    constructor(brand,model,plateNumber,pricePerKm){
        this.brand = brand;
        this.model = model;
        this.plateNumber = plateNumber;
        this.pricePerKm = pricePerKm + ' $';
        cars.push(this);
    }
}
class rideRequest {
    constructor(rider,id,pickup,destination,price){
        this.rider = rider;
        this.id = id;
        this.pickup = pickup;
        this.destination = destination;
        this.price = price;
        this.status = statusList[0];
    }
}
class Trip extends (rideRequest) {
    constructor(rider,driver,id,pickup,destination,price,distance){
        super(rider,id,pickup,destination,price);
        this.driver = driver;
        this.distance = distance;
        this.status = statusList[1];
    }
    calculatePrice(){}
    startTrip(){}
    endTrip(){}
    cancelTrip(){}
}
class PaymentMethod {
    paymentmethods = Array('Credit Card Payment','Wallet Payment','Cash Payment');
    constructor(){
    }
    pay(amount){}
}

// Test

Emma = new Rider('Emma',364,'emma@gmail.com',5,12,25);
Noah = new Driver('Noah',864,'noah@yahoo.fr',5,32,'Bmw',true,'Berlin');
Bmw = new Car('Bmw',2018,'246 873',2);

Emma.requestRide('Berlin','Frankfurt');
Noah.acceptRide(rideRequests[0]);
Noah.completeRide(trips[0]);
Emma.paymentMethod(1);

Emma.addTrip(trips[0]);
Noah.addTrip(trips[0]);