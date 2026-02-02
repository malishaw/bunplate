/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from "@/lib/fetcher";
import { TaskCard } from "./_components/task-card";

export default async function TasksPage() {
  const res = await fetcher<any>("/api/tasks", { method: "GET" });

  return (
    <div className="flex flex-col gap-4">
      {res.data.map((task: any, i: any) => (
        <TaskCard task={task as any} key={i} />
      ))}
    </div>
  );
}
