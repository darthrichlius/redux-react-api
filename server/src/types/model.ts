/**
 * This is a workaround to make the interface from Prisma compatible with TypeScript
 * For Prisma, optional means `null`, for TypeScript it means `undefined`
 * Therefore, if in TS we try to set a data without specifying the member we will have an error
 * This tweak allows us to accept undefined, therefore enable not having to specify it
 */

import { Bug as _Bug } from "@prisma/client";
export type { User, Project } from "@prisma/client";

export interface Bug extends Omit<_Bug, "userId" | "resolved"> {
  userId?: number | undefined;
  resolved?: boolean | null;
}
