# Total Maximum Points 375 ====> My Points 358

## 1.Basic Structure (85 points) =====> 85

## View Configuration (30 points) ====> 30

### Two Views (10 points): => 10

Implement two primary views: "Garage" and "Winners".

### Garage View Content (5 points): => 5

The "Garage" view must display its name, the current page number, and the total number of cars in the database (how many car user has in his garage).

### Winners View Content (5 points): => 5

The "Winners" view should similarly display its name, the current page number, and the total count of records in the database (how many records the winners table contains).

### Persistent State (10 points): => 10

Ensure the view state remains consistent when navigating between views. This includes preserving page numbers and input states. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc.

## Garage View Functionality (55 points) =====> 55

### Car Management (45 points) ===> 45

#### CRUD Operations (20 points): => 20

Enable users to create, update, and delete cars, and display the list of cars. A car has two attributes: "name" and "color". For "delete"-operation car should be deleted from "garage" table as well as from "winners".

#### Color Selection (10 points): => 10

Allow color selection from an RGB palette (like here), displaying the selected color on the car's image along with its name.

#### Management Buttons (5 points): => 5

Provide buttons near each car's image for updating its attributes or deleting it.

#### Pagination (10 points): => 10

Implement pagination for the "Garage" view, displaying 7 cars per page.

### Car Generation (10 points) ====> 10

#### Random Car Creation (10 points): => 10

There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.

## 2.Car Animation (50 points) ======> 50

### Engine Control Buttons (10 points): => 10

Place start/stop engine buttons near each car's image.

### Start Engine Animation (20 points): => 20

User clicks the engine start button -> UI awaits car's velocity response -> animate the car and sends another request to drive. If the API returns a 500 error, the car animation should stop.

### Stop Engine Animation (10 points): => 10

User clicks the engine stop button -> UI awaits response to stop the engine -> the car returns to its initial position.

### Button States (5 points): => 5

The start engine button should be disabled if the car is already in driving mode, and the stop engine button should be disabled when the car is in its initial position.

### Responsive Animation (5 points): => 5

Ensure car animations are fluid and responsive on screens as small as 500px.

## 3.Race Animation (35 points) =====> 35

### Start Race Button (15 points): => 15

Implement a button to start the race for all cars on the current page.

### Reset Race Button (10 points): => 10

Create a button to reset the race, returning all cars to their starting positions.

### Winner Announcement (10 points): => 10

After some car finishes first, the user should see a message containing the car's name that shows which one has won.

## 4. Winners View (45 points) =======> 45

### Display Winners (15 points): => 15

After some car wins, it should be displayed in the "Winners view" table.

### Pagination for Winners (10 points): => 10

Implement pagination for the "Winners" view, with 10 winners per page.

### Winners Table (10 points): => 10

The table should include columns for the car's №, image, name, number of wins, and best time in seconds. If the same car wins more than once, the number of wins should be incremented while the best time should be saved only if it's better than the stored one.

### Sorting Functionality (10 points): => 10

Allow users to sort the table by the number of wins and best time, in ascending or descending order.

## 5. Application Architecture (40 points) ====> 33

### Modular Design (40 points): => 33

The application should be clearly divided into logical modules or layers, such as API interaction, UI rendering, and state management. Consultation with a mentor on the architecture before implementation is advised.

## 6.Dynamic Content Generation (30 points) ======> 30

### JavaScript-Generated HTML Content (30 points): => 30

All HTML content must be dynamically generated using JavaScript, with the <body> tag containing only a single <script> tag.

## 7.Single Page Application (25 points) =====> 25

### SPA Implementation (25 points): => 25

The application must be a Single Page Application (SPA) using either React v18+ or Angular v17+. All content must be generated using TypeScript with strict and noImplicitAny settings enabled in tsconfig.json, ensuring a seamless user experience without page reloads during navigation.

## 8.Bundling and Tooling (20 points) ====> 20

### Use of Webpack or Similar (20 points): => 20

Implement Webpack or another bundling tool to compile the project into a minimal set of files, ideally one HTML file, one JS file, and one CSS file. Ensure that the configuration enforces TypeScript strict type checking.

## 9.Code Quality and Standards (15 points) ======> 15

### Eslint with Airbnb Style Guide (15 points): => 15

Code must adhere to the Airbnb ESLint configuration to maintain code quality, as outlined in the Airbnb style guide. Specific rules may be adjusted only with mentor approval, and there should be no ESLint errors or warnings.

## 10.Code Organization and Efficiency (15 points) =====> 12

### Function Modularization (10 points): => 8

Code should be organized into small, clearly named functions with specific purposes. Each function should not exceed 40 lines, reflecting strong typing and avoiding the use of magic numbers or strings.

### Code Duplication and Magic Numbers (5 points): => 4

Minimize code duplication and maintain readability by avoiding the use of magic numbers or strings throughout the codebase.

## 11.Prettier and ESLint Configuration (10 points) ======> 10

### Prettier Setup (5 points): => 5

Prettier is correctly set up with two scripts in package.json: format for auto-formatting and ci:format for checking issues.

### ESLint Configuration (5 points): => 5

ESLint is configured with the Airbnb style guide. A lint script in package.json runs ESLint checks. Configuration files should reflect strict TypeScript settings as per tsconfig.json.

## 12.Overall Code Quality (35 points) ======> 28

### (Up to 35 points) Discretionary points awarded by the reviewer based on overall code quality, readability.
