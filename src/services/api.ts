import { getApiClient } from "./axios";

const INTERNAL_API = 'http://localhost:3000';

export const api = getApiClient(INTERNAL_API, undefined);