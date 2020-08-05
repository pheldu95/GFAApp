using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class FishCaughtEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FishCaught",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FisherId = table.Column<int>(nullable: false),
                    GuideId = table.Column<int>(nullable: false),
                    OrganizationId = table.Column<int>(nullable: false),
                    ExceptionalCatch = table.Column<bool>(nullable: false),
                    UnusualCatch = table.Column<bool>(nullable: false),
                    Latitude = table.Column<float>(nullable: false),
                    Longitude = table.Column<float>(nullable: false),
                    SkyTypeId = table.Column<int>(nullable: false),
                    WindTypeId = table.Column<int>(nullable: false),
                    WaterTypeId = table.Column<int>(nullable: false),
                    MoonPhase = table.Column<string>(nullable: true),
                    MoonIlluminationPercent = table.Column<int>(nullable: false),
                    AirTemperature = table.Column<int>(nullable: false),
                    WaterTemperature = table.Column<int>(nullable: false),
                    CaughtDate = table.Column<DateTime>(nullable: false),
                    LastModifedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FishCaught", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FishCaught");
        }
    }
}
