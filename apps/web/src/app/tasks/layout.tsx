import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function TasksLayout({ children }: Props) {
  return (
    <div className="bg-secondary/40 min-h-screen">
      <div className="w-full max-w-xl mx-auto py-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold font-heading">All Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Bunplace demo tasks API for demonstrations
          </p>
        </div>

        <Separator className="my-3" />

        <div className="">{children}</div>
      </div>
    </div>
  );
}
