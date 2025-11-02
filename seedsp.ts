import "dotenv/config";
import { db } from "./db";
import { products } from "./db/schema";
import { and, eq } from "drizzle-orm";


const groceryData = {
    
  "categories": [
    {
      "name": "Fresh Fruits",
      "items": [
        "Apples", "Bananas", "Oranges", "Grapes", "Strawberries", "Blueberries", "Raspberries", "Blackberries", "Pineapple", "Mango",
        "Kiwi", "Peaches", "Plums", "Cherries", "Watermelon", "Cantaloupe", "Honeydew", "Lemons", "Limes", "Grapefruit",
        "Pears", "Avocados", "Papaya", "Guava", "Dragon fruit", "Passion fruit", "Figs", "Apricots", "Nectarines", "Clementines",
        "Tangerines", "Pomegranate", "Cranberries", "Rhubarb", "Star fruit", "Lychee", "Persimmons", "Plantains", "Dates", "Gooseberries",
        "Boysenberries", "Kumquats", "Mangosteen", "Mulberries", "Quince", "Elderberries", "Currants", "Coconut", "Tamarind", "Jackfruit"
      ]
    },
    {
      "name": "Fresh Vegetables",
      "items": [
        "Carrots", "Potatoes", "Onions", "Tomatoes", "Lettuce", "Spinach", "Kale", "Broccoli", "Cauliflower", "Cabbage",
        "Cucumbers", "Bell peppers", "Zucchini", "Eggplant", "Green beans", "Peas", "Corn", "Celery", "Mushrooms", "Garlic",
        "Ginger", "Radishes", "Beets", "Turnips", "Sweet potatoes", "Pumpkin", "Squash", "Asparagus", "Brussels sprouts", "Okra",
        "Artichokes", "Leeks", "Fennel", "Rutabaga", "Jicama", "Bok choy", "Swiss chard", "Collard greens", "Arugula", "Endive",
        "Romaine lettuce", "Iceberg lettuce", "Scallions", "Shallots", "Chili peppers", "Yellow squash", "Butternut squash", "Acorn squash", "Kohlrabi", "Watercress"
      ]
    },
    {
      "name": "Dairy Products",
      "items": [
        "Milk", "Cheese", "Butter", "Yogurt", "Cream", "Sour cream", "Cottage cheese", "Cream cheese", "Whipped cream", "Half-and-half",
        "Heavy cream", "Greek yogurt", "Skim milk", "Whole milk", "2% milk", "Almond milk", "Soy milk", "Oat milk", "Coconut milk beverage", "Lactose-free milk",
        "Ricotta cheese", "Mozzarella", "Cheddar", "Parmesan", "Feta", "Gouda", "Brie", "Swiss cheese", "Provolone", "Blue cheese",
        "Goat cheese", "String cheese", "Shredded cheese", "Buttermilk", "Evaporated milk", "Condensed milk", "Kefir", "Mascarpone", "Quark", "Colby jack",
        "Monterey jack", "Pepper jack", "Havarti", "Edam", "Paneer", "Queso fresco", "Farmer’s cheese", "Neufchâtel", "Crème fraîche", "Vegan cheese"
      ]
    },
    {
      "name": "Meat & Poultry",
      "items": [
        "Chicken breast", "Ground beef", "Pork chops", "Bacon", "Sausage", "Turkey breast", "Lamb chops", "Beef steak", "Chicken thighs", "Ground turkey",
        "Ham", "Salami", "Pepperoni", "Roast beef", "Deli turkey", "Deli ham", "Chicken wings", "Pork shoulder", "Beef brisket", "Veal cutlets",
        "Duck breast", "Goose", "Quail", "Rabbit", "Venison", "Corned beef", "Pastrami", "Bologna", "Hot dogs", "Chicken sausage",
        "Beef ribs", "Pork ribs", "Chicken drumsticks", "Turkey legs", "Beef liver", "Chicken liver", "Pork belly", "Chuck roast", "Sirloin steak", "Flank steak",
        "Skirt steak", "T-bone steak", "Ribeye steak", "Filet mignon", "Ground chicken", "Ground pork", "Beef tenderloin", "Chicken tenders", "Turkey bacon", "Italian sausage"
      ]
    },
    {
      "name": "Seafood",
      "items": [
        "Salmon", "Tuna", "Shrimp", "Cod", "Halibut", "Swordfish", "Trout", "Mackerel", "Sardines", "Anchovies",
        "Tilapia", "Catfish", "Snapper", "Grouper", "Mahi-mahi", "Bass", "Crab", "Lobster", "Scallops", "Mussels",
        "Clams", "Oysters", "Squid", "Octopus", "Pollock", "Haddock", "Flounder", "Perch", "Carp", "Eel",
        "Smoked salmon", "Canned tuna", "Canned salmon", "Frozen shrimp", "Breaded fish fillets", "Imitation crab", "Sea bass", "Arctic char", "Yellowtail", "Pompano",
        "Tuna steaks", "Salmon fillets", "Shrimp cocktail", "Crab cakes", "Fish sticks", "Dried fish", "Kippers", "Whitefish", "Sushi-grade tuna", "Sushi-grade salmon"
      ]
    },
    {
      "name": "Bakery",
      "items": [
        "White bread", "Whole wheat bread", "Sourdough", "Baguette", "Rye bread", "Pita bread", "Naan", "Tortillas", "Croissants", "Bagels",
        "Muffins", "Donuts", "Cinnamon rolls", "Brioche", "Ciabatta", "Multigrain bread", "English muffins", "Focaccia", "Rolls", "Buns",
        "Cupcakes", "Cookies", "Brownies", "Scones", "Danishes", "Pies", "Cakes", "Cheesecake", "Banana bread", "Zucchini bread",
        "Cornbread", "Pumpkin bread", "Pretzels", "Crackers", "Croutons", "Garlic bread", "Pizza dough", "Flatbread", "Pancakes", "Waffles",
        "Challah", "Babka", "Coffee cake", "Coffee bread", "Popovers", "Parker house rolls", "Dinner rolls", "Hamburger buns", "Hot dog buns", "Gluten-free bread"
      ]
    },
    {
      "name": "Breakfast Foods",
      "items": [
        "Cereal", "Oatmeal", "Granola", "Pancake mix", "Waffle mix", "Eggs", "Breakfast sausage", "Hash browns", "Frozen waffles", "Frozen pancakes",
        "Toaster pastries", "Muesli", "Breakfast bars", "Yogurt cups", "Smoothie packs", "Chia pudding", "Quinoa flakes", "Buckwheat groats", "Cream of wheat", "Grits",
        "Corn flakes", "Rice Krispies", "Frosted Flakes", "Cheerios", "Granola bars", "Protein bars", "Peanut butter", "Jam", "Honey", "Maple syrup",
        "Molasses", "Agave nectar", "Breakfast shakes", "Instant grits", "Steel-cut oats", "Rolled oats", "Puffed rice", "Shredded wheat", "Bran flakes", "Muesli bars",
        "Egg whites", "Scrambled egg mix", "Breakfast burritos", "Breakfast sandwiches", "English muffin sandwiches", "Breakfast wraps", "Breakfast pizza", "Breakfast quiche", "Breakfast casserole", "Breakfast smoothie mix"
      ]
    },
    {
      "name": "Canned Goods",
      "items": [
        "Canned beans", "Canned tomatoes", "Canned corn", "Canned peas", "Canned green beans", "Canned soup", "Canned tuna", "Canned salmon", "Canned chicken", "Canned beef",
        "Canned fruit", "Canned pineapple", "Canned peaches", "Canned pears", "Canned mushrooms", "Canned artichokes", "Canned olives", "Canned coconut milk", "Canned broth", "Canned chili",
        "Canned ravioli", "Canned spaghetti", "Canned baked beans", "Canned refried beans", "Canned black beans", "Canned kidney beans", "Canned chickpeas", "Canned lentils", "Canned beets", "Canned carrots",
        "Canned sweet potatoes", "Canned pumpkin", "Canned evaporated milk", "Canned condensed milk", "Canned sardines", "Canned anchovies", "Canned clams", "Canned oysters", "Canned tuna salad", "Canned chicken salad",
        "Canned vegetable juice", "Canned fruit cocktail", "Canned mandarin oranges", "Canned applesauce", "Canned tomato paste", "Canned tomato sauce", "Canned diced tomatoes", "Canned crushed tomatoes", "Canned stewed tomatoes", "Canned vegetable soup"
      ]
    },
    {
      "name": "Pasta & Noodles",
      "items": [
        "Spaghetti", "Penne", "Fusilli", "Farfalle", "Linguine", "Fettuccine", "Macaroni", "Lasagna sheets", "Rigatoni", "Ziti",
        "Orzo", "Angel hair", "Whole wheat pasta", "Gluten-free pasta", "Ramen noodles", "Udon noodles", "Soba noodles", "Rice noodles", "Egg noodles", "Couscous",
        "Polenta", "Gnocchi", "Tortellini", "Ravioli", "Cannelloni", "Vermicelli", "Bucatini", "Campanelle", "Cavatappi", "Ditalini",
        "Rotini", "Shells", "Radiatori", "Pappardelle", "Tagliatelle", "Conchiglie", "Stelline", "Acini di pepe", "Lasagna noodles", "Fresh pasta sheets",
        "Asian rice noodles", "Glass noodles", "Somen noodles", "Instant noodles", "Pasta shapes mix", "Pasta salad mix", "Mac and cheese kits", "Stuffed shells", "Manicotti", "Pasta with sauce packets"
      ]
    },
    {
      "name": "Rice, Grains & Legumes",
      "items": [
        "White rice", "Brown rice", "Basmati rice", "Jasmine rice", "Arborio rice", "Wild rice", "Quinoa", "Barley", "Bulgur", "Couscous",
        "Farro", "Millet", "Sorghum", "Teff", "Amaranth", "Lentils", "Black beans", "Kidney beans", "Pinto beans", "Chickpeas",
        "Navy beans", "Cannellini beans", "Lima beans", "Split peas", "Black-eyed peas", "Adzuki beans", "Mung beans", "Great Northern beans", "Soybeans", "Edamame",
        "Rolled oats", "Steel-cut oats", "Oat groats", "Cornmeal", "Polenta", "Semolina", "Buckwheat", "Kasha", "Wheat berries", "Rye berries",
        "Freekeh", "Triticale", "Spelt", "Kamut", "Red lentils", "Green lentils", "French lentils", "Yellow split peas", "Flax seeds", "Chia seeds"
      ]
    },
    {
      "name": "Snacks",
      "items": [
        "Potato chips", "Tortilla chips", "Popcorn", "Pretzels", "Nuts", "Trail mix", "Granola bars", "Protein bars", "Cookies", "Crackers",
        "Cheese puffs", "Rice cakes", "Pita chips", "Jerky", "Dried fruit", "Fruit snacks", "Gummy bears", "Chocolate bars", "Candy", "Licorice",
        "Marshmallows", "Peanut butter cups", "Graham crackers", "Animal crackers", "Wafer cookies", "Biscotti", "Shortbread", "Oatmeal cookies", "Chocolate chip cookies", "Brownies",
        "Energy balls", "Roasted chickpeas", "Seaweed snacks", "Veggie chips", "Kale chips", "Pop chips", "Nut bars", "Yogurt-covered raisins", "Fruit leather", "Sour candies",
        "Hard candies", "Lollipops", "Gum", "Mints", "Beef sticks", "Turkey jerky", "Popcorn kernels", "Microwave popcorn", "Popped sorghum", "Sesame sticks"
      ]
    },
    {
      "name": "Beverages",
      "items": [
        "Water", "Soda", "Juice", "Iced tea", "Coffee", "Tea", "Energy drinks", "Sports drinks", "Milk alternatives", "Smoothies",
        "Coconut water", "Lemonade", "Kombucha", "Sparkling water", "Flavored water", "Hot chocolate", "Espresso", "Cold brew", "Herbal tea", "Green tea",
        "Black tea", "White tea", "Oolong tea", "Chai", "Root beer", "Cola", "Lemon-lime soda", "Orange soda", "Ginger ale", "Club soda",
        "Tonic water", "Mineral water", "Fruit punch", "Apple juice", "Orange juice", "Cranberry juice", "Grape juice", "Pineapple juice", "Tomato juice", "V8 juice",
        "Almond milk", "Soy milk", "Oat milk", "Rice milk", "Coconut milk beverage", "Horchata", "Agua fresca", "Milkshakes", "Frappuccino", "Protein shakes"
      ]
    },
    {
      "name": "Frozen Foods",
      "items": [
        "Frozen vegetables", "Frozen fruits", "Frozen pizza", "Frozen dinners", "Frozen waffles", "Frozen pancakes", "Ice cream", "Frozen yogurt", "Popsicles", "Frozen juice bars",
        "Frozen shrimp", "Frozen fish fillets", "Frozen chicken nuggets", "Frozen fries", "Frozen onion rings", "Frozen meatballs", "Frozen burritos", "Frozen lasagna", "Frozen garlic bread", "Frozen hash browns",
        "Frozen edamame", "Frozen berries", "Frozen mango", "Frozen spinach", "Frozen corn", "Frozen peas", "Frozen mixed vegetables", "Frozen smoothie packs", "Frozen dumplings", "Frozen potstickers",
        "Frozen ravioli", "Frozen gnocchi", "Frozen soups", "Frozen casseroles", "Frozen pies", "Frozen cakes", "Frozen brownies", "Frozen cookie dough", "Frozen biscuits", "Frozen croissants",
        "Frozen bagels", "Frozen bread dough", "Frozen fruit pies", "Frozen turnovers", "Frozen calzones", "Frozen taquitos", "Frozen egg rolls", "Frozen spring rolls", "Frozen mozzarella sticks", "Frozen chicken tenders"
      ]
    },
    {
      "name": "Baking Supplies",
      "items": [
        "Flour", "Sugar", "Brown sugar", "Powdered sugar", "Baking soda", "Baking powder", "Vanilla extract", "Cocoa powder", "Chocolate chips", "Yeast",
        "Cornstarch", "Cinnamon", "Nutmeg", "Ginger", "Cloves", "Allspice", "Baking chocolate", "Shortening", "Margarine", "Vegetable oil",
        "Canola oil", "Olive oil", "Coconut oil", "Almond extract", "Lemon extract", "Maple extract", "Food coloring", "Sprinkles", "Gelatin", "Pectin",
        "Molasses", "Honey", "Corn syrup", "Agave nectar", "Buttermilk powder", "Nonfat dry milk", "Cake mix", "Brownie mix", "Muffin mix", "Pie crust",
        "Puff pastry", "Phyllo dough", "Cookie dough", "Chocolate syrup", "Caramel sauce", "Marshmallows", "Nuts", "Dried coconut", "Crushed pineapple", "Canned pumpkin puree"
      ]
    },
    {
      "name": "Condiments & Sauces",
      "items": [
        "Ketchup", "Mustard", "Mayonnaise", "BBQ sauce", "Soy sauce", "Hot sauce", "Worcestershire sauce", "Fish sauce", "Oyster sauce", "Teriyaki sauce",
        "Pesto", "Salsa", "Guacamole", "Hummus", "Tahini", "Ranch dressing", "Caesar dressing", "Italian dressing", "Thousand Island", "Blue cheese dressing",
        "Vinaigrette", "Hoisin sauce", "Plum sauce", "Sweet chili sauce", "Sriracha", "Buffalo sauce", "Aioli", "Tzatziki", "Chimichurri", "Gravy",
        "Marinara sauce", "Alfredo sauce", "Tomato sauce", "Tomato paste", "Curry paste", "Harissa", "Mole sauce", "Cocktail sauce", "Tartar sauce", "Remoulade",
        "Jam", "Jelly", "Marmalade", "Peanut butter", "Almond butter", "Vegemite", "Miso paste", "Mirin", "Rice vinegar", "Balsamic vinegar"
      ]
    },
    {
      "name": "Spices & Herbs",
      "items": [
        "Salt", "Black pepper", "Garlic powder", "Onion powder", "Paprika", "Cumin", "Cayenne pepper", "Chili powder", "Oregano", "Basil",
        "Thyme", "Rosemary", "Sage", "Bay leaves", "Cinnamon", "Nutmeg", "Cloves", "Ginger", "Turmeric", "Coriander",
        "Cardamom", "Allspice", "Fennel seeds", "Mustard seeds", "Cumin seeds", "Poppy seeds", "Sesame seeds", "Dill", "Mint", "Parsley",
        "Cilantro", "Tarragon", "Marjoram", "Lemongrass", "Star anise", "Saffron", "Vanilla beans", "Red pepper flakes", "Curry leaves", "Dried chives",
        "Dried basil", "Dried oregano", "Italian seasoning", "Herbes de Provence", "Poultry seasoning", "Pumpkin pie spice", "Garam masala", "Za’atar", "Chinese five-spice", "Old Bay seasoning"
      ]
    },
    {
      "name": "Oils & Vinegars",
      "items": [
        "Olive oil", "Extra virgin olive oil", "Canola oil", "Vegetable oil", "Sunflower oil", "Safflower oil", "Grapeseed oil", "Avocado oil", "Coconut oil", "Peanut oil",
        "Sesame oil", "Walnut oil", "Flaxseed oil", "Almond oil", "Corn oil", "Balsamic vinegar", "Apple cider vinegar", "White vinegar", "Red wine vinegar", "White wine vinegar",
        "Rice vinegar", "Malt vinegar", "Sherry vinegar", "Distilled vinegar", "Champagne vinegar", "Date vinegar", "Fig vinegar", "Herb-infused olive oil", "Truffle oil", "Chili oil",
        "Garlic-infused oil", "Lemon-infused oil", "Basil-infused oil", "Rosemary-infused oil", "Organic olive oil", "Cold-pressed oil", "Unrefined coconut oil", "Refined coconut oil", "Light olive oil", "Pomace olive oil",
        "Toasted sesame oil", "Dark sesame oil", "Balsamic glaze", "Creamy balsamic", "Aged balsamic", "White balsamic", "Flavored vinegar", "Fruit vinegar", "Tarragon vinegar", "Herb vinegar"
      ]
    },
    {
      "name": "International Foods",
      "items": [
        "Soy sauce", "Miso paste", "Rice noodles", "Sushi rice", "Wasabi", "Nori sheets", "Kimchi", "Gochujang", "Tofu", "Tempeh",
        "Naan bread", "Basmati rice", "Garam masala", "Curry powder", "Naan", "Chapati", "Tikka masala sauce", "Paneer", "Lentil dal", "Samosa filling",
        "Tortillas", "Salsa", "Guacamole", "Refried beans", "Chili powder", "Cumin", "Mexican oregano", "Queso fresco", "Chorizo", "Tamales",
        "Pita bread", "Hummus", "Tahini", "Falafel mix", "Za’atar", "Sumac", "Pomegranate molasses", "Labneh", "Feta cheese", "Kalamata olives",
        "Polenta", "Risotto rice", "Pesto", "Sun-dried tomatoes", "Capers", "Anchovies", "Truffle oil", "Parmigiano-Reggiano", "Balsamic vinegar", "Italian herbs"
      ]
    },
    {
      "name": "Organic Products",
      "items": [
        "Organic apples", "Organic bananas", "Organic carrots", "Organic spinach", "Organic milk", "Organic eggs", "Organic chicken", "Organic ground beef", "Organic yogurt", "Organic cheese",
        "Organic bread", "Organic pasta", "Organic rice", "Organic beans", "Organic tomatoes", "Organic potatoes", "Organic onions", "Organic garlic", "Organic lemons", "Organic avocados",
        "Organic strawberries", "Organic blueberries", "Organic kale", "Organic quinoa", "Organic oats", "Organic almond milk", "Organic peanut butter", "Organic honey", "Organic maple syrup", "Organic coconut oil",
        "Organic olive oil", "Organic soy sauce", "Organic salsa", "Organic frozen vegetables", "Organic baby food", "Organic granola", "Organic cereal", "Organic coffee", "Organic tea", "Organic chocolate",
        "Organic crackers", "Organic cookies", "Organic juice", "Organic smoothies", "Organic hummus", "Organic tortilla chips", "Organic canned beans", "Organic canned tomatoes", "Organic broth", "Organic spices"
      ]
    },
    {
      "name": "Gluten-Free Foods",
      "items": [
        "Gluten-free bread", "Gluten-free pasta", "Gluten-free flour", "Gluten-free oats", "Gluten-free crackers", "Gluten-free cookies", "Gluten-free cereal", "Gluten-free granola", "Gluten-free pizza crust", "Gluten-free cake mix",
        "Gluten-free brownie mix", "Gluten-free pancake mix", "Gluten-free waffles", "Gluten-free muffins", "Gluten-free bagels", "Gluten-free pretzels", "Gluten-free tortillas", "Gluten-free soy sauce", "Gluten-free breadcrumbs", "Gluten-free stuffing mix",
        "Gluten-free frozen meals", "Gluten-free energy bars", "Gluten-free protein bars", "Gluten-free rice cakes", "Gluten-free chips", "Gluten-free popcorn", "Gluten-free granola bars", "Gluten-free trail mix", "Gluten-free candy", "Gluten-free chocolate",
        "Gluten-free ice cream", "Gluten-free yogurt", "Gluten-free milk alternatives", "Gluten-free cheese", "Gluten-free deli meat", "Gluten-free soups", "Gluten-free sauces", "Gluten-free gravies", "Gluten-free seasonings", "Gluten-free baking powder",
        "Gluten-free baking soda", "Gluten-free vanilla extract", "Gluten-free cocoa powder", "Gluten-free chocolate chips", "Gluten-free nut butter", "Gluten-free jam", "Gluten-free jelly", "Gluten-free fruit snacks", "Gluten-free dried fruit", "Gluten-free canned goods"
      ]
    },
    {
      "name": "Baby Food & Products",
      "items": [
        "Baby formula", "Infant cereal", "Pureed fruits", "Pureed vegetables", "Baby oatmeal", "Baby rice cereal", "Stage 1 baby food", "Stage 2 baby food", "Stage 3 baby food", "Toddler snacks",
        "Baby yogurt melts", "Baby puffs", "Baby teething biscuits", "Baby fruit pouches", "Baby vegetable pouches", "Baby meat meals", "Baby pasta", "Baby rice", "Baby quinoa", "Baby lentils",
        "Baby probiotic drops", "Baby vitamins", "Baby electrolyte solution", "Baby applesauce", "Baby banana", "Baby sweet potato", "Baby carrot", "Baby peas", "Baby green beans", "Baby broccoli",
        "Baby chicken", "Baby turkey", "Baby beef", "Baby lamb", "Baby fish", "Baby tofu", "Baby cheese", "Baby yogurt", "Baby milk", "Baby juice",
        "Diapers", "Wipes", "Baby lotion", "Baby shampoo", "Baby powder", "Baby wash", "Baby oil", "Baby sunscreen", "Baby toothpaste", "Baby dental wipes"
      ]
    },
    {
      "name": "Pet Food & Supplies",
      "items": [
        "Dog food", "Cat food", "Dog treats", "Cat treats", "Puppy food", "Kitten food", "Senior dog food", "Senior cat food", "Grain-free pet food", "Wet pet food",
        "Dry pet food", "Pet biscuits", "Dental chews", "Rawhide", "Pet vitamins", "Flea treatment", "Tick treatment", "Pet shampoo", "Pet conditioner", "Pet brush",
        "Litter", "Litter box", "Poop bags", "Pet toys", "Pet beds", "Pet collars", "Pet leashes", "Pet bowls", "Pet carriers", "Pet grooming wipes",
        "Catnip", "Scratching posts", "Bird seed", "Fish food", "Hamster food", "Rabbit food", "Guinea pig food", "Reptile food", "Pet water bottles", "Pet food storage containers",
        "Automatic feeders", "Pet cameras", "Pet GPS trackers", "Pet sweaters", "Pet jackets", "Pet raincoats", "Pet booties", "Pet life jackets", "Pet first aid kit", "Pet calming sprays"
      ]
    },
    {
      "name": "Health & Wellness",
      "items": [
        "Vitamins", "Minerals", "Protein powder", "Meal replacement shakes", "Fiber supplements", "Probiotics", "Fish oil", "Omega-3 supplements", "Calcium", "Iron",
        "Magnesium", "Zinc", "Vitamin C", "Vitamin D", "Vitamin B12", "Multivitamins", "Collagen powder", "Green superfood powder", "Electrolyte powder", "Energy shots",
        "Herbal supplements", "Echinacea", "Ginseng", "Turmeric capsules", "Garlic supplements", "Coconut water powder", "Aloe vera juice", "Kombucha", "CBD oil", "Melatonin",
        "Sleep aids", "Digestive enzymes", "Laxatives", "Antacids", "Cold & flu remedies", "Cough drops", "Throat lozenges", "Nasal spray", "Allergy medicine", "Pain relievers",
        "First aid supplies", "Bandages", "Antiseptic wipes", "Thermometers", "Face masks", "Hand sanitizer", "Disinfecting wipes", "Oral care", "Toothpaste", "Mouthwash"
      ]
    },
    {
      "name": "Household Essentials",
      "items": [
        "Toilet paper", "Paper towels", "Tissues", "Trash bags", "Aluminum foil", "Plastic wrap", "Ziplock bags", "Dish soap", "Laundry detergent", "Fabric softener",
        "All-purpose cleaner", "Glass cleaner", "Bathroom cleaner", "Kitchen cleaner", "Disinfectant spray", "Sponges", "Scrub brushes", "Dusting cloths", "Mops", "Brooms",
        "Dustpans", "Garbage cans", "Recycling bins", "Air fresheners", "Candles", "Matches", "Lighters", "Batteries", "Light bulbs", "Extension cords",
        "Plastic containers", "Food storage containers", "Cutting boards", "Trash can liners", "Wet wipes", "Dryer sheets", "Stain removers", "Ironing spray", "Shoe polish", "Carpet cleaner",
        "Furniture polish", "Window film", "Drawer organizers", "Closet organizers", "Laundry baskets", "Hangers", "Shoe racks", "Storage bins", "Reusable bags", "Cleaning gloves"
      ]
    },
    {
      "name": "Personal Care",
      "items": [
        "Shampoo", "Conditioner", "Body wash", "Bar soap", "Deodorant", "Toothbrush", "Toothpaste", "Mouthwash", "Floss", "Razors",
        "Shaving cream", "Lotion", "Moisturizer", "Sunscreen", "Lip balm", "Cotton balls", "Cotton swabs", "Makeup remover", "Facial cleanser", "Toner",
        "Face masks", "Exfoliator", "Shaving gel", "After-shave", "Hair gel", "Hair spray", "Hair mousse", "Hair oil", "Hair serum", "Dry shampoo",
        "Nail clippers", "Tweezers", "Makeup brushes", "Curling iron", "Flat iron", "Hair dryer", "Electric toothbrush", "Dental floss picks", "Teeth whitening strips", "Acne treatment",
        "Razor blades", "Menstrual products", "Diapers", "Wipes", "Hand cream", "Foot cream", "Cuticle oil", "Bath salts", "Bubble bath", "Shower gel"
      ]
    }
  ]
}


const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/food/ingredients/search"

async function getImageUrl(query: string): Promise<string | null> {
  const url = `${BASE_URL}?query=${encodeURIComponent(query)}&number=1&apiKey=${API_KEY}`;
  
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status === 402) {
        console.log(`      💳 Quota exceeded (402)`);
      } else if (res.status === 401) {
        console.log(`      🔑 Invalid API key (401)`);
      } else {
        console.log(`      ⚠️  API error: ${res.status}`);
      }
      return null;
    }
    
    const data = await res.json();
    
    if (data.results && data.results.length > 0) {
      const filename = data.results[0].image;
      return `https://img.spoonacular.com/ingredients_500x500/${filename}`;
    } else {
      console.log(`      🔍 No results found in API`);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Track count to respect 150/day limit
let requestCount = 0;
const DAILY_LIMIT = 150;

async function seedWithImages() {
  console.log('🚀 Starting seed process...\n');
  
  let successCount = 0;
  let skippedExisting = 0;
  let skippedNoImage = 0;
  let apiErrors = 0;

  for (const category of groceryData.categories) {
    console.log(`\n📦 Processing category: ${category.name}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    for (const itemName of category.items) {
      // Check daily limit
      if (requestCount >= DAILY_LIMIT) {
        console.log(`\n⛔ Reached daily API limit (${DAILY_LIMIT} requests)`);
        console.log(`\n📊 Final Stats:`);
        console.log(`   ✅ Successfully seeded: ${successCount}`);
        console.log(`   ⏭️  Already existed: ${skippedExisting}`);
        console.log(`   ⚠️  Skipped (no image): ${skippedNoImage}`);
        console.log(`   ❌ API errors: ${apiErrors}`);
        return;
      }

      // Check if already exists
      const existing = await db.query.products.findFirst({
        where: and(
          eq(products.name, itemName),
          eq(products.category, category.name)
        )
      });

      if (existing) {
        console.log(`   ⏭️  Already seeded: ${itemName}`);
        skippedExisting++;
        continue;
      }

      // Fetch image from API
      console.log(`   🔍 Fetching: ${itemName}...`);
      const imageUrl = await getImageUrl(itemName);
      requestCount++;

      // Skip if no valid image URL
      if (!imageUrl) {
        console.log(`   ⚠️  No image found for: ${itemName} (skipping)`);
        skippedNoImage++;
        continue;
      }

      // Insert product with valid image
      try {
        await db.insert(products).values({
          name: itemName,
          category: category.name,
          price: (Math.random() * 15 + 0.99).toFixed(2),
          stock: String(Math.floor(Math.random() * 100)),
          description: `${itemName} from the ${category.name} category.`,
          imageUrl: imageUrl,
        });

        console.log(`   ✅ Seeded: ${itemName}`);
        console.log(`      📸 Image: ${imageUrl}`);
        successCount++;
      } catch (error) {
        console.log(`   ❌ Database error for ${itemName}:`, error);
        apiErrors++;
      }

      // Rate limit delay
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Category summary
    console.log(`\n✓ Completed ${category.name}`);
    console.log(`   Progress: ${requestCount}/${DAILY_LIMIT} API calls used\n`);
  }

  // Final summary
  console.log(`\n🎉 Seeding complete!`);
  console.log(`\n📊 Final Stats:`);
  console.log(`   ✅ Successfully seeded: ${successCount}`);
  console.log(`   ⏭️  Already existed: ${skippedExisting}`);
  console.log(`   ⚠️  Skipped (no image): ${skippedNoImage}`);
  console.log(`   ❌ Errors: ${apiErrors}`);
  console.log(`   📡 Total API calls: ${requestCount}/${DAILY_LIMIT}`);
}

seedWithImages().catch(console.error);