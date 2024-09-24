"use client";

import { Articles } from "./types";

export default function ArticlesList({ articles }: { articles: Articles[] }) {
  return (
    <div className="space-y-2">
      {articles?.map((item) => (
        <div key={item.id} className="border rounded p-3">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
