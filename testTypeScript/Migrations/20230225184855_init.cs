﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace testTypeScript.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "M_CAR_CATEGORY",
                columns: table => new
                {
                    CAR_CATEGORY_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DELETED = table.Column<int>(type: "int", nullable: false),
                    VERSION = table.Column<int>(type: "int", nullable: false),
                    CREATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UPDATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UPDATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_M_CAR_CATEGORY", x => x.CAR_CATEGORY_ID);
                });

            migrationBuilder.CreateTable(
                name: "M_SERVICE_ORDER",
                columns: table => new
                {
                    ORDER_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CAR_ID = table.Column<int>(type: "int", nullable: false),
                    TIME_CATEGORY = table.Column<int>(type: "int", nullable: false),
                    ORDER_DURATION = table.Column<int>(type: "int", nullable: false),
                    PLAN_START_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PLAN_END_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ACTUAL_START_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ACTUAL_END_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CUSTOMER_NAME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    STATUS = table.Column<int>(type: "int", nullable: false),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PLATE_NUMBER = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PRICE = table.Column<int>(type: "int", nullable: false),
                    DELETED = table.Column<int>(type: "int", nullable: false),
                    VERSION = table.Column<int>(type: "int", nullable: false),
                    CREATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UPDATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UPDATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_M_SERVICE_ORDER", x => x.ORDER_ID);
                });

            migrationBuilder.CreateTable(
                name: "M_STATUS",
                columns: table => new
                {
                    STATUS_CODE = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    STATUS_NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DELETED = table.Column<int>(type: "int", nullable: false),
                    VERSION = table.Column<int>(type: "int", nullable: false),
                    CREATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UPDATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UPDATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_M_STATUS", x => x.STATUS_CODE);
                });

            migrationBuilder.CreateTable(
                name: "M_TIME_CATEGORY",
                columns: table => new
                {
                    TIME_CATEGORY_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DELETED = table.Column<int>(type: "int", nullable: false),
                    VERSION = table.Column<int>(type: "int", nullable: false),
                    CREATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UPDATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UPDATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_M_TIME_CATEGORY", x => x.TIME_CATEGORY_ID);
                });

            migrationBuilder.CreateTable(
                name: "M_CAR",
                columns: table => new
                {
                    CAR_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CATEGORY_ID = table.Column<int>(type: "int", nullable: false),
                    COLOR = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PLATE_NUMBER = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PRICE = table.Column<int>(type: "int", nullable: false),
                    DELETED = table.Column<int>(type: "int", nullable: false),
                    VERSION = table.Column<int>(type: "int", nullable: false),
                    CREATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UPDATED_BY = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UPDATED_DTG = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CATEGORY_NAME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    M_CAR_CATEGORYCAR_CATEGORY_ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_M_CAR", x => x.CAR_ID);
                    table.ForeignKey(
                        name: "FK_M_CAR_M_CAR_CATEGORY_M_CAR_CATEGORYCAR_CATEGORY_ID",
                        column: x => x.M_CAR_CATEGORYCAR_CATEGORY_ID,
                        principalTable: "M_CAR_CATEGORY",
                        principalColumn: "CAR_CATEGORY_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_M_CAR_M_CAR_CATEGORYCAR_CATEGORY_ID",
                table: "M_CAR",
                column: "M_CAR_CATEGORYCAR_CATEGORY_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "M_CAR");

            migrationBuilder.DropTable(
                name: "M_SERVICE_ORDER");

            migrationBuilder.DropTable(
                name: "M_STATUS");

            migrationBuilder.DropTable(
                name: "M_TIME_CATEGORY");

            migrationBuilder.DropTable(
                name: "M_CAR_CATEGORY");
        }
    }
}
