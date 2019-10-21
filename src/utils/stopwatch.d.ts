/**
 * Created by khlee on 11/8/16.
 */
export default class Stopwatch {
    constructor(display?:any, results?:any);
    reset(): any;
    isRunning(): any;
    start(): any;
    lap(): any;
    stop(): any;
    restart(): any;
    clear(): any;
    step(timestamp): any;
    calculate(timestamp): any;
    print(): any;
    pad0(num:any): any;
    format(times:any): any;
    seconds(): any;
}
