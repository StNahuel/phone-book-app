export interface APIError {
  status: number;
  title: string;
  type?: string;
  message?: string;
  traceId?: string;
}
export type NotAsked = { status: "Not Asked" };
export type Loading = { status: "Loading" };
export type Failed = {
  status: "Failed";
  errorApi: APIError;
};
export type Done<T> = { status: "Done"; data: T };
export type RemoteData<T> =  NotAsked | Loading | Failed |  Done<T>;
export const notAsked = (): NotAsked => ({ status: "Not Asked" });
export const loading = (): Loading => ({ status: "Loading" });
export const failed = (errorApi: APIError): Failed => ({
  status: "Failed",
  errorApi
});

export const done = <T>(data: T): Done<T> => ({
  data,
  status: "Done"
});