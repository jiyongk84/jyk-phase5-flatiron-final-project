import random
from datetime import datetime, timedelta
from decimal import Decimal
from app import app
from models import db, Flight, Airport

if __name__ == '__main__':
    with app.app_context():
        print("Seeding 20 future flight information with many-to-many relationships and prices...")

        
        num_flights = 20

        airports = Airport.query.all()

        
        start_date = datetime.now() + timedelta(days=7)

        for _ in range(num_flights):
            # Generate random flights
            flight_name = f"Flight {random.randint(100, 999)}"
            flight_date = start_date + timedelta(days=random.randint(1, 30))
            departure_time = datetime.strptime(f"{random.randint(0, 23)}:{random.randint(0, 59)}", "%H:%M").time()
            destination_time = (
                datetime.combine(datetime.today(), departure_time)
                + timedelta(hours=random.randint(1, 8))
            ).time()

            
            departure_airport = random.choice(airports)
            destination_airport = random.choice(airports)

            
            price = Decimal(random.uniform(100, 1000)).quantize(Decimal('0.01'))

            
            flight = Flight(
                name=flight_name,
                airline="Paradise Airlines",
                flight_date=flight_date.date(),
                departure_time=departure_time,
                destination_time=destination_time,
                departure_airport=departure_airport,
                destination_airport=destination_airport,
                price=price
            )

            
            db.session.add(flight)

        
        db.session.commit()

