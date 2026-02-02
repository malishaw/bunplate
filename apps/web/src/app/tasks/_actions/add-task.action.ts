/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { post } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

export async function addTask(data: any) {
  if (!data.name) {
    throw new Error("Task name is required");
  }

  const task = await post("/api/tasks", data);

  // Revalidate the page to show the new task
  revalidatePath("/");
  return task;
}
