import userData from "@@/fixtures/users";
import projectData from "@@/fixtures/projects";
import bugData from "@@/fixtures/bugs";
import prismaClient from "@/services/prisma";

export default async function seed() {
  try {
    if (userData) {
      await prismaClient.user.createMany({
        data: userData,
      });
    }
    if (bugData) {
      await prismaClient.project.createMany({
        data: projectData,
      });
    }
    if (bugData) {
      await prismaClient.bug.createMany({
        data: bugData,
      });
    }
  } catch (e) {
    /**
     * In development mode, this might be caused by the fact by HMR reload the application
     */
    console.warn("Seed operation proceeded with  errors");
  } finally {
    // Close the Prisma Client at the end
    await prismaClient.$disconnect();
  }
}
