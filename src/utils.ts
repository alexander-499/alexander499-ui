export const capitalize = (str: string): string => str[0]!.toUpperCase() + str.slice(1);
export const toPascalCase = (str: string): string => str.split("-").map(w => capitalize(w)).join("");
export const toKebabCase = (str: string): string => str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
export const toSnakeCase = (str: string): string => str.toLowerCase().replace(/[\s-]+/g, "_");

export type KebabCase<S extends string> = S extends `${infer T}${infer U}` ? U extends Uncapitalize<U> ? `${Uncapitalize<T>}${KebabCase<U>}` : `${Uncapitalize<T>}-${KebabCase<U>}` : S;