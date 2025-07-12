export interface IPostUsuarioResponse {
    data:any;
    statusCode: number;
    statusDescription: string;
    errors: string[] | null; // Solo para casos de error
}
