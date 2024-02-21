/* eslint-disable no-var */

declare global {
  var mongoose: {
    conn: mongoose // the mongoose connection to use
    promise: Promise<mongoose> | null // the promise that resolves when the connection is established
  }
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string // the URI of the mongodb instance to connect to
    }
  }
}

export {}
