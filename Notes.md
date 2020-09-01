entity framework migration in console example:
dotnet ef migrations add "added FishTypeId" -p Persistence/ -s API/

how to drop the database:
dotnet ef database drop -p Persistence/ -s API/
----------
how to rename columns: https://stackoverflow.com/questions/13104592/how-to-rename-a-database-column-in-entity-framework-5-code-first-migrations-with/34445040

delete RemoveColumn and AddColumn in Up and Down methods. Instead use RenameColumn
add this to your Up and Down methods in the migration

migrationBuilder.RenameColumn(
                "LastModifedDate",
                "FishCaught",
                "LastModifiedDate");

SHould look like this
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.RenameColumn(
            "LastModifedDate",
            "FishCaught",
            "LastModifiedDate");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.RenameColumn(
            "LastModifedDate",
            "FishCaught",
            "LastModifiedDate");

    }

GETTING THE GUID MAKER
------------------------
npm install uuid ==> this is used to make guids
then use: 
import { v4 as uuid } from "uuid";
and then: npm install @types/uuid
then to actually make the guid:
let newFish = {
                ...fish,
                id: uuid();
            }

MobX
---------
npm install mobx mobx-react-lite
add this to "compilerOptions" in tsconfig.json:
    "experimentalDecorators": true

it's a store like redux, except you can mutate state directly
in redux you can't do that.
can make react components observers. so when an observable changes, the react component will rerender
computed values: values derived from the existing state
    @computed get fullName(){
        return firstName + lastName
    }
reactions track observables
    -can do something based on if an observalbe changes 

Must make component an observer to be able to use observables
like this:
export default observer(App);

MobX Strict Mode
----------------
we tell mobx to run in strict mode
why?
use enforce actions
makes it so observables can't be changed outside of an @action
must refactor our code so it's wrapped inside an action
so if we are using an async, everything that modifies the state after the await must be put in a:
runInAction(() => {

})

React Router DOM
----------------
in client app, npm install react-router-dom
npm install @types/react-router-dom


Fluent Validation
-----
use nuget package manager to add FLuentValidation.ASP.Net Core 8.5.1 to Application project
If you get an error, go up to root folder and dotnet restore and then dotnet build. in the console
The FluentValidation class goes between the Command and the Handler.


React Toastify
------------------
we can use toasts to show little warnings to the user. like if they get e 500 error
npm install react-toastify
import the css file to indext.tsx:
import 'react-toastify/dist/ReactToastify.min.css';
add this to the interceptor in agent.tsx:
if(status === 500) {
    //send a toast to the user
    toast.error('Server error - check the terminal for more info');
  }

React Final Form
-------------------
package that helps us write reusable componenets for our form
also helps with validation. makes it easy
in the client-app: 
npm install react-final-form final-form

React Widgets and date-fns
---------------------------
npm install react-widgets react-widgets-date-fns
will get a warning. the safest thing to do is install this version:
npm install react-widgets@4.4.11 react-widgets-date-fns@4.0.26 date-fns@2.0.0-alpha.13

when using react widgets, also need to add some css to index.tsx:
import 'react-widgets/dist/css/react-widgets.css'

then we need to create the localizer for date-fns
first add this import to index.tsx:

import dateFnsLocalizer from 'react-widgets-date-fns';

then add the function to index.tsx:

dateFnsLocalizer();

will get an error. to fix the error, add a new declaration file containg react-widgets-date-fns
how to do this: 
make a new folder in client-app called typings-custom
then add a file named react-widgets-date-fns.d.ts to the folder
add this line to the file:

declare module 'react-widgets-date-fns';

next we have to tell our program to look for this file
go to tsconfig.json and add this line to the include array:

    "./typings-custom/**/*.ts"

Now our program will know to look in that file as well for any declarations
