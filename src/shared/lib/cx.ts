/** Concatène des classes CSS en ignorant les valeurs falsy. `cx('a', cond && 'b')` */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
