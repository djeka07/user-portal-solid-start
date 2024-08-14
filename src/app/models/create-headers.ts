import { v4 as uuidv4 } from 'uuid';

type HeadersInput = {
  requestId?: string;
  accessToken?: string;
  xForwardedFor?: string;
};

type Headers = {
  'x-request-id': string;
  authorization?: string;
  domain?: string;
  'x-forwarded-for'?: string;
};

const createHeaders = ({ accessToken, xForwardedFor, requestId }: HeadersInput = {}): Headers => {
  let headers: Headers = { 'x-request-id': requestId || uuidv4() };

  if (accessToken) {
    headers = { ...headers, authorization: accessToken };
  }

  if (xForwardedFor) {
    headers = { ...headers, 'x-forwarded-for': xForwardedFor };
  }

  return headers;
};

export default createHeaders;
