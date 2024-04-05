import { NextResponse } from 'next/server';

/*
  All defined error types for CMError objects
  Do not remove or rearrange existing types

  When adding a new error type, always add at the bottom of the list and
  update CMERRORTYPE_DEFS below with the associated constants
*/
export enum CMErrorType {
  UnknownError,
  InternalError,
  BadValue,
  NoSuchKey,
  DuplicateKey,
}

/*
    Error message templates and defaults for each error type
    Make sure to add an entry here when you add a new CMErrorType value

    Entry format:
      error type      (CMErrorType)
      status code     (number)
      errmsg template (string)
      default errmsg  (string)
*/
const CMERRORTYPE_DEFS = [
  [CMErrorType.UnknownError, 500, 'Unknown %s error', 'Unknown error'],
  [CMErrorType.InternalError, 500, 'Internal %s error', 'Internal error'],
  [CMErrorType.BadValue, 400, 'Invalid %s', 'Invalid value'],
  [CMErrorType.NoSuchKey, 404, '%s not found', 'Key not found'],
  [CMErrorType.DuplicateKey, 409, 'Duplicate %s', 'Duplicate key'],
] as const;

// Corresponding response status codes for error types
export const CMERRORTYPE_STATUS_CODES: {
  [id: number]: number;
} = {};

// Default messages and templates for each error type
const CMERRORTYPE_MSGS: {
  [id: number]: {
    template: string;
    default: string;
  };
} = {};

// Populate mappings from defs matrix
CMERRORTYPE_DEFS.forEach((def) => {
  CMERRORTYPE_STATUS_CODES[def[0]] = def[1];
  CMERRORTYPE_MSGS[def[0]] = { template: def[2], default: def[3] };
});

// Generate an error message for an error type, optionally filling in contextual info
export function getCMErrorTypeMsg(
  errorType: CMErrorType,
  source?: string
): string {
  const defaultErrMsgInfo = CMERRORTYPE_MSGS[errorType];
  return source !== undefined
    ? defaultErrMsgInfo.template.replace('%s', source)
    : defaultErrMsgInfo.default;
}

// Custom error type constructed with CMErrorType values
export default class CMError extends Error {
  readonly type: CMErrorType;

  // Constructs a CMError based on a CMErrorType value
  // Generates CMError.message from source and the message template for the given errorType
  // If overrideErrMsg = true, the template is ignored and source is copied directly to CMError.message
  constructor(
    errorType: CMErrorType,
    source?: string,
    overrideErrMsg: boolean = false
  ) {
    super(overrideErrMsg ? source : getCMErrorTypeMsg(errorType, source));
    this.type = errorType;
  }

  // Construct a NextResponse object representing the error
  toNextResponse(): NextResponse<{
    message: string;
  }> {
    return NextResponse.json(
      { message: this.message },
      { status: CMERRORTYPE_STATUS_CODES[this.type] }
    );
  }
}

// If err is a CMError, constructs a corresponding NextResponse object
// Otherwise, constructs a generic NextResponse object
export function CMErrorResponse(err: unknown): NextResponse<{
  message: string;
}> {
  return err instanceof CMError
    ? err.toNextResponse()
    : new CMError(CMErrorType.UnknownError).toNextResponse();
}
