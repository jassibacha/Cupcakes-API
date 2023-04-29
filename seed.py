from app import app
from models import db, Cupcake


db.drop_all()
db.create_all()

c1 = Cupcake(
    flavor="cherry",
    size="large",
    rating=5,
    image="https://sugargeekshow.com/wp-content/uploads/2022/08/vanilla_cupcakes_featured-scaled.jpg"
)

c2 = Cupcake(
    flavor="chocolate",
    size="small",
    rating=9,
    image="https://thebusybaker.ca/wp-content/uploads/2019/09/best-ever-from-scratch-chocolate-cupcakes-fb-ig-3.jpg"
)

c3 = Cupcake(
    flavor="vanilla",
    size="small",
    rating=7,
    image="https://www.recipetineats.com/wp-content/uploads/2020/09/Vanilla-Cupcakes-with-Vanilla-Swiss-Meringue-SQ.jpg"
)

c4 = Cupcake(
    flavor="vanilla",
    size="medium",
    rating=2,
    image="https://beyondfrosting.com/wp-content/uploads/2022/01/Easy-Moist-Vanilla-Cupcakes-021-2.jpg"
)

db.session.add_all([c1, c3, c2, c4])
db.session.commit()