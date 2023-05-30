import api from "./api";

export interface InfoProject {
  id?: number;
  link: string;
  image: string;
  title: string;
}

export const createInfoProject = async (infoProject: InfoProject): Promise<InfoProject> => {
  const response = await api.post<InfoProject>("/projetos", infoProject);
  return response.data;
}

export const getInfoProject = async (): Promise<InfoProject[]> => {
  const response = await api.get<InfoProject[]>("/projetos");
  return response.data;
}

export const updateInfoProject = async (infoProject: InfoProject): Promise<InfoProject> => {
  const response = await api.put<InfoProject>(`/projetos/${infoProject.id}`, infoProject);
  return response.data;
}

export const deleteInfoProject = async (id: number | undefined): Promise<InfoProject> => {
  const response = await api.delete(`/projetos/${id}`);
  return response.data;
}

export const createOrUpdateInfoProject = async (infoProject: InfoProject): Promise<InfoProject> => {
  if (!infoProject.id) {
    return await createInfoProject(infoProject);
} else {
   return await updateInfoProject(infoProject);
}
}
    