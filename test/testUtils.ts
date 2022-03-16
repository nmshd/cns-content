import { expect } from "chai"

export function expectThrows(method: Function, customExceptionMatcher?: (e: Error) => void): void

export function expectThrows(method: Function, errorMessagePatternOrRegexp: RegExp): void

/**
 *
 * @param method The function which should throw the exception
 * @param errorMessagePattern the pattern the error message should match (asterisks ('\*') are wildcards that correspond to '.\*' in regex)
 */
export function expectThrows(method: Function, errorMessagePattern: string): void

export function expectThrows(
    method: Function,
    errorMessageRegexp: RegExp | string | ((e: Error) => void) | undefined
): void {
    let error: Error | undefined
    try {
        method()
    } catch (err: unknown) {
        if (!(err instanceof Error)) throw err

        error = err
    }

    expect(error).to.be.an("Error", "Expected an error to be thrown")

    if (typeof errorMessageRegexp === "undefined") {
        return
    }

    if (typeof errorMessageRegexp === "function") {
        errorMessageRegexp(error!)
        return
    }

    if (typeof errorMessageRegexp === "string") {
        errorMessageRegexp = new RegExp(errorMessageRegexp.replaceAll("*", ".*"))
    }

    expect(error!.message).to.match(new RegExp(errorMessageRegexp))
}
