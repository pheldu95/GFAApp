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