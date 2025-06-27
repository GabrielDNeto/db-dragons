import { api } from "@/config/api";
import { beforeEach, describe, expect, vi, type Mock } from "vitest";
import * as dragonService from "./";

vi.mock("@/config/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Dragon Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("getAllDragons should call api.get with /dragon", async () => {
    const mockResponse = { data: [{ id: "1", name: "Draco" }] };
    (api.get as Mock).mockResolvedValue(mockResponse);

    const result = await dragonService.getAllDragons();

    expect(api.get).toHaveBeenCalledWith("/dragon");
    expect(result).toEqual(mockResponse);
  });

  test("getDragonById should call api.get with /dragon/:id", async () => {
    const mockResponse = { data: { id: "1", name: "Draco" } };
    (api.get as Mock).mockResolvedValue(mockResponse);

    const result = await dragonService.getDragonById("1");

    expect(api.get).toHaveBeenCalledWith("/dragon/1");
    expect(result).toEqual(mockResponse);
  });

  test("createDragon should call api.post with /dragon and data", async () => {
    (api.post as Mock).mockResolvedValue(undefined);

    const data = { name: "Draco", type: "fire", histories: [] };
    await dragonService.createDragon(data);

    expect(api.post).toHaveBeenCalledWith("/dragon", data);
  });

  test("updateDragon should call api.put with /dragon/:id and data without id", async () => {
    (api.put as Mock).mockResolvedValue(undefined);

    const data = {
      id: "1",
      name: "Draco Updated",
      type: "fire",
      histories: [],
    };
    await dragonService.updateDragon(data);

    expect(api.put).toHaveBeenCalledWith("/dragon/1", {
      name: "Draco Updated",
      type: "fire",
      histories: [],
    });
  });

  test("deleteDragon should call api.delete with /dragon/:id", async () => {
    (api.delete as Mock).mockResolvedValue(undefined);

    await dragonService.deleteDragon("1");

    expect(api.delete).toHaveBeenCalledWith("/dragon/1");
  });
});
