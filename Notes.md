entity framework migration in console example:
dotnet ef migrations add "added FishTypeId" -p Persistence/ -s API/

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