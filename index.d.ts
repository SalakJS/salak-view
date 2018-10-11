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
    renderView (relPath: string, locals?: any, module?: string): Promise<string>
    render (relPath: string, locals?: any, module?: string): Promise<void>
  }

  interface Context {
    renderView (relPath: string, locals?: any, module?: string): Promise<string>
    render (relPath: string, locals?: any, module?: string): Promise<void>
  }
}
