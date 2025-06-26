import type { Dragon } from "@/@types/dragon";
import { api } from "@/config/api";

export async function getAllDragons() {
  return api.get<Dragon[]>("/dragon");
}

export async function deleteDragon(id: string) {
  return api.delete<void>(`/dragon/${id}`);
}
