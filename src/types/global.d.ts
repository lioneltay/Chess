import { CSSProperties } from "react"

declare global {
  interface Window {
    OptanonWrapper: () => void
  }

  export type Falsey = 0 | "" | false | undefined | null

  export interface Stylable {
    className?: string
    style?: CSSProperties
  }

  export interface FormikComponentProps {
    formikFastField?: boolean
    formikFieldName: string
  }

  export type FunctionType<A extends any[] = any[], R = any> = (...args: A) => R

  export type Arguments<T extends FunctionType> = T extends FunctionType<
    infer A,
    any
  >
    ? A
    : never

  type MonoFunction<T extends any = any, R = any> = (arg: T) => R
  export type FirstArg<T extends MonoFunction> = T extends MonoFunction<
    infer A,
    any
  >
    ? A
    : never

  export type Merge<A, B> = Pick<A, Exclude<keyof A, keyof B>> & B

  // export namespace NodeJS {
  //   export interface ProcessEnv {
  //     APP_MODE: 'local' | 'development' | 'production'
  //   }
  // }

  // Unions of objects normally allow keys present in any member to be present. Strict unions will consider this an error
  type UnionKeys<T> = T extends any ? keyof T : never
  type StrictUnionHelper<T, TAll> = T extends any
    ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>>
    : never
  export type StrictUnion<T> = StrictUnionHelper<T, T>

  export type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never
  // Same as React.Ref<T> but excludes the deprecated string ref
  export type ReactRef<T> = Exclude<React.Ref<T>, string>

  type ApplyCondition<T, C> = { [K in keyof T]: T[K] extends C ? K : never }
  type ValueOf<T> = T[keyof T]
  export type FilterKeys<T, C> = Pick<T, ValueOf<ApplyCondition<T, C>>>

  export type Vector2D = [number, number]

  export type FlexibleRootComponent<T, P> = Omit<T, "component"> & {
    component?: React.ReactType<P>
  } & Omit<P, keyof T>

  export type Maybe<T> = T | null
}

export {}
