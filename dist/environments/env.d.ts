export interface Environment {
    db_url: string;
}
export declare function getEnvironmentVariables(): Environment;
