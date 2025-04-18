export interface IPostClienteResponse {
    data:any;
    statusCode: number;
    statusDescription: string;
    errors: string[] | null; // Solo para casos de error
}
