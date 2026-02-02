/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { patch } from "@/lib/fetcher";

export async function markAsCompleted(id: number, data: any) {
  await patch(`/api/tasks/${id}`, { done: data.done || false });

  // Revalidate the page to show the new task
  revalidatePath("/");
}
