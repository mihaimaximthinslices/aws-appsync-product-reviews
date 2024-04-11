/*
  Warnings:

  - A unique constraint covering the columns `[userId,feedbackId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Upvote_userId_feedbackId_key" ON "Upvote"("userId", "feedbackId");
