using Microsoft.EntityFrameworkCore.Migrations;

namespace HitTheRoad.Api.Migrations
{
    public partial class UpdateDestination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Destinations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Destinations");
        }
    }
}
