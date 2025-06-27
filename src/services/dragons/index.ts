import type { CreateDragonDto, Dragon, UpdateDragonDto } from "@/@types/dragon";
import { api } from "@/config/api";

export async function getAllDragons() {
  return api.get<Dragon[]>("/dragon");
}

export async function getDragonById(id: string) {
  return api.get<Dragon>(`/dragon/${id}`);
}

export async function createDragon(data: CreateDragonDto) {
  return api.post<void>("/dragon", data);
}

export async function updateDragon(data: UpdateDragonDto) {
  const { id, ...rest } = data;

  return api.put<void>(`/dragon/${id}`, rest);
}

export async function deleteDragon(id: string) {
  return api.delete<void>(`/dragon/${id}`);
}
