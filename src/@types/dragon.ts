export interface Dragon {
  createdAt: string;
  name: string;
  type: string;
  histories: string | string[];
  id: string;
  imageUrl?: string;
}

export interface CreateDragonDto {
  imageUrl?: string;
  name: string;
  type: string;
  histories: string[];
}
