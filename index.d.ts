import * as Salak from 'salak'

declare module 'salak' {
  interface SalakConfig {
    view: {
      dirname: string,
      extension: string,
      engine: string,
      cache: boolean,
      map: Salak.PlainObject,
      config: Salak.PlainObject
    }
  }

  interface Controller {
    render (relPath: string, locals?: any, module?: string): Promise<string>
    view (relPath: string, locals?: any, module?: string): Promise<void>
  }

  interface Context {
    render (relPath: string, locals?: any, module?: string): Promise<string>
    view (relPath: string, locals?: any, module?: string): Promise<void>
  }
}
