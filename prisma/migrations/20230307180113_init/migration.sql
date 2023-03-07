/*
  Warnings:

  - You are about to drop the column `assigneemage` on the `issues` table. All the data in the column will be lost.
  - Added the required column `assigneeImage` to the `issues` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_issues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "assigneeName" TEXT NOT NULL,
    "assigneeImage" TEXT NOT NULL,
    "sprintId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "issues_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "sprints" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_issues" ("assigneeName", "created_at", "description", "id", "priority", "sprintId", "title", "updated_at") SELECT "assigneeName", "created_at", "description", "id", "priority", "sprintId", "title", "updated_at" FROM "issues";
DROP TABLE "issues";
ALTER TABLE "new_issues" RENAME TO "issues";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
