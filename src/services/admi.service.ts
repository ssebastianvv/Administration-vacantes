import { HttpClient } from "../utils/client-http";
import { IVacancy, ICompany, IVacancyResponse } from "../interface/interfaces";

export class CoderService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async findAll(): Promise<IVacancyResponse> {
        try {
            const response = await this.httpClient.get<IVacancyResponse>("vacancies"); // Cambia el endpoint si es necesario
            return response; 
        } catch (error) {
            console.error("Error al obtener vacancies:", error);
            throw error;
        }
    }

    async destroy(id: string): Promise<void> {
        try {
            await this.httpClient.delete(`vacancies/${id}`); // Cambia el endpoint si es necesario
        } catch (error) {
            console.error("Error al eliminar vacancy:", error);
            throw error;
        }
    }

    async create(vacancy: IVacancy | ICompany): Promise<IVacancy | ICompany> {
        try {
            const endpoint = vacancy.hasOwnProperty('title') ? "vacancies" : "company"; // Cambia según el tipo
            const response = await this.httpClient.post<IVacancy | ICompany, IVacancy | ICompany>(endpoint, vacancy);
            return response;
        } catch (error) {
            console.error("Error al crear:", error);
            throw error;
        }
    }

    async update(id: string, vacancy: IVacancy | ICompany): Promise<IVacancy | ICompany> {
        try {
            const endpoint = vacancy.hasOwnProperty('title') ? `vacancies/${id}` : `company/${id}`; // Cambia según el tipo
            const response = await this.httpClient.update<IVacancy | ICompany, IVacancy | ICompany>(endpoint, vacancy);
            return response;
        } catch (error) {
            console.error("Error al actualizar:", error);
            throw error;
        }
    }
}
