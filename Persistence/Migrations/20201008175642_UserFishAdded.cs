using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserFishAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserFishCaught",
                columns: table => new
                {
                    AppUserId = table.Column<string>(nullable: false),
                    FishId = table.Column<Guid>(nullable: false),
                    Liked = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFishCaught", x => new { x.AppUserId, x.FishId });
                    table.ForeignKey(
                        name: "FK_UserFishCaught_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFishCaught_FishCaught_FishId",
                        column: x => x.FishId,
                        principalTable: "FishCaught",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserFishCaught_FishId",
                table: "UserFishCaught",
                column: "FishId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFishCaught");
        }
    }
}
