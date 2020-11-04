/**
 * Takes in a generator function and creates a regular function
 * that calls (goes through all the values generated by)
 * the generator function, but it:
 * 1. makes it interruptible on the generator function's `yield`s
 *    (interrupting = stopping generating new values from the generator)
 * 2. makes it automatically interrupted by another call.
 *
 * It always calls the iterator for the next value passing in
 * awaited result of a previous yielded value which makes
 * it easy to create interruptible asynchronous methods.
 *
 * For more information see https://dev.to/chromiumdev/cancellable-async-functions-in-javascript-5gp7
 *
 * @param func The generator function
 * @return An array of three elements:
 * 1. An async function that triggers "calling" the generator passed in.
 *    It resolves with the final value returned by the generator
 *    or undefined if the call has been interrupted by another call.
 * 2. A function returning whether any call has already been made
 *    to the generator.
 * 3. A function interrupting processing of the generator.
 */
export default function makeInterruptible<Arguments extends any[] = any[], Result = void>(func: (...args: Arguments) => AsyncGenerator<unknown, Result, unknown> | Generator<unknown, Result, unknown>): [(...args: Arguments) => Promise<Result | undefined>, () => boolean, () => void];
