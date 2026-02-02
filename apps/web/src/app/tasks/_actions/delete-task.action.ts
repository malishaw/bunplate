"use server";

import { del } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

export async function deleteTask(id: number) {
  await del(`/api/tasks/${id}`);

  // Revalidate the page to show the new task
  revalidatePath("/");
}
