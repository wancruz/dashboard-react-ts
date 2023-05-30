import api from "./api";

export interface InfoSkill {
  id?: number;
  name: string;
  image: string;
  tipo: string;
}

export const createInfoSkill = async (infoSkill:InfoSkill): Promise<InfoSkill> => {
   const response = await api.post<InfoSkill>('/habilidades',infoSkill);
   return response.data;
}

export const getInfoSkill = async (): Promise<InfoSkill[]> => {
  const response = await api.get<InfoSkill[]>('/habilidades');
  return response.data;
}

export const updateInfoSkill = async (infoSkill: InfoSkill): Promise<InfoSkill> => {
   const response = await api.put<InfoSkill>(`/habilidades/${infoSkill.id}`,infoSkill);
  return response.data;
}

export const deleteInfoSkill = async (id: number | undefined): Promise<InfoSkill> => {
  const response = await api.delete(`/habilidades/${id}`);
  return response.data;
}

export const createOrUpdateInfoSkill = async (infoSkill: InfoSkill): Promise<InfoSkill> => {
  if (!infoSkill.id) {
    return await createInfoSkill(infoSkill);
} else {
   return await updateInfoSkill(infoSkill);
}
}